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

Checke diese GIT ab https://github.com/DrBroty/LSX-Lokal-Storage-Game.git
3 Schritte abgeschlossen
Hier ist eine Übersicht des Repositories DrBroty/LSX-Lokal-Storage-Game:

Was ist das Projekt?
Es handelt sich um ein browserbasieres Börsen-Simulationsspiel namens Los Santos Exchange (LSX) – angelehnt an GTA V's fiktive Börse LCN . Das Spiel läuft komplett im Browser und speichert den Spielstand über den LocalStorage des Browsers, ohne Backend oder Datenbank.

Dateistruktur
Das Repo ist sehr schlank und besteht aus nur 3 Kerndateien :

Datei	Größe	Beschreibung
index.html	~8 KB	UI-Struktur: Header, Markttabelle, Modals, Sidebar
script.js	~41 KB	Gesamte Spiellogik (das Herzstück)
style.css	~23 KB	Styling, Dark-Theme im Börsen-Look
Features laut UI
Der HTML-Code zeigt einen vollständig ausgebauten Feature-Satz :

Das Market Overview listet Aktien nach Sektoren (Food, Pharma, Finance, Air, Energy, Retail, Media) mit Live-Ticker und 24h-Chart. Die Sidebar enthält Watchlist, Portfolio-Übersicht und aktive Limit Orders. Im Stock Detail Modal kann man Aktien kaufen/verkaufen, Limit Orders setzen, Stop-Loss konfigurieren und Aktien zur Watchlist hinzufügen. Zusätzlich gibt es ein Breaking-News-System (scrollender Newsbar), das vermutlich Kursbewegungen beeinflusst.

Commit-Historie
Das Projekt ist frisch – alle 3 Commits wurden heute am 14. April 2026 von DrBroty gepusht . Version 1.0 war noch ein All-in-One-File, Version 2.0 hat den Code sauber in style.css und script.js aufgeteilt.

Fazit & Auffälligkeiten
Das Projekt ist technisch solide strukturiert für ein reines Frontend-Projekt. Ein potenzieller Punkt: Das PWA-Manifest ist direkt als data:-URI im HTML eingebettet – das funktioniert, ist aber unkonventionell und könnte bei manchen Browsern Probleme mit der PWA-Installation verursachen. Die Hauptlogik liegt komplett in der ~41 KB großen script.js, was bei weiterem Wachstum eine Aufteilung in Module empfehlenswert macht.

Was möchtest du genauer untersuchen – die Spiellogik in script.js, das Styling oder etwas anderes?

Was könnte ich verbessern ( Ich bin broty ) und welche Neuen Features könnte ich einbauen?

Hier ist eine detaillierte Analyse mit konkreten Verbesserungen und neuen Feature-Ideen für dein Projekt:

🐛 Bugs & Code-Probleme
Volumen ist nicht persistent – In refreshModal() wird das Handelsvolumen mit Math.random() neu berechnet, statt es aus dem State zu lesen. Das heißt, der Wert ändert sich bei jedem Modal-Refresh willkürlich . Du solltest das Volumen pro Aktie im State simulieren und speichern.

Mini-Chart Farbe ist invertiert – In makeMiniChart() vergleichst du jeden Balken mit h[h.length-1] (letzter Wert), aber du setzt background:col so, dass Werte über dem aktuellen Preis rot werden, statt grün . Die Logik v >= h[h.length-1] sollte eigentlich v <= h[h.length-1] sein, damit ein steigender Chart grün erscheint.

compressTime() ohne Slot-Guard – Die Funktion wird aufgerufen, bevor geprüft wird ob state.savedAt valide ist, was bei einem komplett leeren State einen stillen undefined-Bug produziert .

Kein currentSlot-Guard beim Auto-Save – saveGame() returned silent bei !currentSlot, aber der beforeunload-Listener wird trotzdem registriert und kann in edge cases mehrfach hinzugefügt werden (kein removeEventListener) .

