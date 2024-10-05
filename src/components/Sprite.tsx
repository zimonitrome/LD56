type SpriteState = string;
type SpriteData = Record<SpriteState, string[]>;

export class Sprite {
  private sprites: SpriteData = {};
  private currentFrame = 0;
  private interval: number | undefined;

  constructor(private spriteUrl: string, private frameRate: number = 500) {}

  async loadSprites() {
    try {
      const response = await fetch(this.spriteUrl);
      const content = await response.text();
      console.log(content);
      this.sprites = this.parseSprites(content);
      this.startAnimation();
    } catch (error) {
      console.error('Failed to load sprites:', error);
    }
  }

  private parseSprites(content: string): SpriteData {
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

  private startAnimation() {
    this.interval = setInterval(() => {
      this.currentFrame = (this.currentFrame + 1) % this.getMaxFrames();
    }, this.frameRate);
  }

  private getMaxFrames(): number {
    return Math.max(...Object.values(this.sprites).map(frames => frames.length));
  }

  render(state: SpriteState) {
    const frames = this.sprites[state] || [];
    const frame = frames[this.currentFrame] || '';

    console.log(state);
    console.log(this.sprites);
    console.log(frames);
    
    return (
      <pre style={{
        "font-family": "monospace",
        "white-space": "pre",
        "text-align": "left"
      }}>
        {frame}
      </pre>
    );
  }

  cleanup() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}