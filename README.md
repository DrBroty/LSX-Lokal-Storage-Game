# 📈 Los Santos Exchange (LSX)

> A real-time stock market simulation game set in the GTA V universe — trade stocks, short sell, react to breaking news, and build your empire.

[![Live](https://img.shields.io/badge/LIVE-los--santos--exchange.de-00d4ff?style=flat-square)](https://los-santos-exchange.de)
[![License](https://img.shields.io/badge/license-MIT-00ff88?style=flat-square)](LICENSE)
[![PHP](https://img.shields.io/badge/PHP-8.x-gold?style=flat-square)](https://php.net)

---

## 🎮 Features

### Trading
- **60+ GTA V stocks** across 8 sectors (FOOD, FINANCE, TECH, TRANSPORT, ENERGY, RETAIL, PHARMA, MEDIA)
- **Short selling** with 1:1 collateral, daily borrow fees (0.15%/day) and stop-loss protection
- **Limit orders** — BUY ≤ and SELL ≥ auto-execute when price hits target
- **Stop-losses** for both long and short positions
- **Price alerts** — notified when a stock crosses your target price
- **Trading fees** — tiered structure that rewards larger positions

### Market Simulation
- **Real-time price simulation** every 4 seconds with rival stock correlation
- **Mean reversion** — stocks drift back toward their base price over time
- **Price floor** at 10% of base price — no permanent penny stocks
- **Weekday volatility** — Monday spikes, Friday sell-off, quiet weekends
- **Sector news events** — 30-second reaction window to act before the market moves
- **Insider tips** — 60% accuracy, act wisely
- **Dividends** every 7 game days based on sector yield
- **Milestone webhooks** — Discord notifications for big trades and net worth records

### UI / UX
- **Permanent 3-column layout** — Left sidebar (chart, movers, watchlist, scoreboard, history), Main (market table + heatmap), Right sidebar (positions, shorts, orders, stop-losses, alerts)
- **Stock Modal with 4 Tabs** — 📈 TRADE · 📉 SHORT · ⏱ ORDERS · 🔔 ALERT
- **Market Summary Bar** — Bull/Bear sentiment, gainers/losers, top/flop movers
- **Heatmap view** — color-coded grid by 24h performance
- **Trade History Overlay** — full history with filter (ALL/BUY/SELL/SHORT/COVER) + CSV export
- **Skeleton loading screen** — no flash of unstyled content
- **PWA support** — installable on mobile and desktop

### Security & Backend
- **Discord OAuth2** (`identify` scope only) — no email, no messages
- **CSRF protection** on all POST endpoints
- **Atomic writes** — tmp → rename, prevents corrupt saves
- **No-cache headers** on load.php and save.php
- **Save size limit** — 512 KB max per user
- **Admin panel** — Discord ID whitelist, separate webhook channel, full player list
- **Error logging** — JS errors forwarded to Discord webhook after login

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS, HTML5, CSS3, Canvas API |
| Backend | PHP 8, Discord OAuth2 |
| Storage | Server-side JSON per Discord user |
| Auth | Discord OAuth2 (`identify` scope) |
| Hosting | Netcup Webhosting (Germany) |
| PWA | Service Worker, Web App Manifest |

---

## 💰 Trading Fees

| Volume | Fee |
|---|---|
| Under $1,000 | $50 flat |
| $1,000 – $9,999 | 2.00% |
| $10,000 – $49,999 | 1.50% |
| $50,000 – $199,999 | 1.00% |
| $200,000+ | 0.60% |

Starting cash: **$10,000**

---

## 🚀 Setup

### 1. Discord App erstellen
- Gehe zu [discord.com/developers/applications](https://discord.com/developers/applications)
- Neue App → OAuth2 → Redirect URI:
  ```
  https://deinedomain.de/lsx-proxy/oauth.php
  ```

### 2. `lsx-proxy/config.php` anlegen

Kopiere `lsx-proxy/config.example.php` und fülle die Werte aus:

```php
<?php
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure',   '1');
ini_set('session.cookie_httponly', '1');
session_start();

define('DISCORD_CLIENT_ID',     'DEINE_CLIENT_ID');
define('DISCORD_CLIENT_SECRET', 'DEIN_CLIENT_SECRET');
define('DISCORD_REDIRECT_URI',  'https://deinedomain.de/lsx-proxy/oauth.php');

// Haupt-Webhook (Trades, Milestones, Logs)
define('DISCORD_WEBHOOK_URL',   'DEIN_WEBHOOK_URL');

// Admin-Webhook (Admin-Panel Aktionen) — optional, Fallback auf DISCORD_WEBHOOK_URL
define('ADMIN_WEBHOOK_URL',     'DEIN_ADMIN_WEBHOOK_URL');

// Discord IDs die Zugang zum Admin-Panel haben
define('ADMIN_IDS', ['DEINE_DISCORD_ID']);

define('SAVES_DIR',      __DIR__ . '/saves/');
define('SESSION_SECRET', 'ZUFAELLIGER_SICHERER_STRING');

if (!is_dir(SAVES_DIR)) mkdir(SAVES_DIR, 0755, true);
```

### 3. Dateistruktur

```
httpdocs/
├── index.html
├── privacy.html
├── tos.html
├── manifest.json
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── admin.css
│   ├── js/
│   │   ├── script.js
│   │   └── admin.js
│   └── icons/
└── lsx-proxy/
    ├── config.php          ← nicht im Repo (gitignored)
    ├── config.example.php  ← Vorlage
    ├── oauth.php
    ├── save.php
    ├── load.php
    ├── logout.php
    ├── webhook.php
    ├── admin.php
    ├── admin.html
    └── saves/              ← wird automatisch erstellt (gitignored)
```

### 4. Testen

| URL | Erwartete Antwort |
|---|---|
| `/lsx-proxy/load.php` | `{"error":"Not logged in"}` |
| `/lsx-proxy/oauth.php` | Weiterleitung zu Discord |
| Nach Login: `/lsx-proxy/load.php` | `{"newGame":true}` oder Spielstand |
| `/lsx-proxy/admin.html` | Admin-Panel (nur für ADMIN_IDS) |

---

## 📁 Projektstruktur

| Datei | Beschreibung |
|---|---|
| `assets/js/script.js` | Komplette Spiellogik — Simulation, Trading, UI, News, Save/Load, Logging |
| `assets/css/style.css` | Dark-Theme UI, 3-Spalten-Layout, Modal, responsive |
| `index.html` | App-Shell mit permanentem 3-Spalten-Layout |
| `privacy.html` | Datenschutzerklärung (DSGVO-konform) |
| `tos.html` | Terms of Service |
| `manifest.json` | PWA Manifest |
| `lsx-proxy/save.php` | Save-Endpoint (CSRF, Größenlimit, Atomic Write, No-Cache) |
| `lsx-proxy/load.php` | Load-Endpoint (CSRF-Token, No-Cache, Corrupt-Recovery) |
| `lsx-proxy/oauth.php` | Discord OAuth2 Flow |
| `lsx-proxy/webhook.php` | Discord Webhook Proxy (CSRF-geschützt) |
| `lsx-proxy/admin.php` | Admin-API (Discord ID Whitelist, Action Logging) |
| `lsx-proxy/admin.html` | Admin-Panel UI |
| `lsx-proxy/config.example.php` | Konfigurations-Vorlage |

---

## 🔒 Sicherheit

- Spielstände serverseitig unter `saves/<discord_id>.json` — kein Cross-Access möglich
- Session: `SameSite=None; Secure; HttpOnly`
- CSRF-Token auf allen POST-Endpoints (`X-CSRF-Token` Header)
- `keepalive: true` fetch statt `sendBeacon` für zuverlässiges Tab-Close-Saving mit CSRF
- Admin-Panel: Discord ID Whitelist + separater Webhook-Kanal
- JS-Fehler werden erst nach erfolgreichem Login (CSRF gesetzt) an Webhook gesendet
- `config.php` mit allen Secrets ist gitignored

---

## 📜 Lizenz & Legal

Dieses Projekt ist ein Fan-Projekt ohne kommerziellen Zweck.  
GTA V und alle verwandten Assets sind Eigentum von **Rockstar Games / Take-Two Interactive**.  
LSX steht in keiner offiziellen Verbindung zu diesen Unternehmen.

- [Privacy Policy](https://los-santos-exchange.de/privacy.html)
- [Terms of Service](https://los-santos-exchange.de/tos.html)

---

*Built with 💚 for the streets of Los Santos*