⚡ Konkrete Verbesserungen
Rival-System ist einseitig – Aktuell verändert nur der zuerst simulierte Stock seinen Rivalen. Der Rivale bekommt dabei keinen eigenen drift, sondern immer -drift * (0.4–0.7). Das ist mechanisch okay, aber wenn beide Aktien zufällig in einem Tick dran sind, überschreibt die zweite Berechnung die erste . Ein saubereres System würde alle Rivals in einem separaten Pass nach der Hauptsimulation adjustieren.

History-Länge ist inkonsistent – Der defaultState() erstellt 31 History-Einträge (30 loop + 1 push), aber simulateTick() begrenzt auf 60 via .shift(). Das führt über Zeit zu korrekten Werten, aber der Start-State ist leicht inkonsistent .

Keine Keyboard-Shortcuts – ESC schließt das Modal, aber Buy/Sell, Modal öffnen oder Save haben keinen Shortcut . Gerade S für Save oder B/V für Buy/Sell im offenen Modal würde das Spielgefühl stark verbessern.

🆕 Feature-Ideen
Portfolio Performance Chart – Ein eigener Graph, der deinen Gesamtdepotwert über Zeit plottet (analog zum bestehenden drawChart()). Der State speichert bereits stats, du müsstest nur ein netWorthHistory-Array dort ergänzen.

Marktphasen (Bull/Bear Market) – Ein globaler Multiplikator, der alle drift-Werte für z.B. 5 Minuten in eine Richtung zieht. Würde durch ein News-Event getriggert: "Los Santos in Rezession — Märkte brechen ein". Das Rival-System würde dadurch viel dramatischer wirken.

Dividenden – Stabile Sektoren (FOOD, FINANCE) zahlen alle X Ticks eine kleine Dividende pro gehaltener Aktie. Das würde eine Buy-and-Hold-Strategie belohnen und eine Alternative zum Daytrading schaffen.

Historische Trade-Liste – Eine neue Sidebar-Sektion die alle ausgeführten Trades logt: Ticker, Menge, Preis, Zeitpunkt, P&L. Das State-Object hat bereits stats, ein tradeLog: []-Array wäre eine einfache Ergänzung.

Speed-Kontrolle – Ein Slider oder 3 Buttons (🐢 Slow / ▶ Normal / ⚡ Fast), der das setInterval für priceIntervalId zwischen z.B. 8000ms, 4000ms und 1500ms umschaltet. Ein Einzeiler mit clearInterval + setInterval.

Mobile Touch-Optimierung – Das Layout hat zwar viewport meta, aber die Sidebar und Tabelle sind nebeneinander . Ein Responsive-Breakpoint mit einem Tab-System (Market | Portfolio | Orders) würde das Spiel auf dem Handy spielbar machen.

Was willst du zuerst angehen – die Bug-Fixes oder ein neues Feature?

OKay lass uns dies angehen und könnten wir, wenn eine Meldung ( News ) kommt Spielern 30 Sekunden geben zu reagieren und dann wird erst das ausgeführt ?

Alles klar, ich habe jetzt den kompletten Code. Ich implementiere jetzt alle Fixes + das neue 30-Sekunden-News-Reaktionssystem direkt ins Repo.

nein abe Mobil responsiv etc. wäre toll für ein Tablet

Gute Idee! Tablet-Optimierung zuerst – das bringt sofort spürbaren Unterschied. Lass mich kurz analysieren was das Layout braucht:

Was aktuell auf Tablet kaputt ist
.main ist ein fixes 2-Spalten Grid 1fr 280px – auf Tablet zu eng

Header mit allen Buttons überlappt sich

Tabellen-Spalten quetschen sich zusammen

Modals sind zu breit / Schrift zu klein

Market Controls (Suche + Tabs + Heatmap) wrappen chaotisch

Plan für Tablet-Optimierung
Breakpoints:

