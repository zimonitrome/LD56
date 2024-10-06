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
import grassSpriteContent from "./sprites/grass.md";
import { time } from 'console';

export const DEBUG = false;
export const SCREENSHAKE = true;
export const MUTE = false;
export const START_WORLD_SIZE = 1500;

export let worldSize = START_WORLD_SIZE;

const grassSprite = new Sprite(grassSpriteContent);

const WorldTile = (props: { x: number; y: number; spriteIndex: number; color: string }) => (
  <div
    style={{
      position: 'absolute',
      left: `${props.x}rem`,
      top: `${props.y}rem`,
      "font-weight": "bold",
      color: "rgb(200,200,200)",
    }}
  >
    {grassSprite.render(props.spriteIndex.toString())}
  </div>
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
  player: new Player(START_WORLD_SIZE / 2, START_WORLD_SIZE / 2, 1, 'red', 7),
  enemies: [] as Enemy[],
  tiles: [] as { x: number; y: number; sprite: number }[],
  health: 3,
  active: true,
  score: 0,
  deltaTime: 0
});

export let globalGameTimeSeconds = 0;

function calculateDifficulty(time: number, k: number = 0.01): number {
  return 1 - (1 / (1 + Math.exp(k * time) - 1));
}

const getDifficulty = () => {
  return calculateDifficulty(globalGameTimeSeconds);
}

export const [gameState, setGameState] = createStore(newGameStore());
const [scoreSubmitted, setScoreSubmitted] = createSignal<boolean | "loading">(false);
export const [volumes, setVolumes] = createStore({
  backgroundMusic: MUTE ? 0 : 0.5,
  soundEffects: MUTE ? 0 : 0.3,
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
    worldRef.style.visibility = gameStarted() ? 'visible' : 'hidden';
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
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const width = Math.floor(START_WORLD_SIZE / rem);
    const height = Math.floor(START_WORLD_SIZE / rem);

    for (let i = 0; i < 100; i++) {
      newTiles.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        sprite: 1 + Math.floor(Math.random() * grassSprite.nFrames)
      });
    }
    return newTiles;
  };

  const spawnEnemy = () => {
    let x, y;
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left

    switch (side) {
      case 0: // top
        x = Math.random() * worldSize;
        y = 0;
        break;
      case 1: // right
        x = worldSize;
        y = Math.random() * worldSize;
        break;
      case 2: // bottom
        x = Math.random() * worldSize;
        y = worldSize;
        break;
      case 3: // left
        x = 0;
        y = Math.random() * worldSize;
        break;
    }

    const isSpecial = Math.random() < getDifficulty();
    const type = isSpecial ? (Math.random() < 0.5 ? "red" : "blue") : "normal";
    const behaviorChangeProbability = Math.random() < 0.2 ? 0.05 : 0.01;

    let enemy;
    if (!isSpecial) {
      enemy = new Enemy(x!, y!, type, behaviorChangeProbability, 1.4 + 0.2 * (Math.random() - 0.5));
    } else {
      enemy = new Enemy(x!, y!, type, behaviorChangeProbability);
    }
    setGameState('enemies', (enemies) => [...enemies, enemy]);
  };

  const removeEnemy = (enemy: Enemy) => {
    setGameState('enemies', (enemies) => enemies.filter((e) => e !== enemy));
  };

  // Main game loop
  createEffect(() => {
    if (!gameStarted()) return;
    console.log("start")

    setGameState("tiles", generateTiles());

    let lastTime = performance.now();
    let scoreTimer = 0;
    globalGameTimeSeconds = 0;

    gameState.active; // Important! We need to react to this.
    const gameLoopIntervalId = setInterval(() => {
      console.log(getDifficulty());
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;

      gameState.player.update();

      // Update enemies
      gameState.enemies.forEach((enemy) => {
        enemy.update(gameState.player, deltaTime);
      });

      // Increment score every second
      scoreTimer += deltaTime;
      if (scoreTimer >= 1) {
        setGameState('score', score => score + 1);
        globalGameTimeSeconds += 1;
        scoreTimer -= 1; // Reset the timer, keeping any excess time

        if (globalGameTimeSeconds % (10 - Math.floor(5 * getDifficulty())) === 0) {
          console.log(globalGameTimeSeconds, 10 - Math.floor(5 * getDifficulty()), "spawning enemy");
          spawnEnemy();
        }
      }

      if (worldRef !== undefined) {
        worldRef.style.transform = `translate(${-gameState.player.x}px, ${-gameState.player.y}px)`;
      }

      if (gameState.health <= 0 && gameState.player.graceCooldown <= 0) {
        setGameState('active', false);
        clearInterval(gameLoopIntervalId);
      }

      worldSize -= deltaTime;

      if (worldRef !== undefined) {
        worldRef.style.width = `${worldSize}px`;
        worldRef.style.height = `${worldSize}px`;
      }

    }, 1000 / 60); // 60 FPS

    spawnEnemy();


    onCleanup(() => {
      clearInterval(gameLoopIntervalId);
    });

    return () => {
      clearInterval(gameLoopIntervalId);
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
          {(tile) => <WorldTile x={tile.x} y={tile.y} spriteIndex={tile.sprite} color="rgba(100,100,200,0.2)" />}
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
                <h1>(o o)</h1>
                <p>Play with W, A, S, D to move around.</p>
                <p>Avoid enemies, and have fun!</p>
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
                  worldSize = START_WORLD_SIZE;
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