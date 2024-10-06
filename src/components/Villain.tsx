import { Sprite } from './Sprite';
import { Player } from './Player';
import asciiSprite from "../sprites/villain.md";
import { Bullet } from './Bullet';
import { DEBUG, gameState, setGameState } from '../Game';
import { audioManager } from '../utils/AudioManager';

export class Enemy {
  x: number;
  y: number;
  size: number = 1;
  color: string = 'black';
  speed: number = 1.4;
  velocityX: number = 0;
  velocityY: number = 0;
  maxVelocity: number;
  acceleration: number;
  friction: number;
  private sprite: Sprite;
  state: string = 'idle';
  ref: HTMLPreElement | undefined;
  divRef: HTMLDivElement | undefined;
  lastDirection: number = 1;
  cooldown: number = 0;
  wantedDistance: number = 200;
  type: "normal" | "red" | "blue" = "normal";
  cooldownPeriod: number = 100;

  // New properties for occasional random behaviors
  private behaviorTimer: number = 0;
  private currentBehavior: 'chase' | 'wait' | 'random' = 'chase';
  private randomDirection: { x: number, y: number } = { x: 0, y: 0 };
  private behaviorChangeProbability: number;

  constructor(x: number, y: number, type: "normal" | "red" | "blue" = "normal", behaviorChangeProbability: number = 0.01, speed = 1.4) {
    this.x = x;
    this.y = y;
    this.friction = 0.9;
    this.type = type;
    this.behaviorChangeProbability = behaviorChangeProbability;
    this.speed = speed;
    if (this.type === "red") {
      this.size = 2;
      this.speed = 1.8;
      this.wantedDistance = 400;
      this.behaviorChangeProbability = 0.005;
      this.cooldownPeriod = 20;
    }
    if (this.type === "blue") {
      this.wantedDistance = 400;
      this.speed = 0.2;
    }

    this.maxVelocity = this.speed;
    this.acceleration = this.speed / 10;

    this.sprite = new Sprite(asciiSprite);
    this.sprite.setFrameRate(5);
  }

  private chooseBehavior() {
    if (Math.random() < this.behaviorChangeProbability) {
      const behaviors = ['chase', 'wait', 'random'];
      this.currentBehavior = behaviors[Math.floor(Math.random() * behaviors.length)] as 'chase' | 'wait' | 'random';
      this.behaviorTimer = Math.random() * 1.5 + 0.5; // Random time between 0.5 and 2 seconds

      if (this.currentBehavior === 'random') {
        const angle = Math.random() * 2 * Math.PI;
        this.randomDirection = {
          x: Math.cos(angle),
          y: Math.sin(angle)
        };
      }
    }
  }

  shoot(player: Player) {
    if (!this.divRef || !this.ref) return; // Safety check

    const bbox = this.ref.getBoundingClientRect();

    const style = window.getComputedStyle(this.ref);
    const fontSize = parseFloat(style.fontSize);
    const charWidth = fontSize * 0.6;  // Approximate width for monospace
    const charHeight = fontSize;  // Full height of a character

    // Calculate spawn position
    const spawnX = this.x + this.lastDirection * (bbox.width / 2 + charWidth / 2);
    const spawnY = this.y - bbox.height / 2 + charHeight / 2;

    if (this.type === "blue") {
      // Shoot two bullets at once in a V towards the player.
      // One bullet goes slightly to the left, the other slightly to the right
      // from the perspective of the enemy.
      const angle = Math.atan2(player.y - spawnY, player.x - spawnX);
      const spread = Math.PI / 12; // 15 degrees spread

      const leftBulletAngle = angle - spread;
      const rightBulletAngle = angle + spread;

      const leftBulletTargetX = spawnX + Math.cos(leftBulletAngle) * 1000; // Large number to ensure it goes off-screen
      const leftBulletTargetY = spawnY + Math.sin(leftBulletAngle) * 1000;

      const rightBulletTargetX = spawnX + Math.cos(rightBulletAngle) * 1000;
      const rightBulletTargetY = spawnY + Math.sin(rightBulletAngle) * 1000;

      const leftBullet = new Bullet(spawnX, spawnY, player, leftBulletTargetX, leftBulletTargetY);
      const rightBullet = new Bullet(spawnX, spawnY, player, rightBulletTargetX, rightBulletTargetY);
    } else {
      // For non-blue enemies, shoot a single bullet directly at the player
      const bullet = new Bullet(spawnX, spawnY, player, player.x, player.y);
    }

    audioManager.playSoundEffect('enemyShoot');

    setGameState("score", s => s + 1);
  }

  update(player: Player, deltaTime: number) {
    this.chooseBehavior(); // Potentially change behavior each frame
    if (this.behaviorTimer > 0) {
      this.behaviorTimer -= deltaTime;
    } else {
      this.currentBehavior = 'chase'; // Default back to chasing when timer expires
    }

    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let normalizedDx = dx / distance;
    let normalizedDy = dy / distance;

    switch (this.currentBehavior) {
      case 'chase':
        if (distance > this.wantedDistance) {
          // Apply acceleration towards the player
          this.velocityX += normalizedDx * this.acceleration;
          this.velocityY += normalizedDy * this.acceleration;
        }
        break;
      case 'wait':
        // Gradually slow down
        normalizedDx = 0;
        normalizedDy = 0;
        this.velocityX *= 0.9;
        this.velocityY *= 0.9;
        break;
      case 'random':
        // Move in the random direction
        this.velocityX += this.randomDirection.x * this.acceleration;
        this.velocityY += this.randomDirection.y * this.acceleration;
        normalizedDx = this.randomDirection.x;
        normalizedDy = this.randomDirection.y;
        break;
    }

    if (distance <= this.wantedDistance) {
      if (this.type !== "red") {
        normalizedDx = 0;
        normalizedDy = 0;
      }
      if (this.cooldown <= 0) {
        this.shoot(player);
        this.cooldown = this.cooldownPeriod; // Set cooldown period
      }
    }
    this.cooldown -= 1;

    // Limit velocity to max speed
    let currentSpeed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
    if (currentSpeed > this.maxVelocity) {
      const ratio = this.maxVelocity / currentSpeed;
      this.velocityX *= ratio;
      this.velocityY *= ratio;
    }
    currentSpeed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);

    // Apply friction
    this.velocityX *= this.friction;
    this.velocityY *= this.friction;

    // Update position
    if (this.cooldown <= 0) {
      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    if (currentSpeed < 0.01) {
      this.velocityX = 0;
      this.velocityY = 0;
    }

    // Update state
    if (this.cooldown > (this.cooldownPeriod * 0.8))
      this.state = 'shooting';
    else if (normalizedDx !== 0 || normalizedDy !== 0)
      this.state = 'walking';
    else
      this.state = 'idle';

    this.lastDirection = normalizedDx === 0 ? this.lastDirection : Math.sign(normalizedDx);
    if (this.ref) {
      this.ref.style.transform = `scaleX(${this.lastDirection})`;
    }

    this.sprite.render(this.state, this.ref, this.divRef, this.x, this.y);
  }

  render() {
    return (
      <div
        ref={this.divRef}
        style={{
          position: 'absolute',
          border: DEBUG ? '1px solid red' : 'none',
        }}>
        <pre
          ref={(el) => this.ref = el}
          style={{
            margin: 0,
            "font-weight": this.type === "normal" ? "normal" : "bold",
            color: {
              "normal": "black",
              "red": "red",
              "blue": "blue"
            }[this.type],
          }}>
          {":)"}
        </pre>
      </div>
    );
  }

  cleanup() {
    this.sprite.cleanup();
  }
}