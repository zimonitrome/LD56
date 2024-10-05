import { createSignal, createEffect, onCleanup, For } from 'solid-js';
import { render } from 'solid-js/web';
import { Player } from './components/Player';
import { createStore } from 'solid-js/store';
import { Enemy } from './components/Villain';

export const DEBUG = false;
export const SCREENSHAKE = false;

const WorldTile = (props: { x: number; y: number; size: number; color: string }) => (
  <div
    style={{
      position: 'absolute',
      left: `${props.x}rem`,
      top: `${props.y}rem`,
      width: `${props.size}rem`,
      height: `${props.size}rem`,
      background: props.color,
    }}
  />
);

const Game = () => {
  let worldRef: HTMLDivElement = undefined as any;

  const [gameState, setGameState] = createStore({
    // player: new Player(0, 0, 1, 'red', 7),
    player: new Player(window.innerWidth/2, window.innerHeight/2, 1, 'red', 7),
    enemies: [] as Enemy[],
    tiles: [] as { x: number; y: number; size: number }[],
  });

  const [keys, setKeys] = createSignal<Set<string>>(new Set());

  const generateTiles = () => {
    const newTiles = [];
    for (let i = 0; i < 1000; i++) {
      newTiles.push({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        size: Math.random() * 2 + 0.5,
      });
    }
    setGameState('tiles', newTiles);
  };

  const spawnEnemy = () => {
    const enemy = new Enemy(Math.random() * 100 - 50, Math.random() * 100 - 50);

    setGameState('enemies', (enemies) => [...enemies, enemy]);
  };

  const removeEnemy = (enemy: Enemy) => {
    setGameState('enemies', (enemies) => enemies.filter((e) => e !== enemy));
  };

  createEffect(() => {
    generateTiles();
    spawnEnemy(); // Spawn an initial enemy
  });


  // Main game loop
  createEffect(() => {
    const intervalId = setInterval(() => {
      gameState.player.update();

      // Update enemies
      gameState.enemies.forEach((enemy) => {
        enemy.update(gameState.player);
      });

      if (worldRef !== undefined) {
        worldRef.style.transform = `translate(${-gameState.player.x}px, ${-gameState.player.y}px)`;
      }
    }, 1000 / 60); // 60 FPS

    onCleanup(() => clearInterval(intervalId));
    return () => clearInterval(intervalId);
  });

  return (
    <div id="game" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#f0f0f0' }}>
      <div
        ref={worldRef}
        id="world"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '1rem',
          height: '1rem',
          "background-color": 'green',
        }}
      >
        <For each={gameState.tiles}>
          {(tile) => <WorldTile x={tile.x} y={tile.y} size={tile.size} color="rgba(100,100,200,0.2)" />}
        </For>
        <For each={gameState.enemies}>
          {(enemy) => enemy.render()}
        </For>
        {gameState.player.render()}
      </div>
    </div>
  );
};

render(() => <Game />, document.getElementById('root')!);