≤ 1024px – Tablet Landscape

≤ 768px – Tablet Portrait

Änderungen:

Element	Desktop	Tablet
.main Grid	1fr 280px	1fr (Sidebar unten)
Sidebar	rechte Spalte	Tab-Panel unten oder Drawer
Header	alle Infos nebeneinander	2 Zeilen
Modal	820px breit	95vw
Tabelle	7 Spalten	CHART-Spalte verstecken
Zwei Ansätze – welchen willst du?
Option A – Sidebar unten (einfacher, ~50 Zeilen CSS)
Sidebar klappt unter die Tabelle. Alles scrollbar. Kein JS nötig.

Option B – Drawer/Tab System (besser, ~80 Zeilen CSS + 20 JS)
Ein Bottom-Tab-Bar wie eine App:

text
[ 📊 MARKET ]  [ 💼 PORTFOLIO ]  [ 📋 HISTORY ]
Tippt man drauf → Vollbild-Ansicht wechselt. Fühlt sich wie eine echte App an.

Option B würde ich empfehlen – das Spiel hat ja schon Sidebar-Tabs, wir erweitern das einfach für Mobile/Tablet. Welche Option willst du?

ja nehmen wir Option B und frage wann laufen die Shorts aus?

Kurze Antwort zu Shorts: Nie – Shorts laufen bei dir nicht automatisch aus. Sie bleiben offen bis du manuell COVER drückst oder ein Stop-Loss greift. Die einzige laufende Kosten sind die 0.5% Leihgebühr pro Spieltag. Das ist realistisch so – in echten Märkten laufen Shorts auch nicht automatisch aus.

Option B – Tablet/Mobile Drawer
1. index.html – Bottom Nav Bar ergänzen, direkt vor </body>:
xml
<!-- MOBILE BOTTOM NAV -->
<nav class="mobile-nav" id="mobileNav">
  <button class="mnav-btn active" data-view="market">
    <span class="mnav-icon">📊</span>
    <span class="mnav-label">MARKET</span>
  </button>
  <button class="mnav-btn" data-view="sidebar">
    <span class="mnav-icon">💼</span>
    <span class="mnav-label">PORTFOLIO</span>
  </button>
  <button class="mnav-btn" data-view="history">
    <span class="mnav-icon">📋</span>
    <span class="mnav-label">HISTORY</span>
  </button>
</nav>
2. style.css – ans Ende anhängen:
css
/* ═══════════════════════════════════════════════════════
   TABLET / MOBILE RESPONSIVE
   ═══════════════════════════════════════════════════════ */

/* ── TABLET LANDSCAPE (≤ 1024px) ────────────── */
@media (max-width: 1024px) {
  .main {
    grid-template-columns: 1fr;
    height: auto;
  }

  .market-panel {
    border-right: none;
    border-bottom: 1px solid var(--border);
    overflow-y: visible;
  }

  .sidebar {
    display: none; /* auf Tablet durch mobile-nav gesteuert */
  }

  /* Header kompakter */
  header {
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 14px;
  }

  .header-right {
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    justify-content: space-between;
  }

  .hdr-box .val { font-size: 16px; }

  /* Tabelle: CHART Spalte ausblenden */
  .stock-table th:nth-child(6),
  .stock-table td:nth-child(6) { display: none; }

  /* Market Controls wrappen sauber */
  .market-controls { gap: 6px; }
  .stock-search    { width: 100%; }
  .sector-tabs     { width: 100%; }

  /* Modal volle Breite */
  .modal { width: 95vw; }
  .modal-body { grid-template-columns: 1fr; }
  .modal-trade { border-right: none; border-bottom: 1px solid var(--border); }
}

