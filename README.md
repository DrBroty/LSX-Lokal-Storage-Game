# 📈 LSX – Los Santos Exchange

> A browser-based stock market simulation game inspired by GTA V's LCN market.  
> No backend. No install. Runs entirely in your browser via LocalStorage.

![LSX Banner](https://img.shields.io/badge/LSX-LCN%20Market-00d4ff?style=for-the-badge&labelColor=0a0e14)
![Version](https://img.shields.io/badge/version-2.1-00ff88?style=for-the-badge&labelColor=0a0e14)
![License](https://img.shields.io/badge/license-MIT-ffd700?style=for-the-badge&labelColor=0a0e14)

---

## 🎮 What is LSX?

LSX is a fictional stock exchange set in the world of **San Andreas**.  
Trade stocks from companies like Maze Bank, Burgershot, FlyUS and Betta Pharmaceuticals —  
react to breaking news, set limit orders and grow your portfolio from **$100,000** to millions.

---

## ✨ Features

- **33 tradeable stocks** across 7 sectors (Food, Pharma, Finance, Air, Energy, Retail, Media)
- **Rival system** – competing companies move inversely (e.g. BSTA ↑ → UAAT ↓)
- **📰 30-second news reaction window** – breaking events are announced *before* the price changes, giving you time to trade first
- **Limit orders** – automatically buy below or sell above a target price
- **Stop-loss protection** – auto-sell if a position loses more than X%
- **Watchlist** – track your favorite stocks in the sidebar
- **Live ticker & news bar** – scrolling price ticker and breaking news at the bottom
- **3 save slots** via LocalStorage – your progress persists across sessions
- **Time compression** – missed ticks are simulated when you reload
- **PWA-ready** – installable as a standalone app on mobile & desktop

---

## 🗂️ Project Structure
LSX-Lokal-Storage-Game/
├── index.html # UI structure – header, market table, modals, sidebar
├── script.js # All game logic – simulation, trading, news, save/load
└── style.css # Dark theme styling – GTA-inspired terminal aesthetic


---

## 🚀 Getting Started

No build step required. Just open `index.html` in any modern browser.

```bash
git clone https://github.com/DrBroty/LSX-Lokal-Storage-Game.git
cd LSX-Lokal-Storage-Game
# Open index.html in your browser
```

Or play it directly via **GitHub Pages** if enabled on this repo.

---

## 🕹️ How to Play

1. **Select a save slot** on startup (or start a new game)
2. **Click any stock** in the market table to open the detail modal
3. **Buy or sell shares** using the trade panel
4. **Set limit orders** to automate entries and exits
5. **Watch for 📰 NEWS flashes** – you have **30 seconds** to react before the market moves
6. **Set stop-losses** to protect positions from big drops
7. Progress **auto-saves every 30 seconds** and on tab close

---

## 📊 Sectors

| Sector | Example Companies |
|--------|-------------------|
| 🍔 FOOD | Burgershot, Clucking Bell, TacoBomb |
| 💊 PHARMA | Betta Pharmaceuticals, Bilkington Research |
| ✈️ AIR | FlyUS, AirEmu, Hijak Motors |
| 🏦 FINANCE | Maze Bank, Bank of Liberty, Merryweather |
| ⚡ ENERGY | Gold Coast Dev., BobMulét Energy |
| 🛍️ RETAIL | Debonaire, Redwood, Vangelico |
| 📺 MEDIA | Lifeinvader, Worldwide FM, Rockford Vandals |

---

## 🛠️ Changelog

### v2.1
- ✨ 30-second news reaction window with countdown
- ✨ Persistent volume data per stock
- 🐛 Mini-chart color logic corrected
- 🐛 `beforeunload` double-listener fix
- 🎨 Gold pulsing NEWS badge on affected stock rows

### v2.0
- Codebase split into `index.html`, `script.js`, `style.css`

### v1.0
- Initial all-in-one release

---

## 👤 Author

Made by **[@DrBroty](https://github.com/DrBroty)**  
Inspired by the LCN stock market in *Grand Theft Auto V*

---

*Est. 1992 · San Andreas · LCN Market*