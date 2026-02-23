# 🧠 Memory Card Game

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.18-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**An interactive memory card matching game built with React, TypeScript, and Vite. Challenge your memory skills with beautiful animations and responsive design.**

[Live Demo](#) • [Features](#features) • [Getting Started](#getting-started) • [Documentation](#documentation)

</div>

---

## ✨ Features

- 🎮 **Multiple Difficulty Levels** - Easy, Medium, and Hard modes with adjustable grid sizes
- 🎨 **Modern UI/UX** - Beautiful gradient designs, smooth animations, and intuitive interface
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark Mode Support** - Switch between light and dark themes
- 🎵 **Sound Effects & Background Music** - Immersive audio feedback (toggle in settings)
- 📊 **High Scores Tracking** - Persistent leaderboard with localStorage
- ⏱️ **Real-time Timer** - Track game duration with formatted display
- 🎯 **Game Statistics** - Monitor moves, time, and score metrics
- 🎭 **Animated Cards** - 3D flip effects, match celebrations, and smooth transitions
- ♿ **Accessibility** - ARIA labels, keyboard navigation, proper semantic HTML
- 📈 **Performance Optimized** - Fast builds with Vite, optimized with React memoization

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/memory-card-game.git
cd memory-card-game
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:5173
```

---

## 📖 Usage

### How to Play

1. Choose a difficulty level when starting a new game
2. Click or tap cards to flip them and reveal the matching pairs
3. Try to match all pairs in the shortest time with minimum moves
4. Complete the game to see your score and check if you set a high score
5. Access your statistics from the High Scores modal

### Game Modes

| Mode | Grid Size | Pairs | Difficulty |
|------|-----------|-------|------------|
| 🟢 Easy | 2x2 | 2 | Beginner |
| 🟡 Medium | 4x4 | 8 | Intermediate |
| 🔴 Hard | 4x6 | 12 | Advanced |

### Settings

- **Sound Effects** - Toggle game sound feedback
- **Background Music** - Enable/disable background music
- **Dark Mode** - Switch between light and dark theme
- **Timer Display** - Show/hide the game timer

---

## 🛠️ Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

---

## 📦 Project Structure

```
memory-card-game/
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── Card.tsx              # Individual card component
│   │   │   ├── GameBoard.tsx         # Game grid container
│   │   │   ├── GameControls.tsx      # Game control buttons
│   │   │   └── ScoreBoard.tsx        # Score display
│   │   ├── layout/
│   │   │   ├── Header.tsx            # App header
│   │   │   └── Footer.tsx            # App footer
│   │   └── ui/
│   │       ├── Button.tsx            # Reusable button component
│   │       ├── Modal.tsx             # Modal dialogs
│   │       └── LoadingSpinner.tsx    # Loading state
│   ├── hooks/
│   │   ├── useGameLogic.ts           # Game logic hook
│   │   ├── useSound.ts               # Audio management
│   │   └── useTimer.ts               # Timer functionality
│   ├── context/
│   │   └── GameContext.tsx           # Global game state
│   ├── types/
│   │   ├── gametypes.ts              # Game-related types
│   │   └── index.ts                  # Type exports
│   ├── utils/
│   │   ├── gameHelpers.ts            # Game utility functions
│   │   ├── localStorage.ts           # Storage management
│   │   └── constants.ts              # App constants
│   ├── styles/
│   │   ├── globals.css               # Global styles
│   │   └── animations.css            # Animation definitions
│   ├── assets/
│   │   └── sounds/                   # Audio files
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Root styles
├── public/                           # Static assets
├── dist/                             # Production build
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── vite.config.ts                    # Vite configuration
├── tailwind.config.cjs               # Tailwind configuration
└── README.md                         # This file
```

---

## 🎨 Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Code Quality**: ESLint 9
- **CSS Processing**: PostCSS & Tailwind
- **Package Manager**: npm

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy using Netlify CLI
netlify deploy --prod --dir=dist
```

### Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist` folder, ready for deployment.

---

## 📋 Component Documentation

### Card Component
- Displays individual game cards with 3D flip animations
- Props: `card`, `onClick`, `disabled`, `size`
- Supports emoji, text, or image content

### GameBoard Component
- Manages the card grid layout
- Responsive grid based on difficulty level
- Props: `cards`, `onCardClick`, `difficulty`, etc.

### Modal Component
- Displays game modals (Win, Pause, Settings, High Scores)
- Features backdrop blur and smooth animations
- Click outside to close or press ESC key

### ScoreBoard Component
- Shows current game statistics
- Displays moves, time, and score in real-time

---

## 🎯 Future Enhancements

- [ ] Multiplayer support (local and online)
- [ ] Leaderboard API integration
- [ ] Additional card themes and designs
- [ ] Power-ups and special abilities
- [ ] Achievement/badge system
- [ ] Social sharing feature (Twitter, Facebook)
- [ ] Mobile app versions (React Native)
- [ ] Progressive Web App (PWA) capabilities
- [ ] Game replay and review features
- [ ] AI difficulty levels

---

## 🐛 Known Issues

- Currently, there are no known bugs or issues. 
If you find any, please feel free to open an issue.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure code follows ESLint rules and TypeScript best practices.

---

---

## 📄 License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute this software in accordance with the license terms.  

See the [LICENSE](LICENSE) file for full details.

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- Tailwind CSS team for utility-first styling
- All contributors and users who tested the game

---

## 📞 Support

If you have any questions or suggestions, feel free to contact me at:

📧 someshbhatnagar535@gmail.com

---

<div align="center">

## 👨‍💻 About the Developer

**Somesh Bhatnagar** - Full Stack Developer passionate about creating modern web applications with exceptional user experiences.

<a href="https://www.linkedin.com/in/somesh-bhatnagar-18b388328/">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>
<a href="https://www.instagram.com/bhatnagarsomesh/">
  <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" />
</a>
<a href="https://github.com/someshcoder">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
</a>

---

<div align="center">

**Made with ❤️ by Somesh**

⭐ If you like this project, consider giving it a star!

</div>
```
