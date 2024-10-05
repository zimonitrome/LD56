import { createSignal, createEffect, onCleanup, For } from 'solid-js';
import { render } from 'solid-js/web';
import { Player } from './components/Player';
import { createStore } from 'solid-js/store';
import { Enemy } from './components/Villain';

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
    player: new Player(0, 0, 1, 'red', 0.5),
    enemies: [] as Enemy[],
    tiles: [] as { x: number; y: number; size: number }[],
  });

  const [keys, setKeys] = createSignal<Set<string>>(new Set());

  const handleKeyDown = (e: KeyboardEvent) => {
    setKeys(new Set(keys()).add(e.key.toLowerCase()));
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const newKeys = new Set(keys());
    newKeys.delete(e.key.toLowerCase());
    setKeys(newKeys);
  };

  const generateTiles = () => {
    const newTiles = [];
    for (let i = 0; i < 50; i++) {
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
      let dx = 0;
      let dy = 0;

      if (keys().has('w')) dy -= 1;
      if (keys().has('s')) dy += 1;
      if (keys().has('a')) dx -= 1;
      if (keys().has('d')) dx += 1;

      let player = gameState.player;
      player.move(dx, dy);
      if (player.totalVelocity() > 0.01) {
        setGameState("player", "x", player.x);
        setGameState("player", "y", player.y);
      }

      // Update enemies
      gameState.enemies.forEach((enemy) => {
        // enemy.update(gameState.player);
        // setGameState('enemies', gameState.enemies.indexOf(enemy), {
        //   x: enemy.x,
        //   y: enemy.y,
        // });
      });

      if (worldRef !== undefined) {
        worldRef.style.transform = `translate(${-gameState.player.x}rem, ${-gameState.player.y}rem)`;
      }
    }, 1000 / 60); // 60 FPS

    onCleanup(() => clearInterval(intervalId));
    return () => clearInterval(intervalId);
  });

  onCleanup(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  });

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#f0f0f0' }}>
      <div
        ref={worldRef}
        id="world"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
      >
        <For each={gameState.tiles}>
          {(tile) => <WorldTile x={tile.x} y={tile.y} size={tile.size} color="lightblue" />}
        </For>
        <For each={gameState.enemies}>
          {(enemy) => <enemy.render />}
        </For>
      </div>
      {gameState.player.render()}
    </div>
  );
};

render(() => <Game />, document.getElementById('root')!);