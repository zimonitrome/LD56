import { createSignal, createEffect, onCleanup, For, Show } from 'solid-js';
import { render } from 'solid-js/web';
import { Player } from './components/Player';
import { createStore } from 'solid-js/store';
import { Enemy } from './components/Villain';
import heartSprite from "../src/sprites/heart.md"
import { Sprite } from './components/Sprite';
import { createBox } from './utils/create_ui_box';
import HighScoreList from './components/HighscoreList';

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

export const [gameState, setGameState] = createStore({
  // player: new Player(0, 0, 1, 'red', 7),
  player: new Player(window.innerWidth / 2, window.innerHeight / 2, 1, 'red', 7),
  enemies: [] as Enemy[],
  tiles: [] as { x: number; y: number; size: number }[],
  health: 3,
  active: true,
});

const Game = () => {
  let worldRef: HTMLDivElement = undefined as any;

  const [windowSize, setWindowSize] = createSignal({ width: window.innerWidth, height: window.innerHeight });
  const updateSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };
  createEffect(() => {
    window.addEventListener('resize', updateSize);
    onCleanup(() => window.removeEventListener('resize', updateSize));
  });

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

    if (gameState.health <= 0) {
      setGameState('active', false);
      clearInterval(intervalId);
    }

    onCleanup(() => clearInterval(intervalId));
    return () => clearInterval(intervalId);
  });



  return (
    <div id="game" style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#f0f0f0',
      "font-family": "monospace",
      "white-space": "pre",
      "text-align": "left",
      "font-size": "1rem",
    }}>
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
      <div id="HUD" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // "background-color": 'rgba(0,0,0,0.5)',
      }}>
        <div style={{
          position: 'absolute',
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: 'rgb(255, 255, 255)',
          margin: 0
        }}>
          <Show when={!gameState.active || true}>
            <pre style={{ margin: 0 }}>
              {
                (() => {
                  // Calculate width of rem
                  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
                  const fontWidth = 0.56 * rem;
                  const fontHeight = 1.2 * rem;

                  // Calculate how many characters fit in the screen
                  const width = Math.floor(0.6 * windowSize().width / fontWidth);
                  const height = Math.floor(0.6 * windowSize().height / fontHeight);

                  return createBox(width, height);
                })()
              }
            </pre>
            <div style={{
              margin: 0,
              position: 'absolute',
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: 'flex',
              "flex-direction": 'column',
              "justify-content": 'center',
              width: '100%',
              height: '100%',
              "align-items": 'center',
            }}>
              <pre>
                Game over!
              </pre>
              <pre>
                <HighScoreList />
              </pre>
              <button>
                Restart
              </button>
              <button onClick={() => {
                const data = {
                  name: "playa",
                  score: 100
                };
                
                fetch('https://script.google.com/macros/s/AKfycbwZ1tT3EAPZgnxp1M91a5cv1AZAHCZYdC_Lym3-D9Gq6Ff5S8Xni8VKDyiLIxq2s-dIBg/exec', {
                  redirect: "follow",
                  method: 'POST',
                  headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                    "origin": "https://script.google.com"
                  },
                  body: JSON.stringify(data)
                }).then(response => {
                  console.log(response);
                });

              }}>
                Submit score
              </button>
            </div>
          </Show>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          display: 'flex',
          "flex-direction": 'row',
          gap: '1rem',
          margin: '1rem',
        }}>
          <For each={Array.from({ length: gameState.health })}>
            {() => (
              <pre
                style={{
                  "font-weight": "bold",
                }}
              >
                {new Sprite(heartSprite).render("main")}
              </pre>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

render(() => <Game />, document.getElementById('root')!);