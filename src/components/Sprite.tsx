type SpriteState = string;
type SpriteData = Record<SpriteState, string[]>;

export function parseSprites(content: string): SpriteData {
  const lines = content.split('\n');
  const sprites: SpriteData = {};
  let currentState: string | null = null;
  let currentSprite: string[] = [];

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      // New state
      if (currentState) {
        sprites[currentState] = sprites[currentState] || [];
        if (currentSprite.length > 0) {
          sprites[currentState].push(currentSprite.join('\n'));
          currentSprite = [];
        }
      }
      currentState = line.slice(3).trim().toLowerCase();
    } else if (line.trim() === '```') {
      // Start or end of a sprite
      if (currentSprite.length > 0) {
        sprites[currentState!] = sprites[currentState!] || [];
        sprites[currentState!].push(currentSprite.join('\n'));
        currentSprite = [];
      }
    } else if (currentState && line.trim() !== '') {
      // Sprite content
      currentSprite.push(line);
    }
  });

  // Add the last sprite if there is one
  if (currentState && currentSprite.length > 0) {
    sprites[currentState] = sprites[currentState] || [];
    sprites[currentState].push(currentSprite.join('\n'));
  }

  return sprites;
}

export class Sprite {
  private sprites: SpriteData = {};
  private currentFrames: Record<SpriteState, number> = {};
  private lastUpdateTime: number = 0;
  private animationId: number | null = null;
  private lastRenderedSprite: string = "";
  nFrames: number = 0;

  constructor(private content: string, private frameRate: number = 500) {
    this.loadSprites();
  }

  async loadSprites() {
    try {
      this.sprites = parseSprites(this.content);
      this.nFrames = Object.values(this.sprites).reduce((total, frames) => total + frames.length, 0);
      this.initializeCurrentFrames();
      this.startAnimation();
    } catch (error) {
      console.error('Failed to load sprites:', error);
    }
  }

  private initializeCurrentFrames() {
    Object.keys(this.sprites).forEach(state => {
      this.currentFrames[state] = 0;
    });
  }

  private startAnimation() {
    this.lastUpdateTime = performance.now();
    this.animationId = requestAnimationFrame(this.animate);
  }

  private animate = (currentTime: number) => {
    if (currentTime - this.lastUpdateTime >= this.frameRate) {
      Object.keys(this.sprites).forEach(state => {
        const frames = this.sprites[state];
        if (frames.length > 1) {
          this.currentFrames[state] = (this.currentFrames[state] + 1) % frames.length;
        }
      });
      this.lastUpdateTime = currentTime;
    }
    this.animationId = requestAnimationFrame(this.animate);
  }

  private stopAnimation() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  render(state: SpriteState, innerElement?: HTMLElement, outerElement?: HTMLElement, x?: number, y?: number): string {
    const frames = this.sprites[state] || [];
    if (frames.length === 0) {
      return ':/';
    }

    const frameIndex = this.currentFrames[state] || 0;
    const frame = frames[frameIndex];

    if (innerElement) {
      if (this.lastRenderedSprite !== frame) {
        innerElement.innerHTML = frame;
        this.lastRenderedSprite = frame;
      }
    }

    if (outerElement && typeof x === 'number' && typeof y === 'number') {
        outerElement.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    }

    return frame;
  }

  setFrameRate(newFrameRate: number) {
    if (newFrameRate <= 0) {
      throw new Error("Frame rate must be a positive number");
    }
    this.frameRate = newFrameRate;
  }

  getFrameRate(): number {
    return this.frameRate;
  }

  cleanup() {
    this.stopAnimation();
  }
}
