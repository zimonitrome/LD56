import backgroundMusic from '../audio/background-music.mp3';
import playerHit from '../audio/hit.mp3';
import enemyShoot from '../audio/shoot.mp3';

interface AudioSource {
  audio: HTMLAudioElement;
  baseVolume: number;
}

export class AudioManager {
  private static instance: AudioManager;
  private backgroundMusic: AudioSource | null = null;
  private soundEffects: Map<string, AudioSource> = new Map();
  private backgroundMusicVolume: number = 1;
  private soundEffectsVolume: number = 1;

  private constructor() {}

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public loadAllSounds(): void {
    this.loadBackgroundMusic(backgroundMusic); // 70% base volume for background music
    this.loadSoundEffect('playerHit', playerHit, 1); // 100% base volume for player hit
    this.loadSoundEffect('enemyShoot', enemyShoot, 0.8); // 80% base volume for enemy shoot
  }

  public loadBackgroundMusic(src: string, baseVolume: number = 1): void {
    const audio = new Audio(src);
    audio.loop = true;
    this.backgroundMusic = { audio, baseVolume };
    this.updateBackgroundMusicVolume();
  }

  public playBackgroundMusic(): void {
    this.backgroundMusic?.audio.play();
  }

  public stopBackgroundMusic(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.audio.pause();
      this.backgroundMusic.audio.currentTime = 0;
    }
  }

  public loadSoundEffect(name: string, src: string, baseVolume: number = 1): void {
    const audio = new Audio(src);
    this.soundEffects.set(name, { audio, baseVolume });
    this.updateSoundEffectVolume(name);
  }

  public playSoundEffect(name: string): void {
    const soundEffect = this.soundEffects.get(name);
    if (soundEffect) {
      soundEffect.audio.currentTime = 0;
      soundEffect.audio.play();
    }
  }

  public setBackgroundMusicVolume(volume: number): void {
    this.backgroundMusicVolume = Math.max(0, Math.min(1, volume));
    this.updateBackgroundMusicVolume();
  }

  public setSoundEffectsVolume(volume: number): void {
    this.soundEffectsVolume = Math.max(0, Math.min(1, volume));
    this.updateAllSoundEffectsVolumes();
  }

  private updateBackgroundMusicVolume(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.audio.volume = this.backgroundMusic.baseVolume * this.backgroundMusicVolume;
    }
  }

  private updateSoundEffectVolume(name: string): void {
    const soundEffect = this.soundEffects.get(name);
    if (soundEffect) {
      soundEffect.audio.volume = soundEffect.baseVolume * this.soundEffectsVolume;
    }
  }

  private updateAllSoundEffectsVolumes(): void {
    this.soundEffects.forEach((_, name) => this.updateSoundEffectVolume(name));
  }

  public getBackgroundMusicVolume(): number {
    return this.backgroundMusicVolume;
  }

  public getSoundEffectsVolume(): number {
    return this.soundEffectsVolume;
  }
}

export const audioManager = AudioManager.getInstance();