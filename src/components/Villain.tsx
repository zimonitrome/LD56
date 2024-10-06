import { Sprite } from './Sprite';
import { Player } from './Player';
import asciiSprite from "../sprites/villain.md";
import { Bullet } from './Bullet';
import { DEBUG } from '../Game';
import { audioManager } from '../utils/AudioManager';

export class Enemy {
  x: number;
  y: number;
  size: number = 1;
  color: string = 'black';
  speed: number = 1.4;
  velocityX: number = 0;
  velocityY: number = 0;
  maxVelocity: number = this.speed;
  acceleration: number = this.speed / 10;
  friction: number;
  private sprite: Sprite;
  state: string = 'idle';
  ref: HTMLPreElement | undefined;
  divRef: HTMLDivElement | undefined;
  lastDirection: number = 1;
  cooldown: number = 0;
  wantedDistance: number = 200;
  
  // New properties for occasional random behaviors
  private behaviorTimer: number = 0;
  private currentBehavior: 'chase' | 'wait' | 'random' = 'chase';
  private randomDirection: { x: number, y: number } = { x: 0, y: 0 };
  private behaviorChangeProbability: number = 0.01; // 1% chance per frame to change behavior

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.friction = 0.9;

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

    const bullet = new Bullet(spawnX, spawnY, player);
    audioManager.playSoundEffect('enemyShoot');
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
      normalizedDx = 0;
      normalizedDy = 0;
      if (this.cooldown <= 0) {
        this.shoot(player);
        this.cooldown = 100; // Set cooldown period
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
    if (this.cooldown > 80)
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