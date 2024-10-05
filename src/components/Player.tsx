import { Sprite } from './Sprite';
import asciiSprite from "../sprites/Player.txt";

export class Player {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  velocityX: number = 0;
  velocityY: number = 0;
  maxVelocity: number;
  acceleration: number;
  friction: number;
  private sprite: Sprite | null = null;

  constructor(x: number, y: number, size: number, color: string, speed: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.maxVelocity = speed;
    this.acceleration = speed / 5;
    this.friction = 0.9;
    
    this.sprite = new Sprite(asciiSprite);
  }

  move(dx: number, dy: number) {
    // Apply acceleration based on input
    this.velocityX += dx * this.acceleration;
    this.velocityY += dy * this.acceleration;

    // Limit velocity to max speed
    const currentSpeed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
    if (currentSpeed > this.maxVelocity) {
      const ratio = this.maxVelocity / currentSpeed;
      this.velocityX *= ratio;
      this.velocityY *= ratio;
    }

    // Apply friction
    this.velocityX *= this.friction;
    this.velocityY *= this.friction;

    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.totalVelocity() < 0.01) {
      this.velocityX = 0;
      this.velocityY = 0;
    }
  }

  totalVelocity() {
    return Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
  }

  render() {
    const state = this.totalVelocity() > 0.1 ? 'walking' : 'idle';
    
    console.log("rendering...");

    if (this.sprite) {
      return (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          {this.sprite.render(state)}
        </div>
      );
    } else {
      return (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: `${this.size}rem`,
            height: `${this.size}rem`,
            background: this.color,
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    }
  }

  cleanup() {
    this.sprite?.cleanup();
  }
}