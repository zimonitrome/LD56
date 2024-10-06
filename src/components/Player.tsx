import { Sprite } from './Sprite';
import asciiSprite from "../sprites/Player.md";
import { DEBUG, gameState, SCREENSHAKE, setGameState } from '../Game';
import { audioManager } from '../utils/AudioManager';

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
  state: string = 'idle';
  keys: Set<string> = new Set();
  ref: HTMLPreElement | undefined;
  divRef: HTMLDivElement | undefined
  lastDirection: number = 1;
  graceCooldown: number = 0;
  world: HTMLElement | null = null;

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

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(e: KeyboardEvent) {
    this.keys.add(e.key.toLowerCase());
  }

  handleKeyUp(e: KeyboardEvent) {
    this.keys.delete(e.key.toLowerCase());
  }

  update() {
    let dx = 0;
    let dy = 0;

    if (gameState.health > 0) {
      if (this.keys.has('w')) dy -= 1;
      if (this.keys.has('s')) dy += 1;
      if (this.keys.has('a')) dx -= 1;
      if (this.keys.has('d')) dx += 1;
    }

    const anyInput: number = dx !== 0 || dy !== 0 ? 1 : 0;

    // Apply acceleration based on input
    this.velocityX += dx * this.acceleration;
    this.velocityY += dy * this.acceleration;

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
    if (this.graceCooldown > 0) {
      this.graceCooldown -= 1;
      this.state = 'damage';
      let oscillation = this.oscillatingDecay(30 - this.graceCooldown);
      let oscillation2 = this.oscillatingDecay(0.8 * (30 - this.graceCooldown));
      this.ref!.style.rotate = `${2 * oscillation}deg`;
      this.world = document.getElementById('world');
      if (SCREENSHAKE) {
        this.world!.style.left = `calc(50% + ${0.5 * oscillation}px)`;
        this.world!.style.top = `calc(50% + ${0.2 * oscillation2}px)`;
      }
    }
    else {
      this.ref!.style.rotate = '0deg';
      if (anyInput)
        this.state = 'walking';
      else
        this.state = 'idle';
    }

    const newFrameRate = Math.max(Math.floor(5 * Math.exp(currentSpeed / 14)), 1);
    // console.log("newFrameRate", newFrameRate);
    this.sprite?.setFrameRate(newFrameRate);

    this.lastDirection = dx === 0 ? this.lastDirection : dx;
    this.ref!.style.transform = `scaleX(${this.lastDirection})`;

    this.sprite!.render(this.state, this.ref!, this.divRef!, this.x, this.y);
  }

  takeDamage() {
    if (this.graceCooldown > 0) return;

    audioManager.playSoundEffect('playerHit');
    this.state = 'damage';
    this.graceCooldown = 30;
    setGameState('health', gameState.health - 1);
  }

  oscillatingDecay = (x: number): number => (30 - x) * Math.sin(2 * Math.PI * 0.1 * x) * Math.exp(-0.05 * x);

  render() {
    return (
      <div
        ref={this.divRef}
        style={{
          position: 'absolute',
          // left: '50%',
          // top: '50%',
          transform: 'translate(-50%, -50%)',
          border: DEBUG ? '1px solid blue' : 'none',
        }}
        id="player"
      >
        <pre
          ref={this.ref}
          style={{
            margin: 0,
          }}>

        </pre>
      </div>
    );
  }

  cleanup() {
    this.sprite?.cleanup();
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}