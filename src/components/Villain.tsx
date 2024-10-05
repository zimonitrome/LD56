import { Sprite } from './Sprite';
import { Player } from './Player';
import asciiSprite from "../sprites/villain.txt";
import { Bullet } from './Bullet';
import { DEBUG } from '../Game';

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

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.friction = 0.9;

    this.sprite = new Sprite(asciiSprite);
    this.sprite.setFrameRate(5);
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
  }

  update(player: Player) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    if (distance > this.wantedDistance) {
      // Apply acceleration towards the player
      this.velocityX += normalizedDx * this.acceleration;
      this.velocityY += normalizedDy * this.acceleration;
    }

    if (distance <= this.wantedDistance) {
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
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (currentSpeed < 0.01) {
      this.velocityX = 0;
      this.velocityY = 0;
    }

    // Update state
    if (this.cooldown > 80)
      this.state = 'shooting';
    else if(distance > this.wantedDistance)
      this.state = 'walking'
    else
      this.state = 'idle';

    this.lastDirection = normalizedDx === 0 ? this.lastDirection : Math.sign(normalizedDx);
    if (this.ref) {
      this.ref.style.transform = `scaleX(${this.lastDirection})`;
    }

    this.divRef!.style.left = `${this.x}px`;
    this.divRef!.style.top = `${this.y}px`;

    if (this.ref) {
      this.ref.innerHTML = this.sprite.render(this.state);
    }
  }

  render() {
    return (
      <div
        ref={this.divRef}
        style={{
          position: 'absolute',
          left: `${this.x}px`,
          top: `${this.y}px`,
          transform: `translate(-50%, -50%)`,
          border: DEBUG ? '1px solid red' : 'none',
        }}>
        <pre
          ref={(el) => this.ref = el}
          style={{
            "font-family": "monospace",
            "white-space": "pre",
            "text-align": "left",
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