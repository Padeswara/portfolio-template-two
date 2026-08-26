# 🕹️ RETRO GAME // FRONT-END WARRIOR PORTFOLIO

Website portfolio interaktif bertema **Game Retro (8-Bit & 16-Bit Arcade & RPG Aesthetic)** untuk **Front End Developer**, dibangun menggunakan teknologi modern: **Vite + React (TypeScript)**, **Tailwind CSS v4**, dan **Web Audio API** untuk efek suara & BGM chiptune tanpa aset eksternal.

---

## 🌟 Fitur Utama

- 🎮 **4 Mode Tema Retro Otomatis**:
  - `🕹️ ARCADE NEON` (Synthwave / Cyberpunk Dark Violet & Neon Cyan/Magenta)
  - `📟 GAMEBOY CLASSIC` (Nostalgic 4-Shade Green Matrix)
  - `🔴 NES 8-BIT` (Classic Nintendo Crimson, Gold & Navy)
  - `💻 DOS PHOSPHOR` (Monochrome Green & Amber CRT Terminal)
- 📺 **CRT Monitor Engine**: Efek scanlines horizontal, vignette monitor lengkung, dan flickering scanline beam yang bisa di-toggle on/off.
- 🔊 **8-Bit Web Audio Synthesizer**: Efek suara sintetis (Coin pickup, Laser beam, Jump, Power-up, Damage hit, Explosion, Fanfare victory, Typewriter blip) & Ambient Chiptune BGM generator bawaan langsung dari Web Audio API browser.
- 🧙‍♂️ **Stage 00: Player 1 Title Screen**:
  - Karakter sprite 8-bit interaktif (bisa diklik untuk melompat & menghasilkan EXP/Coin).
  - RPG Typewriter Dialog Box dengan efek audio suara dialog retro.
  - Quick action buttons (Start Quest, Stats Sheet, Play Arcade, Insert Coin).
- 📜 **Stage 01: Character Profile & Stats**:
  - RPG Attribute Bars (Clean Code, Performance Speed, UI/UX Magic, State Architecture, Responsive Defense, Caffeine Stamina).
  - Equipped Artifacts (VS Code of Luminescence, Tailwind CSS Aegis, TypeScript Plate, React 19 Core Crystal, Coffee Mana Elixir).
- 🔮 **Stage 02: Spellbook & Ability Matrix**:
  - Interactive Skill Tree dengan klasifikasi elemen (Lightning, Arcane, Fire, Wind, Holy).
  - Filter kategori: Core Sorcery, Frameworks, Styling & FX, Tools & Runes.
  - Spell Grimoire inspector dengan level mastery dan incantation detail.
- 💎 **Stage 03: Stage Select & Boss Raids**:
  - Showcase proyek dengan format Boss Difficulty (`Rank S+`, `Rank S`, `Rank A+`), boss encounters, dan tech loot drops.
  - Interactive **Cartridge Modal Inspection** bergaya kaset game retro 64-bit.
- 👾 **Stage 04: Playable Arcade Mini-Game ("Bug Smasher: Code Defender")**:
  - Game arcade Canvas 2D playable langsung di browser!
  - Tembak bug NullPointer, CSS Overflow, Merge Conflict, dan Memory Leak Titan.
  - Power-ups: Coffee speed buff, TypeScript shield, Coin drops.
  - High score tersimpan di `localStorage` & kontrol sentuh on-screen untuk mobile.
- 🏆 **Stage 05: Quest Log & Trophy Room**:
  - Timeline karir dan ekspedisi guild developer.
  - 10 Unlockable Achievements / Trophy system dengan notifikasi retro popup & confetti!
- 💾 **Stage 06: Save Point & Transmission Terminal**:
  - Save Point Recovery Crystal untuk autosave progress.
  - Terminal form interaktif untuk mengirim pesan & penawaran proyek.
  - Social inventory memory cards (GitHub, LinkedIn, Twitter/X, Discord, Email).
- ⚡ **Secret Konami Code Easter Egg**:
  - Tekan urutan tombol keyboard: `↑` `↑` `↓` `↓` `←` `→` `←` `→` `B` `A` untuk membuka **30 LIVES GOD MODE** (99 HP, 9,999 Gold Coins, 999,999 Score, dan trophy rahasia)!

---

## 🚀 Panduan Menjalankan Project

### 1. Instalasi Dependensi
```bash
pnpm install
```

### 2. Jalankan Local Development Server
```bash
pnpm dev
```
Buka browser di `http://localhost:5173`.

### 3. Build untuk Production
```bash
pnpm build
```

### 4. Preview Production Build
```bash
pnpm preview
```

---

## 📁 Struktur Direktori

```
src/
├── components/
│   ├── about/            # Character Lore & Equipment Loadout
│   ├── contact/          # Save Point & Transmission Terminal Form
│   ├── experience/       # Quest Log Timeline & Trophy Room Modal
│   ├── hero/             # Title screen, Pixel Avatar, Typewriter Dialog
│   ├── layout/           # Retro HUD Navbar, Footer, CRT Overlay
│   ├── minigame/         # Playable Canvas Arcade "Bug Smasher"
│   ├── projects/         # Stage Select & Cartridge Detail Modal
│   ├── skills/           # RPG Skill Tree & Spellbook Grimoire
│   └── ui/               # PixelButton, PixelCard, PixelBadge, Toast, GodModeModal
├── context/
│   ├── AudioContext.tsx  # Web Audio API Sound Effects & Chiptune BGM
│   ├── GameContext.tsx   # Global Player XP, Level, Coins, Achievements
│   └── ThemeContext.tsx  # 4 Retro Themes & CRT Scanline Toggle
├── data/
│   ├── achievementsData.ts # 10 Unlockable retro achievements
│   └── portfolioData.ts    # Developer bio, skills, projects, experience
├── hooks/
│   ├── useKonamiCode.ts  # Konami cheat code listener
│   └── useTypewriter.ts  # Retro typewriter with sound effect
├── utils/
│   └── soundEngine.ts    # Procedural 8-bit sound waveforms synthesizer
├── index.css             # Tailwind v4 theme, pixel borders & CRT scanlines
├── App.tsx               # Main application container
└── main.tsx              # Entry point
```

---

## 🎨 Kustomisasi Data Developer

Anda dapat mengubah data profil, skills, proyek, dan tautan sosial dengan mengedit file:
- `src/data/portfolioData.ts` (Nama, tagline, status, item gear, daftar skills, proyek, dan timeline pengalaman).
- `src/data/achievementsData.ts` (Daftar trophy & hadiah XP).
