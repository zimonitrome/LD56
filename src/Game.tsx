import { createSignal, createEffect, onCleanup, For, Show } from 'solid-js';
import { render } from 'solid-js/web';
import { Player } from './components/Player';
import { createStore } from 'solid-js/store';
import { Enemy } from './components/Villain';
import heartSprite from "../src/sprites/heart.md"
import { Sprite } from './components/Sprite';
import { createBox } from './utils/create_ui_box';
import HighScoreList, { fetchScores, setScoresLoading } from './components/HighscoreList';
import './Game.css';
import { audioManager } from './utils/AudioManager';
import AudioControls from './components/audioControl';
import { M } from 'vite/dist/node/types.d-aGj9QkWt';

export const DEBUG = false;
export const SCREENSHAKE = true;
export const MUTE = true;

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

const postScore = async () => {
  setScoreSubmitted("loading");
  const playerName = (document.getElementById('playerName') as HTMLInputElement).value;
  const data = {
    name: playerName,
    score: gameState.score,
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
    setScoreSubmitted(true);
    setScoresLoading(true);
    setTimeout(() => { // LOL hack
      fetchScores();
    }, 1000);
  }).catch(error => {
    console.error('Error submitting score:', error);
    setScoreSubmitted(false);
  });
}

const newGameStore = () => ({
  player: new Player(window.innerWidth / 2, window.innerHeight / 2, 1, 'red', 7),
  enemies: [] as Enemy[],
  tiles: [] as { x: number; y: number; size: number }[],
  health: 0,
  active: true,
  score: 0,
});

export const [gameState, setGameState] = createStore(newGameStore());
const [scoreSubmitted, setScoreSubmitted] = createSignal<boolean | "loading">(false);
export const [volumes, setVolumes] = createStore({
  backgroundMusic: MUTE ? 0 : 0.5,
  soundEffects: MUTE ? 0 : 0.5,
});

const Game = () => {
  let worldRef: HTMLDivElement = undefined as any;

  const [windowSize, setWindowSize] = createSignal({ width: window.innerWidth, height: window.innerHeight });
  const [gameStarted, setGameStarted] = createSignal(false);

  const updateSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  createEffect(() => {
    window.addEventListener('resize', updateSize);
    onCleanup(() => window.removeEventListener('resize', updateSize));
  });

  createEffect(() => {
    audioManager.loadAllSounds();
  });

  createEffect(() => {
    audioManager.setBackgroundMusicVolume(volumes.backgroundMusic);
    audioManager.setSoundEffectsVolume(volumes.soundEffects);
  });

  createEffect(() => {
    if (gameState.active && gameStarted()) {
      audioManager.playBackgroundMusic();
    }
    else {
      audioManager.stopBackgroundMusic();
    }
  });

  const generateTiles = () => {
    const newTiles = [];
    for (let i = 0; i < 1000; i++) {
      newTiles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
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
  });


  // Main game loop
  createEffect(() => {
    if (!gameStarted()) return;

    gameState.active;
    const gameLoopIntervalId = setInterval(() => {
      gameState.player.update();

      // Update enemies
      gameState.enemies.forEach((enemy) => {
        enemy.update(gameState.player);
      });

      if (worldRef !== undefined) {
        worldRef.style.transform = `translate(${-gameState.player.x}px, ${-gameState.player.y}px)`;
      }

      if (gameState.health <= 0 && gameState.player.graceCooldown <= 0) {
        setGameState('active', false);
        clearInterval(gameLoopIntervalId);
        clearInterval(enemySpawnIntervalId);
      }
    }, 1000 / 60); // 60 FPS

    spawnEnemy();

    const enemySpawnIntervalId = setInterval(() => {
      spawnEnemy();
    }, 10000); // Spawn enemy every 10 seconds

    onCleanup(() => {
      clearInterval(gameLoopIntervalId);
      clearInterval(enemySpawnIntervalId);
    });

    return () => {
      clearInterval(gameLoopIntervalId);
      clearInterval(enemySpawnIntervalId);
    };
  });

  const startGame = () => {
    setGameStarted(true);
    setGameState('active', true);
    generateTiles();
    audioManager.playBackgroundMusic();
  };

  return (
    <div id="game">
      <div ref={worldRef} id="world">
        <For each={gameState.tiles}>
          {(tile) => <WorldTile x={tile.x} y={tile.y} size={tile.size} color="rgba(100,100,200,0.2)" />}
        </For>
        <For each={gameState.enemies}>
          {(enemy) => enemy.render()}
        </For>
        {gameState.player.render()}
      </div>
      <div id="HUD">

        <AudioControls />

        <div id="gameOverScreen">
          <Show when={!gameStarted()}>
            <div id="welcomeScreen">
              <pre style={{ margin: 0 }}>
                {createBox(Math.floor(0.6 * windowSize().width / (0.56 * parseFloat(getComputedStyle(document.documentElement).fontSize))),
                  Math.floor(0.6 * windowSize().height / (1.2 * parseFloat(getComputedStyle(document.documentElement).fontSize))))}
              </pre>
              <div id="welcome">
                <h1>Welcome to the Game!</h1>
                <p>Get ready for an exciting adventure!</p>
                <button onClick={startGame}>Start Game</button>
              </div>
            </div>
          </Show>

          <Show when={!gameState.active && gameStarted()}>
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
            <div id="gameOver">
              <h1>
                Game over!
              </h1>
              <h2>
                Your score: {gameState.score}
              </h2>
              <HighScoreList />
              <div style={{
                display: 'flex',
                "flex-direction": 'row',
                gap: '1rem',
                margin: '1rem',
              }}>
                <button onClick={() => {
                  gameState.player.cleanup();
                  for (const enemy of gameState.enemies) {
                    enemy.cleanup();
                  }
                  setGameState(newGameStore());
                  setScoreSubmitted(false);
                  generateTiles();
                }}>
                  Restart
                </button>
                <Show when={!scoreSubmitted() || scoreSubmitted() === "loading"}>
                  <input disabled={scoreSubmitted() == "loading"} type="text" placeholder="Enter your name" id="playerName" />
                  <button
                    disabled={scoreSubmitted() === "loading"}
                    onClick={postScore}>
                    Submit score
                  </button>
                </Show>
              </div>
            </div>
          </Show>
        </div>
        <div style={{
          bottom: 0,
          left: 0,
          position: 'absolute',
          display: 'flex',
          "flex-direction": 'row',
          gap: '1rem',
          margin: '1rem',
        }}>
          <For each={Array.from({ length: gameState.health })}>
            {() => (
              <pre style={{ "font-weight": "bold", }}>
                {new Sprite(heartSprite).render("main")}
              </pre>
            )}
          </For>
        </div>
        <div style={{
          top: 0,
          left: 0,
          position: 'absolute',
          "margin-left": '2rem',
        }}>
          <h2>
            Score: {gameState.score}
          </h2>
        </div>
      </div>
    </div>
  );
};

render(() => <Game />, document.getElementById('root')!);