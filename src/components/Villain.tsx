// import { createSignal, createEffect, onMount } from 'solid-js';
// import { parseSprites, SpriteData } from '../utils/sprite-parser';
// import asciiSprite from "../sprites/villain.txt";

// type VillainState = 'idle' | 'walking' | 'shooting';

// const Villain = () => {
//   const [state, setState] = createSignal<VillainState>('idle');
//   const [frame, setFrame] = createSignal(0);
//   const [sprites, setSprites] = createSignal<SpriteData>({});
//   let interval: number | undefined = undefined;

//   onMount(async () => {
//     try {
//       const response = await fetch(asciiSprite);
//       const content = await response.text();
//       const parsedSprites = parseSprites(content);
//       setSprites(parsedSprites);
//       console.log(parsedSprites);
//     } catch (error) {
//       console.error('Failed to load villain sprites:', error);
//     }
//   });

//   createEffect(() => {
//     if (interval)
//       clearInterval(interval);

//     const currentSprites = sprites()[state()];
//     if (!currentSprites || currentSprites.length < 2) return;

//     console.log(interval);

//     interval = setInterval(() => {
//       setFrame((prev) => (prev + 1) % currentSprites.length);
//     }, 500); // Change frame every 500ms
//   });

//   const changeState = (newState: VillainState) => {
//     if (sprites()[newState]) {
//       setState(newState);
//       setFrame(0);
//     }
//   };

//   return (
//     <pre style={{ "font-family": "monospace", "white-space": "pre", "text-align": "left" }}>
//       {sprites()[state()] && sprites()[state()][frame()]}
//     </pre>
//   );
// };

// export default Villain;


import { Component } from 'solid-js';
import { Sprite } from '../components/Sprite';
import { Player } from './Player';

export class Enemy {
  x: number;
  y: number;
  speed: number = 0.3;
  private sprite: Sprite;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.sprite = new Sprite('/path/to/enemy/sprite.txt');
  }

  update(player: Player) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 0) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
  }

  render: Component = () => {
    return (
      <div style={{ position: 'absolute', left: `${this.x}rem`, top: `${this.y}rem` }}>
        {this.sprite.render('idle')}
      </div>
    );
  };
}
