# 📈 Los Santos Exchange – LCN

> A GTA V-inspired browser stock market simulation.  
> Trade stocks, react to breaking news, short sell, set limit orders  
> and grow your portfolio – all in your browser, no backend required.

![Version](https://img.shields.io/badge/version-2.5-00d4ff)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Browser%20%2F%20PWA-blueviolet)

---

## 🎮 Features

### 📊 Market Overview
- **33 stocks** across 7 sectors: FOOD · PHARMA · FINANCE · TRANSPORT · ENERGY · RETAIL · MEDIA
- **Live price simulation** with volatility, drift and rival system
- **Market Summary Bar** – Sentiment, Avg%, Gainers/Losers, TOP & FLOP
- **Top Movers Panel** – Top 3 by absolute 24H performance
- **Sortable columns** – PRICE / CHG / 24H / HELD
- **Live search** – filter by ticker or company name
- **Heatmap mode** – color-coded grid view by performance intensity
- **Sector filter tabs** – ALL / FOOD / PHARMA / FINANCE / TRANSPORT / ENERGY / RETAIL / MEDIA
- **Weekday effects** – MON surge, FRI sell-off, quiet weekends

### 📰 News System
- **Breaking news events** with **30-second reaction window**
- Countdown timer + progress bar before price impact
- 40+ unique news events across all stocks
- Scrolling news bar at the bottom

### 💹 Trading
- **Buy / Sell** with quantity presets (1 / 10 / 50 / 100 / MAX)
- **Limit Orders** – BUY below / SELL above target price
- **Stop-Loss** – auto-sell at configurable loss percentage
- **Short Selling** – open/cover shorts with collateral & borrow fees
- **Insider Tips** – mysterious contact tips every 90s (70% accuracy)
- **Price Alerts** – notify when a stock hits your target price
- **Transaction fees** on every trade

### 📱 Stock Detail Modal
- Live price chart with **15T / 30T / 60T** timeframe toggle
- Extended stats: HIGH/LOW · ALL-TIME H/L · VOL · MKT CAP · SECTOR
- **Rival Quick-Link** – click rival ticker to open their modal
- Short position status with live P&L
- Limit order & stop-loss setup
- Watchlist toggle

### 💼 Portfolio & Sidebar
- **3 Sidebar Tabs**: MARKET · PORTFOLIO · HISTORY
- Holdings with live P&L per position
- Short positions panel
- Net Worth chart (last 60 ticks)
- Trade History (last 50 trades)
- Stats: Net Worth · Return · Trades · Realized P&L · Best/Worst Trade
- Watchlist with live prices

### 💾 Save System
- **3 save slots** with net worth preview
- Auto-save every 30 seconds
- Time compression on load (simulates missed ticks)
- PWA installable on mobile/tablet

### 📲 Responsive Layout
- Full **tablet & mobile support** (≤ 1024px)
- Bottom navigation bar: MARKET · PORTFOLIO · HISTORY
- Compact header, scrollable panels
- Touch-optimized modals

---

## 🗂 File Structure
LSX-Lokal-Storage-Game/
├── index.html # UI structure – header, market table, modals, sidebar
├── script.js # Complete game logic (~50KB)
└── style.css # Dark trading terminal theme (~25KB)


---

## 🚀 Getting Started

No install required. Just open `index.html` in any modern browser.

```bash
git clone https://github.com/DrBroty/LSX-Lokal-Storage-Game.git
cd LSX-Lokal-Storage-Game
open index.html
```

Or serve locally:
```bash
npx serve .
# → http://localhost:3000
```

---

## 🗺 Roadmap

| Version | Feature |
|---|---|
| ✅ v2.1 | News reaction window (30s), Bug fixes |
| ✅ v2.2 | Extended news events (40+) |
| ✅ v2.3 | News toast over modal, trade button in toast |
| ✅ v2.4 | Sidebar tabs, Short selling, Insider tips, Portfolio chart, Trade history, Weekday effects |
| ✅ v2.5 | Market redesign, Modal improvements, Mobile responsive |
| 🔜 v2.6 | News history, Candlestick chart, Bull/Bear market phases, Keyboard shortcuts, Speed control |

---

## 🛠 Built With

- Vanilla JavaScript (no frameworks)
- HTML5 Canvas (charts)
- CSS3 (dark theme, animations)
- LocalStorage (persistence)
- PWA manifest (installable)

---

## 📄 License

MIT – feel free to fork and build on it.

---

*Los Santos Exchange is a fan project inspired by GTA V's LCN stock market.*  
*Not affiliated with Rockstar Games.*