import { createSignal, createEffect, onCleanup } from 'solid-js';
import { render } from 'solid-js/web';
import { Player } from './components/Player';

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
  const [playerPos, setPlayerPos] = createSignal({ x: 0, y: 0 });
  const [tiles, setTiles] = createSignal<{ x: number; y: number; size: number }[]>([]);

  const player = new Player(0, 0, 1, 'red', 0.5);

  const generateTiles = () => {
    const newTiles = [];
    for (let i = 0; i < 50; i++) {
      newTiles.push({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        size: Math.random() * 2 + 0.5,
      });
    }
    setTiles(newTiles);
  };

  // Generate tiles once at the start
  createEffect(generateTiles);

  const [keys, setKeys] = createSignal<Set<string>>(new Set());

  const handleKeyDown = (e: KeyboardEvent) => {
    setKeys(new Set(keys()).add(e.key.toLowerCase()));
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const newKeys = new Set(keys());
    newKeys.delete(e.key.toLowerCase());
    setKeys(newKeys);
  };

  createEffect(() => {
    const intervalId = setInterval(() => {
      let dx = 0;
      let dy = 0;

      if (keys().has('w')) dy -= 1;
      if (keys().has('s')) dy += 1;
      if (keys().has('a')) dx -= 1;
      if (keys().has('d')) dx += 1;

      player.move(dx, dy);
      if (player.totalVelocity() > 0.01) {
        setPlayerPos({ x: player.x, y: player.y });
      }
    }, 1000 / 60); // 60 FPS

    onCleanup(() => clearInterval(intervalId));
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
        id="world"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(${-playerPos().x}rem, ${-playerPos().y}rem)`,
        }}
      >
        {tiles().map((tile) => (
          <WorldTile
            x={tile.x}
            y={tile.y}
            size={tile.size}
            color="lightblue"
          />
        ))}
      </div>
      {player.render()}
    </div>
  );
};

render(() => <Game />, document.getElementById('root')!);