// Web Audio API 8-Bit Chiptune Sound Synthesizer
// Completely self-contained, 0 external audio dependencies!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private sfxVolume: number = 0.3;
  private bgmVolume: number = 0.15;
  private bgmInterval: number | null = null;
  private isBgmPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isBgmPlaying) {
      this.stopBGM();
      this.isBgmPlaying = true; // remember preference
    } else if (!muted && this.isBgmPlaying) {
      this.startBGM();
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
  }

  // 1. Menu Click / Select Sound (Retro blip)
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(this.sfxVolume * 0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // 2. Coin Pickup Sound (Classic Mario/Arcade B5 -> E6)
  public playCoin() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(this.sfxVolume * 0.5, now);
    gain.gain.setValueAtTime(this.sfxVolume * 0.5, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // 3. Laser / Shoot Sound
  public playLaser() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

    gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // 4. Jump Sound
  public playJump() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

    gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // 5. Power Up / Level Up Sound (Chime Arpeggio)
  public playPowerUp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [330, 392, 659, 523, 587, 784]; // E4, G4, E5, C5, D5, G5
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(this.sfxVolume * 0.4, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.13);
    });
  }

  // 6. Hit / Damage / Bug Smash Sound
  public playHit() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    gain.gain.setValueAtTime(this.sfxVolume * 0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // 7. Explosion Sound (Noise synthesized)
  public playExplosion() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.25);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.sfxVolume * 0.7, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();
  }

  // 8. Victory Fanfare (Trophy / Complete Quest)
  public playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.28 }, // C5
      { f: 415.30, d: 0.28 }, // G#4
      { f: 466.16, d: 0.28 }, // A#4
      { f: 523.25, d: 0.20 }, // C5
      { f: 466.16, d: 0.10 }, // A#4
      { f: 523.25, d: 0.60 }, // C5
    ];

    let timeOffset = 0;
    const now = this.ctx.currentTime;

    melody.forEach((note) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, now + timeOffset);

      gain.gain.setValueAtTime(this.sfxVolume * 0.35, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + note.d + 0.02);

      timeOffset += note.d + 0.03;
    });
  }

  // 8b. Game Over Sound
  public playGameOver() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const sadMelody = [
      { f: 293.66, d: 0.18 }, // D4
      { f: 277.18, d: 0.18 }, // C#4
      { f: 261.63, d: 0.18 }, // C4
      { f: 246.94, d: 0.45 }, // B3
    ];

    let timeOffset = 0;
    const now = this.ctx.currentTime;

    sadMelody.forEach((note) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.f, now + timeOffset);

      gain.gain.setValueAtTime(this.sfxVolume * 0.3, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + note.d + 0.02);

      timeOffset += note.d + 0.04;
    });
  }

  // 9. Typewriter Dialog Blip
  public playTypewriter() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const randFreq = 600 + Math.random() * 200;
    osc.frequency.setValueAtTime(randFreq, this.ctx.currentTime);

    gain.gain.setValueAtTime(this.sfxVolume * 0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.035);
  }

  // 10. Background Chiptune Generator (Ambient 8-Bit Melody)
  public toggleBGM() {
    if (this.isBgmPlaying) {
      this.stopBGM();
      this.isBgmPlaying = false;
      return false;
    } else {
      this.isBgmPlaying = true;
      if (!this.isMuted) {
        this.startBGM();
      }
      return true;
    }
  }

  public isBGMActive() {
    return this.isBgmPlaying;
  }

  public startBGM() {
    this.stopBGM();
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    // Chiptune pentatonic progression sequence
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C Major
      [220.00, 261.63, 329.63, 440.00], // A Minor
      [174.61, 220.00, 261.63, 349.23], // F Major
      [196.00, 246.94, 293.66, 392.00], // G Major
    ];

    let chordIndex = 0;
    let noteIndex = 0;

    const playNextChiptuneTick = () => {
      if (!this.ctx || !this.isBgmPlaying || this.isMuted) return;

      const currentChord = chords[chordIndex];
      const freq = currentChord[noteIndex % currentChord.length];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(this.bgmVolume * 0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.19);

      // Bass note on chord changes
      if (noteIndex === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'square';
        bassOsc.frequency.setValueAtTime(currentChord[0] / 2, this.ctx.currentTime);
        bassGain.gain.setValueAtTime(this.bgmVolume * 0.2, this.ctx.currentTime);
        bassGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);

        bassOsc.start();
        bassOsc.stop(this.ctx.currentTime + 0.42);
      }

      noteIndex++;
      if (noteIndex >= currentChord.length * 2) {
        noteIndex = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }
    };

    this.bgmInterval = window.setInterval(playNextChiptuneTick, 200);
  }

  public stopBGM() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const soundEngine = new SoundEngine();
