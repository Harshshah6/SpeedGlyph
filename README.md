<div align="center">
  <img src="SpeedGlyph/src/assets/logo.png" alt="SpeedGlyph Logo" width="128" style="border-radius: 24px;" />
  <h1>SpeedGlyph</h1>
  <p><strong>A blazing fast, aesthetically pleasing typing practice application built for speed and precision.</strong></p>
  <p>Practice your typing skills across various modes and track your progress in real-time.</p>
</div>

<br />

## Features

- **Dynamic Typing Engine**: Real-time feedback, precise caret alignment, and visual error indications.
- **Multiple Game Modes**: Practice in Easy, Medium, Hard, Custom, Zen, and Timed modes.
- **Rich Theming**: Enjoy 10 beautifully crafted themes (Moon, Evil, Cute, Coffee, Ocean, Forest, Inferno, Royal, Frost, Cyber) with full support for Light and Dark modes.
- **Performance Analytics**: View your history and typing speed charts to track your improvement over time.
- **Custom Desktop App**: Built on Tauri v2 for a lightweight, native desktop experience with a customized frameless window and drag regions.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Desktop Runtime**: Tauri v2 (Rust)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Animations**: Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Database**: SQLite (via Drizzle ORM and Tauri SQL Plugin)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Rust](https://www.rust-lang.org/) (for building the Tauri desktop application)
- Tauri dependencies for your specific OS

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   cd SpeedGlyph
   ```

2. Install JavaScript dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with the Tauri desktop window:
```bash
npm run tauri dev
```

If you only want to work on the web frontend without launching the Rust backend:
```bash
npm run dev
```

### Building for Release

To compile the application into a standalone native installer (`.msi`, `.exe`, etc.):
```bash
npm run build-release
```
The bundled installers will be located in the `src-tauri/target/release/bundle/` directory.

## License

SpeedGlyph is open source software.
