# 📈 Los Santos Exchange (LSX)

> A real-time stock market simulation game set in the GTA V universe — trade stocks, short sell, react to breaking news, and climb the leaderboard.

![LSX Banner](https://los-santos-exchange.de/og-image.png)

---

## 🎮 Features

- **60+ GTA V stocks** across 8 sectors (FOOD, FINANCE, TECH, TRANSPORT, ENERGY, RETAIL, PHARMA, MEDIA)
- **Real-time price simulation** with rival stock correlation, weekday volatility effects and sector news events
- **Short selling** with daily borrow fees and stop-loss protection
- **Limit orders & stop-losses** — set it and forget it
- **Dividend payouts** every 7 game days based on sector
- **Insider tips** — 70% accuracy, use them wisely
- **30-second news reaction window** — act before the market does
- **Heatmap & Top Movers** panel for market overview
- **Discord OAuth login** — your progress is saved server-side per account
- **PWA support** — installable on mobile and desktop
- **Discord Webhook** notifications for big trades and milestones

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS, HTML5, CSS3, Canvas API |
| Backend | PHP 8, Discord OAuth2 |
| Storage | Server-side JSON per Discord user |
| Auth | Discord OAuth2 (`identify` scope) |
| Hosting | Netcup Webhosting |
| PWA | Service Worker, Web App Manifest |

---

## 🚀 Setup

### 1. Discord App erstellen
- Gehe zu [discord.com/developers/applications](https://discord.com/developers/applications)
- Neue App erstellen → OAuth2 → Redirect URI hinzufügen:
https://deinedomain.de/lsx-proxy/oauth.php


### 2. `lsx-proxy/config.php` anlegen
```php
<?php
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure',   '1');
ini_set('session.cookie_httponly', '1');
session_start();

define('DISCORD_CLIENT_ID',     'DEINE_CLIENT_ID');
define('DISCORD_CLIENT_SECRET', 'DEIN_CLIENT_SECRET');
define('DISCORD_REDIRECT_URI',  'https://deinedomain.de/lsx-proxy/oauth.php');
define('DISCORD_WEBHOOK_URL',   'DEIN_WEBHOOK_URL');
define('SAVES_DIR',             __DIR__ . '/saves/');
define('SESSION_SECRET',        'ZUFAELLIGER_STRING');

if (!is_dir(SAVES_DIR)) mkdir(SAVES_DIR, 0755, true);
```

### 3. Dateien hochladen
httpdocs/
├── index.html
├── style.css
├── script.js
├── sw.js
├── manifest.json
└── lsx-proxy/
├── config.php
├── oauth.php
├── save.php
├── load.php
├── logout.php
├── webhook.php
└── saves/ ← wird automatisch erstellt


### 4. Testen
| URL | Erwartete Antwort |
|---|---|
| `/lsx-proxy/load.php` | `{"error":"Not logged in"}` |
| `/lsx-proxy/oauth.php` | Weiterleitung zu Discord |
| Nach Login: `/lsx-proxy/load.php` | `{"newGame":true}` oder Spielstand |

---

## 💰 Trading Fees

| Volumen | Fee |
|---|---|
| unter $1.000 | $25 flat |
| $1.000 – $9.999 | 1.20% |
| $10.000 – $49.999 | 0.80% |
| $50.000 – $199.999 | 0.50% |
| ab $200.000 | 0.25% |

---

## 📁 Projektstruktur
script.js — Komplette Spiellogik (Simulation, Trading, UI, News, Save/Load)
style.css — Dark-Theme UI, responsive
index.html — Shell, alle DOM-Elemente
sw.js — Service Worker (Cache First, PHP bypass)
manifest.json — PWA Manifest
lsx-proxy/ — PHP Backend (OAuth, Save, Load, Webhook)


---

## 🔒 Sicherheit

- Spielstände werden serverseitig unter `saves/<discord_id>.json` gespeichert
- Kein Spieler kann auf fremde Saves zugreifen
- Session läuft über PHP mit `SameSite=None; Secure; HttpOnly`
- Discord Secrets niemals in den Code committen — nur in `config.php` (nicht im Repo)

---

## 📜 Lizenz

This project is for entertainment purposes only.  
GTA V and all related assets are property of **Rockstar Games**.  
LSX is a fan-made project with no commercial intent.

---

*Built with 💚 for the streets of Los Santos*