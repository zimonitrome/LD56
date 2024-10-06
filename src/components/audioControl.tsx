import { createSignal, Show } from 'solid-js';
import { setVolumes, volumes } from '../Game';
import { audioManager } from '../utils/AudioManager';

const AudioControls = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggleOpen = () => setIsOpen(!isOpen());

  const handleMusicVolumeChange = (event: Event) => {
    const volume = parseFloat((event.target as HTMLInputElement).value);
    setVolumes('backgroundMusic', volume);
    audioManager.setBackgroundMusicVolume(volume);
  };

  const handleEffectsVolumeChange = (event: Event) => {
    const volume = parseFloat((event.target as HTMLInputElement).value);
    setVolumes('soundEffects', volume);
    audioManager.setSoundEffectsVolume(volume);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      'z-index': '50',
      display: 'flex',
      "gap": "1rem",
    }}>
      <Show when={isOpen()}>
        <div style={{
          background: 'white',
          padding: '1rem',
          'border-radius': '0.5rem',
          'box-shadow': '0 2px 10px rgba(0,0,0,0.1)',
          'margin-top': '0.5rem'
        }}>
          <div style={{ 'margin-bottom': '1rem' }}>
            <label style={{
              display: 'block',
              'font-size': '0.875rem',
              'font-weight': '500',
              'margin-bottom': '0.5rem'
            }}>
              Background Music
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes.backgroundMusic}
              onInput={handleMusicVolumeChange}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              'font-size': '0.875rem',
              'font-weight': '500',
              'margin-bottom': '0.5rem'
            }}>
              Sound Effects
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes.soundEffects}
              onInput={handleEffectsVolumeChange}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Show>
      <button
        onClick={toggleOpen}
        aria-label="Audio Settings"
        style={{
          padding: '0.5rem',
          background: 'white',
          border: '1px solid #ccc',
          'border-radius': '0.25rem',
          cursor: 'pointer',
          width: "fit-content",
          height: "fit-content",
        }}
      >
        🔊
      </button>
    </div>
  );
};

export default AudioControls;