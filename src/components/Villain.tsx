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
