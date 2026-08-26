// Web Audio API Soft Harvest Moon Chiptune Sound Synthesizer
// 0 external audio dependencies!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private sfxVolume: number = 0.25;
  private bgmVolume: number = 0.12;
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
      this.isBgmPlaying = true;
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

  // 1. Soft Wooden Click (Menu select)
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(this.sfxVolume * 0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // 2. Gold / Harvest Coin (Ka-ching chime)
  public playCoin() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.07); // E6

    gain.gain.setValueAtTime(this.sfxVolume * 0.45, now);
    gain.gain.setValueAtTime(this.sfxVolume * 0.45, now + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.29);
  }

  // 3. Water / Seed Shoot Sound (Soft blip)
  public playLaser() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

    gain.gain.setValueAtTime(this.sfxVolume * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // 4. Farmer Hop / Jump
  public playJump() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.12);

    gain.gain.setValueAtTime(this.sfxVolume * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // 5. Crop Harvest / Power Up (Warm Marimba Chime)
  public playPowerUp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [392, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(this.sfxVolume * 0.3, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.16);
    });
  }

  // 6. Weed Cut / Tool Hit
  public playHit() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);

    gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // 7. Pest Clear / Explosion (Soft pop)
  public playExplosion() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.18;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.18);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.sfxVolume * 0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();
  }

  // 8. Festival Victory Fanfare
  public playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.10 }, // C5
      { f: 659.25, d: 0.10 }, // E5
      { f: 783.99, d: 0.10 }, // G5
      { f: 1046.50, d: 0.25 }, // C6
    ];

    let timeOffset = 0;
    const now = this.ctx.currentTime;

    melody.forEach((note) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + timeOffset);

      gain.gain.setValueAtTime(this.sfxVolume * 0.35, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + note.d + 0.02);

      timeOffset += note.d + 0.02;
    });
  }

  // 8b. Faint / Exhausted Sound
  public playGameOver() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const sadMelody = [
      { f: 392.00, d: 0.15 }, // G4
      { f: 349.23, d: 0.15 }, // F4
      { f: 329.63, d: 0.15 }, // E4
      { f: 261.63, d: 0.35 }, // C4
    ];

    let timeOffset = 0;
    const now = this.ctx.currentTime;

    sadMelody.forEach((note) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, now + timeOffset);

      gain.gain.setValueAtTime(this.sfxVolume * 0.25, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + note.d + 0.02);

      timeOffset += note.d + 0.03;
    });
  }

  // 9. Typewriter Dialogue Blip (Gentle wood click)
  public playTypewriter() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const randFreq = 480 + Math.random() * 80;
    osc.frequency.setValueAtTime(randFreq, this.ctx.currentTime);

    gain.gain.setValueAtTime(this.sfxVolume * 0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  // 10. Cozy Harvest Moon Pastoral BGM
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

    // Upbeat gentle Harvest Moon town progression (C -> G/B -> Am -> F)
    const melodyPattern = [
      523.25, 659.25, 783.99, 659.25, // C5, E5, G5, E5
      493.88, 587.33, 783.99, 587.33, // B4, D5, G5, D5
      440.00, 523.25, 659.25, 523.25, // A4, C5, E5, C5
      349.23, 440.00, 523.25, 440.00, // F4, A4, C5, A4
    ];

    let noteIndex = 0;

    const playNextTick = () => {
      if (!this.ctx || !this.isBgmPlaying || this.isMuted) return;

      const freq = melodyPattern[noteIndex % melodyPattern.length];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(this.bgmVolume * 0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.21);

      noteIndex = (noteIndex + 1) % melodyPattern.length;
    };

    this.bgmInterval = window.setInterval(playNextTick, 240);
  }

  public stopBGM() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const soundEngine = new SoundEngine();