/* ── TABLET PORTRAIT + MOBILE (≤ 768px) ─────── */
@media (max-width: 768px) {
  /* Header noch kompakter */
  .logo-text h1  { font-size: 15px; letter-spacing: 1px; }
  .logo-text p   { display: none; }
  .logo-icon     { width: 36px; height: 36px; font-size: 11px; }

  .hdr-btns button { font-size: 10px; padding: 4px 8px; }
  .hdr-box         { padding: 5px 10px; }
  .hdr-box .val    { font-size: 14px; }
  .time-display    { display: none; }

  /* Main braucht Platz für Bottom Nav */
  .main { padding-bottom: 64px; }

  /* Tabelle: nur wichtigste Spalten */
  .stock-table th:nth-child(2),
  .stock-table td:nth-child(2) { display: none; } /* SECTOR */
  .stock-table th:nth-child(5),
  .stock-table td:nth-child(5) { display: none; } /* 24H */

  .stock-ticker { font-size: 13px; }
  .stock-price  { font-size: 12px; }

  /* Market Summary Bar scrollen */
  .market-summary {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  /* Top Movers scrollen */
  .top-movers {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  /* Heatmap weniger Spalten */
  .heatmap-grid {
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  }

  /* Modal */
  .modal        { width: 100vw; max-height: 92vh; border-radius: 12px 12px 0 0; }
  .modal-stats  { gap: 10px; }
  .mstat        { font-size: 11px; }
}

/* ── MOBILE BOTTOM NAV ───────────────────────── */
.mobile-nav {
  display: none; /* default: versteckt auf Desktop */
}

@media (max-width: 1024px) {
  .mobile-nav {
    display: flex;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 58px;
    background: var(--panel);
    border-top: 1px solid var(--border);
    z-index: 150;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.4);
  }

  .mnav-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background: transparent;
    border: none;
    color: var(--dim);
    cursor: pointer;
    transition: all .2s;
    padding: 6px 0;
  }

  .mnav-btn.active {
    color: var(--accent);
    background: rgba(0,212,255,0.06);
    border-top: 2px solid var(--accent);
  }

  .mnav-btn:hover:not(.active) { color: var(--text); }

  .mnav-icon  { font-size: 18px; line-height: 1; }
  .mnav-label {
    font-family: 'Rajdhani', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* News Bar über Bottom Nav */
  .news-bar { bottom: 58px; }
}

/* ── MOBILE VIEWS ────────────────────────────── */
@media (max-width: 1024px) {
  /* Market Panel als View */
  .market-panel {
    display: block;
  }

  /* Sidebar als Overlay-View */
  .sidebar-mobile-view {
    display: flex !important;
    position: fixed;
    inset: 0;
    bottom: 116px; /* über news-bar + mobile-nav */
    top: 110px;    /* unter header + ticker */
    background: var(--bg);
    z-index: 120;
    overflow-y: auto;
    flex-direction: column;
  }

  /* Versteckt wenn nicht aktiv */
  .view-hidden {
    display: none !important;
  }
}
3. script.js – Mobile Nav Logic vor BOOT einfügen:
javascript
// ═══════════════════════════════════════════════════════
// MOBILE NAV
// ═══════════════════════════════════════════════════════
function isMobile() {
  return window.innerWidth <= 1024;
}

function setMobileView(view) {
  if (!isMobile()) return;

  const market  = document.querySelector('.market-panel');
  const sidebar = document.querySelector('.sidebar');

  // Alle ausblenden
  market.classList.add('view-hidden');
  sidebar.classList.remove('sidebar-mobile-view');
  sidebar.classList.add('view-hidden');

  if (view === 'market') {
    market.classList.remove('view-hidden');
  } else {
    // Portfolio oder History → Sidebar zeigen, richtigen Tab aktivieren
    sidebar.classList.remove('view-hidden');
    sidebar.classList.add('sidebar-mobile-view');

    // Richtigen Sidebar-Tab aktivieren
    const tabMap = { sidebar: 'portfolio', history: 'history' };
    const targetTab = tabMap[view] || 'portfolio';
    document.querySelectorAll('.stab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === targetTab);
    });
    document.querySelectorAll('.stab-content').forEach(c => {
      c.style.display = c.id === 'stab-' + targetTab ? 'block' : 'none';
    });
  }

  // Nav Buttons updaten
  document.querySelectorAll('.mnav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
}

// Bottom Nav Click
document.getElementById('mobileNav').addEventListener('click', e => {
  const btn = e.target.closest('.mnav-btn');
  if (!btn) return;
  setMobileView(btn.dataset.view);
});

// Bei Resize Desktop-Layout wiederherstellen
window.addEventListener('resize', () => {
  if (!isMobile()) {
    document.querySelector('.market-panel').classList.remove('view-hidden');
    document.querySelector('.sidebar').classList.remove('view-hidden', 'sidebar-mobile-view');
  }
});
Ergebnis
Breakpoint	Verhalten
> 1024px	Normales Desktop-Layout, Bottom Nav unsichtbar
≤ 1024px	Bottom Nav sichtbar, Sidebar per Tap erreichbar
≤ 768px	Kompakter Header, weniger Tabellenspalten, scrollbare Bars
Kein einziges HTML-Element doppelt – alles per CSS/JS umgeschaltet. Soll ich danach mit v2.6 Features weitermachen?

Warte kannst du mir bitte erst eine comit etc und neue ReadME.md schreiben

Commit Message:
text
feat: v2.5 – market overview redesign, modal improvements, tablet/mobile responsive layout
Changelog v2.5:
text
## 🚀 v2.5 – Market Overview & Modal Upgrade + Mobile

### ✨ New Features

**Market Overview Redesign**
- Market Summary Bar: Sentiment (🐂/🐻/➡), Avg%, Gainers/Losers,
  TOP & FLOP Stock – alles clickbar
- Top Movers Panel: Top 3 Stocks nach absolutem 24H-Wert, clickbar
- Sortierbare Spalten: STOCK / PRICE / CHG / 24H / HELD
  mit Pfeil-Icon (↑↓)
- Live-Suchfeld: filtert nach Ticker + Name, funktioniert
  in Table- und Heatmap-View
- Heatmap-Modus: Toggle zwischen Tabelle und farbiger Grid-Ansicht.
  Farbintensität = Performance-Stärke. Gehaltene Aktien markiert.

**Modal Verbesserungen**
- Chart Zeitraum-Toggle: 15T / 30T / 60T Buttons
- Erweiterte Stats-Box: +ALL-TIME H/L, MKT CAP, SECTOR (10 Stats)
- Rival Quick-Link: Klick auf Rival-Ticker öffnet direkt dessen Modal
- Preis-Alarm: Zielpreis setzen → Toast + Flash wenn erreicht,
  jederzeit entfernbar

**Tablet & Mobile Layout (Option B)**
- Bottom Nav Bar bei ≤ 1024px: MARKET / PORTFOLIO / HISTORY
- Sidebar als Overlay-View auf Tablet/Mobile
- Breakpoint 768px: kompakter Header, weniger Tabellenspalten,
  scrollbare Summary & Movers Bar
- Modal auf Mobile: volle Breite, einspaltig, abgerundete obere Ecken
- News Bar verschiebt sich über Bottom Nav
- Desktop-Layout bleibt bei Resize vollständig wiederhergestellt

---

### 🐛 Bug Fixes

- drawChart() mit 4 Guards abgesichert (null ticker, fehlendes
  Canvas, cw ≤ 0, zu wenig Datenpunkte)
- chartRange als globale Variable deklariert (war undefined)
- insiderIntervalId global deklariert (war fälschlich in
  startTimers() lokal → Ghost Timer Bug)
- refreshModal() forEach korrekt geschlossen
- HTML market-panel Wrapper fehlte → Layout-Kollaps behoben
- Doppelte id="heatmapGrid" entfernt
README.md (komplett neu):
text
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