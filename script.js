// ═══════════════════════════════════════════════════════
// STOCKS DATA
// ═══════════════════════════════════════════════════════
const STOCKS = [
  { ticker:'BSTA',  name:'Burgershot',             sector:'FOOD',     rival:'UAAT',  basePrice:45.20,  vol:0.030 },
  { ticker:'UAAT',  name:'Up-An-Atom',              sector:'FOOD',     rival:'BSTA',  basePrice:38.10,  vol:0.030 },
  { ticker:'CLKB',  name:'Clucking Bell',           sector:'FOOD',     rival:'TBMB',  basePrice:52.80,  vol:0.025 },
  { ticker:'TBMB',  name:'TacoBomb',                sector:'FOOD',     rival:'CLKB',  basePrice:41.50,  vol:0.025 },
  { ticker:'PISS',  name:'Pisswasser Brewery',      sector:'FOOD',     rival:'LOG',   basePrice:34.50,  vol:0.028 },
  { ticker:'LOG',   name:'Logger Beer',             sector:'FOOD',     rival:'PISS',  basePrice:28.80,  vol:0.028 },
  { ticker:'BAN',   name:'CoolBeans Coffee',        sector:'FOOD',     rival:'BEN',   basePrice:15.60,  vol:0.020 },
  { ticker:'BEN',   name:'BeanMachine',             sector:'FOOD',     rival:'BAN',   basePrice:13.20,  vol:0.020 },
  { ticker:'GAS',   name:'GastroBand',              sector:'FOOD',     rival:'PISS',  basePrice:27.50,  vol:0.028 },
  { ticker:'KRP',   name:'Krapea',                  sector:'FOOD',     rival:'CLKB',  basePrice:48.90,  vol:0.030 },
  { ticker:'BPHM',  name:'Betta Pharmaceuticals',   sector:'PHARMA',   rival:'BILK',  basePrice:124.60, vol:0.040 },
  { ticker:'BILK',  name:'Bilkington Research',     sector:'PHARMA',   rival:'BPHM',  basePrice:89.30,  vol:0.040 },
  { ticker:'FLYUS', name:'FlyUS Airlines',          sector:'TRANSPORT',rival:'AEMU',  basePrice:78.90,  vol:0.035 },
  { ticker:'AEMU',  name:'AirEmu',                  sector:'TRANSPORT',rival:'FLYUS', basePrice:66.40,  vol:0.035 },
  { ticker:'HKJ',   name:'Hijak Motors',            sector:'TRANSPORT',rival:'FLYUS', basePrice:55.60,  vol:0.030 },
  { ticker:'GOP',   name:'GoPostal',                sector:'TRANSPORT',rival:'',      basePrice:19.30,  vol:0.030 },
  { ticker:'MAZE',  name:'Maze Bank',               sector:'FINANCE',  rival:'BOL',   basePrice:218.50, vol:0.020 },
  { ticker:'BOL',   name:'Bank of Liberty',         sector:'FINANCE',  rival:'MAZE',  basePrice:174.20, vol:0.020 },
  { ticker:'GRU',   name:'GruppeSechs Security',    sector:'FINANCE',  rival:'MER',   basePrice:36.80,  vol:0.030 },
  { ticker:'MER',   name:'Merryweather Security',   sector:'FINANCE',  rival:'GRU',   basePrice:62.50,  vol:0.030 },
  { ticker:'AUG',   name:'Augury Insurance',        sector:'FINANCE',  rival:'MOR',   basePrice:48.90,  vol:0.030 },
  { ticker:'MOR',   name:'MorsMutual Insurance',    sector:'FINANCE',  rival:'AUG',   basePrice:53.20,  vol:0.030 },
  { ticker:'DEB',   name:'Debonaire Cigarettes',    sector:'RETAIL',   rival:'REDW',  basePrice:63.70,  vol:0.030 },
  { ticker:'REDW',  name:'Redwood Cigarettes',      sector:'RETAIL',   rival:'DEB',   basePrice:71.20,  vol:0.030 },
  { ticker:'ARK',   name:'AnimalArk',               sector:'RETAIL',   rival:'MAX',   basePrice:22.40,  vol:0.025 },
  { ticker:'MAX',   name:'MaxRenda',                sector:'RETAIL',   rival:'ARK',   basePrice:24.10,  vol:0.025 },
  { ticker:'VAG',   name:'Vangelico Jewellers',     sector:'RETAIL',   rival:'',      basePrice:84.60,  vol:0.020 },
  { ticker:'GCD',   name:'Gold Coast Dev.',         sector:'ENERGY',   rival:'BOM',   basePrice:156.30, vol:0.045 },
  { ticker:'BOM',   name:'BobMulét Energy',         sector:'ENERGY',   rival:'GCD',   basePrice:18.70,  vol:0.040 },
  { ticker:'HAF',   name:'Hammerstein & Faust',     sector:'ENERGY',   rival:'',      basePrice:31.40,  vol:0.035 },
  { ticker:'RVSL',  name:'Rockford Vandals SL',     sector:'MEDIA',    rival:'WFM',   basePrice:22.10,  vol:0.060 },
  { ticker:'WFM',   name:'Worldwide FM',            sector:'MEDIA',    rival:'RVSL',  basePrice:9.80,   vol:0.050 },
  { ticker:'LFI',   name:'Lifeinvader',             sector:'MEDIA',    rival:'WFM',   basePrice:12.30,  vol:0.040 },
];

const NEWS_STATIC = [
  'Burgershot reports record sales — <span>BSTA</span> up 3.2%',
  'Maze Bank acquires regional lender — <span>MAZE</span> analyst target raised',
  'FlyUS pilot strike enters third week — <span>FLYUS</span> under pressure',
  'Betta Pharma FDA approval expected — <span>BPHM</span> surges',
  'Gold Coast secures downtown LS contract — <span>GCD</span> +6.1%',
  'TacoBomb opens 40 Blaine County locations — <span>TBMB</span>',
  'Logger Beer earnings disappoint — <span>LOG</span> falls to multi-month low',
  'Redwood faces class action lawsuit — <span>REDW</span> drops sharply',
  'Debonaire taps new Asian markets — <span>DEB</span> 52-week high',
  'Bank of Liberty under regulatory scrutiny — <span>BOL</span> CFO steps down',
  'AirEmu unveils ultra-low-cost fares — <span>AEMU</span> volume surges',
  'Rockford Vandals signs celebrity investor — <span>RVSL</span> rockets +12%',
  'AnimalArk opens Vinewood flagship — <span>ARK</span> up 2.1%',
  'Lifeinvader data-breach scandal — <span>LFI</span> -3.4%',
  'Merryweather awarded LSPD contract — <span>MER</span> +2.3%',
  'Vangelico launches new diamond collection — <span>VAG</span> +2.7%',
    // Diese Zeilen ans bestehende NEWS_STATIC Array anhängen:
  'GoPostal delivery delays spark customer outrage — <span>GOP</span> under pressure',
  'Maze Bank posts record profits — <span>MAZE</span> dividend raised',
  'BobMulét Energy faces environmental fine — <span>BOM</span> falls',
  'Hijak Motors recalls 40,000 vehicles — <span>HKJ</span> -4.1%',
  'Pisswasser wins \'Best Lager\' at San Andreas Beer Awards — <span>PISS</span> pops',
  'GruppeSechs wins Blaine County security contract — <span>GRU</span> +3.8%',
  'Lifeinvader monthly active users drop 12% — <span>LFI</span> sell-off',
  'Gold Coast Dev. breaks ground on Vinewood tower — <span>GCD</span> surges',
  'AugInsurance raises premiums amid crime wave — <span>AUG</span> +2.9%',
  'TacoBomb hit with food safety violations — <span>TBMB</span> -3.3%',
  'Worldwide FM loses flagship advertiser — <span>WFM</span> -2.1%',
  'Vangelico robbery triggers insurance payout dispute — <span>VAG</span> volatile',
  'BeanMachine expands to 200 new LS locations — <span>BEN</span> +4.5%',
  'Merryweather loses government security tender — <span>MER</span> drops',
  'Hammerstein & Faust discovers new offshore oil field — <span>HAF</span> +7.2%',
];

const NEWS_EVENTS = [
  // ── GLOBAL (sector: null = trifft zufällige Einzelaktie) ──
  { msg: 'CEO resigns amid scandal',                      impact: -0.15, sector: null },
  { msg: 'Record quarterly earnings reported',            impact:  0.14, sector: null },
  { msg: 'Government contract awarded',                   impact:  0.12, sector: null },
  { msg: 'Product recall announced',                      impact: -0.13, sector: null },
  { msg: 'Hostile takeover bid launched',                 impact:  0.18, sector: null },
  { msg: 'Regulatory fine imposed',                       impact: -0.11, sector: null },
  { msg: 'New market expansion confirmed',                impact:  0.10, sector: null },
  { msg: 'Major data breach disclosed',                   impact: -0.16, sector: null },
  { msg: 'Analyst upgrade to BUY rating',                 impact:  0.09, sector: null },
  { msg: 'Supply chain disruption reported',              impact: -0.08, sector: null },
  { msg: 'Class action lawsuit filed',                    impact: -0.12, sector: null },
  { msg: 'CFO steps down amid accounting irregularities', impact: -0.14, sector: null },
  { msg: 'Factory fire halts production',                 impact: -0.18, sector: null },
  { msg: 'Credit rating downgraded to junk',              impact: -0.20, sector: null },
  { msg: 'Earnings miss analyst estimates by 40%',        impact: -0.13, sector: null },
  { msg: 'Short seller report alleges inflated revenue',  impact: -0.19, sector: null },
  { msg: 'Blockbuster product launch exceeds forecasts',  impact:  0.16, sector: null },
  { msg: 'Strategic merger announced with industry giant',impact:  0.20, sector: null },
  { msg: 'Share buyback program of $500M announced',      impact:  0.11, sector: null },
  { msg: 'Hedge fund discloses 8% stake acquisition',     impact:  0.15, sector: null },

  // ── FOOD ──────────────────────────────────────────────────
  { msg: 'Health department shuts down multiple locations across LS', impact: -0.14, sector: 'FOOD' },
  { msg: 'San Andreas food safety bill raises compliance costs',       impact: -0.10, sector: 'FOOD' },
  { msg: 'Summer festival season drives record restaurant spending',   impact:  0.12, sector: 'FOOD' },
  { msg: 'Minimum wage hike squeezes fast food margins',               impact: -0.09, sector: 'FOOD' },
  { msg: 'Tourism boom in Los Santos boosts F&B revenues',             impact:  0.11, sector: 'FOOD' },

  // ── PHARMA ────────────────────────────────────────────────
  { msg: 'San Andreas legalises new class of pharmaceuticals',         impact:  0.18, sector: 'PHARMA' },
  { msg: 'Mass recall of over-the-counter drugs ordered by regulator', impact: -0.17, sector: 'PHARMA' },
  { msg: 'Clinical trial results exceed expectations across sector',   impact:  0.15, sector: 'PHARMA' },
  { msg: 'Patent cliff hits pharma — generics flood the market',       impact: -0.13, sector: 'PHARMA' },

  // ── FINANCE ───────────────────────────────────────────────
  { msg: 'LS Federal Reserve cuts interest rates by 0.5%',             impact:  0.13, sector: 'FINANCE' },
  { msg: 'LS Federal Reserve hikes rates — borrowing costs surge',     impact: -0.12, sector: 'FINANCE' },
  { msg: 'Banking stress test results: all LS institutions pass',      impact:  0.10, sector: 'FINANCE' },
  { msg: 'Fraud scandal rocks San Andreas financial sector',           impact: -0.16, sector: 'FINANCE' },
  { msg: 'New fintech regulations benefit established banks',          impact:  0.09, sector: 'FINANCE' },

  // ── TRANSPORT ─────────────────────────────────────────────
  { msg: 'Oil prices spike — airline and transport costs soar',        impact: -0.15, sector: 'TRANSPORT' },
  { msg: 'Oil prices crash — transport sector margins expand',         impact:  0.14, sector: 'TRANSPORT' },
  { msg: 'San Andreas airport expansion approved by city council',     impact:  0.12, sector: 'TRANSPORT' },
  { msg: 'Nationwide logistics strike paralyses delivery networks',    impact: -0.13, sector: 'TRANSPORT' },

  // ── ENERGY ────────────────────────────────────────────────
  { msg: 'San Andreas green energy bill passes — fossil fuels drop',   impact: -0.14, sector: 'ENERGY' },
  { msg: 'Cold snap drives record energy demand across the state',     impact:  0.16, sector: 'ENERGY' },
  { msg: 'New offshore drilling rights approved by SA government',     impact:  0.13, sector: 'ENERGY' },
  { msg: 'Environmental protesters block major LS pipeline',           impact: -0.11, sector: 'ENERGY' },

  // ── RETAIL ────────────────────────────────────────────────
  { msg: 'Consumer confidence index hits 5-year high in San Andreas',  impact:  0.12, sector: 'RETAIL' },
  { msg: 'Recession fears cause LS shoppers to cut discretionary spend',impact: -0.11, sector: 'RETAIL' },
  { msg: 'Holiday season sales shatter records across LS retail',      impact:  0.15, sector: 'RETAIL' },
  { msg: 'Online shopping surge threatens LS brick-and-mortar stores', impact: -0.10, sector: 'RETAIL' },

  // ── MEDIA ─────────────────────────────────────────────────
  { msg: 'LS ad spending surges as election season begins',            impact:  0.13, sector: 'MEDIA' },
  { msg: 'Streaming wars intensify — traditional media revenues fall', impact: -0.12, sector: 'MEDIA' },
  { msg: 'New content licensing law benefits LS media companies',      impact:  0.10, sector: 'MEDIA' },
  { msg: 'Social media blackout protest tanks digital ad revenue',     impact: -0.14, sector: 'MEDIA' },
];

// ═══════════════════════════════════════════════════════
// Insider Tipps
// ═══════════════════════════════════════════════════════

const INSIDER_INTERVAL_MS  = 90000;  // alle 90s ein Tip
const INSIDER_ACCURACY     = 0.70;   // 70% der Tips sind korrekt

// ═══════════════════════════════════════════════════════
// Short Selling
// ═══════════════════════════════════════════════════════

const SHORT_FEE_DAILY = 0.005; // 0.5% Leihgebühr pro Spieltag
const SHORT_MAX_RATIO = 2.0;   // Max 2× Cash als Short-Volumen


// ═══════════════════════════════════════════════════════
// Trade Logs Length
// ═══════════════════════════════════════════════════════

const TRADE_LOG_MAX = 50; // Maximale Einträge in der Trade History

// ═══════════════════════════════════════════════════════
// FEES AND DIVIDENS (DAYS)
// ═══════════════════════════════════════════════════════

// ── TRADING FEES ──────────────────────────────────────
const FEE_FLAT       = 5;       // unter $1.000
const FEE_STANDARD   = 0.003;   // 0.30%
const FEE_LARGE      = 0.0015;  // 0.15% ab $10.000

// ── DIVIDENDS ─────────────────────────────────────────
const DIVIDEND_RATES = {
  FINANCE:   0.010,  // 1.0% alle 7 Spieltage
  FOOD:      0.008,  // 0.8%
  ENERGY:    0.007,  // 0.7%
  RETAIL:    0.006,  // 0.6%
  PHARMA:    0.005,  // 0.5%
  TRANSPORT: 0.004,  // 0.4%
  MEDIA:     0.003,  // 0.3%
};
const DIVIDEND_INTERVAL_DAYS = 7;

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
const SAVE_PREFIX = 'lsx_v2_';
const DAYS   = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const NEWS_REACTION_TIME = 30; // seconds

let state = {};
let currentFilter = 'ALL';
let modalTicker   = null;
let modalMode     = 'buy';
let saveIntervalId;
let priceIntervalId;
let newsIntervalId;
let currentSlot   = null;
let beforeUnloadAdded = false;

// ── Pending news event (30s reaction window) ──
let pendingNewsEvent   = null; // { ticker, stockObj, eventObj, applyAt }
let pendingNewsTimer   = null;
let pendingCountdownId = null;

function defaultState() {
  const prices = {}, histories = {}, volumes = {};
  STOCKS.forEach(s => {
    const p = +(s.basePrice * (0.85 + Math.random() * 0.3)).toFixed(2);
    prices[s.ticker] = p;
    const hist = [];
    let hp = p;
    for (let i = 0; i < 30; i++) {
      hp = Math.max(1, hp * (1 + (Math.random()-.5) * s.vol * 2));
      hist.push(+hp.toFixed(2));
    }
    hist.push(p);
    histories[s.ticker] = hist;
    // FIX: persistent volume per stock
    volumes[s.ticker] = Math.floor(Math.random() * 900000 + 100000);
  });
  return {
    prices, histories, volumes,
    holdings:    {},
    shorts: {},  // ticker -> { qty, entryPrice, collateral }
    cash:        100000,
    watchlist:   [],
    limitOrders: [],
    stopLosses:  {},
    tradeLog:        [],   // { time, ticker, mode, qty, price, pnl, fee }
    netWorthHistory: [],   // [{ day, value }]
    gameDay: 0, gameHour: 8, gameMonth: 0, gameDayOfMonth: 1,
    savedAt: null,
    stats: {
    totalTrades:    0,
    realizedPnl:    0,
    bestTrade:      0,
    worstTrade:     0,
    startCash:      100000,
    totalFeesPaid:  0,       
    totalDividends: 0,       
    },
    lastDividendDay: 0,
    orderIdSeq: 1,
  };
}

function initState() {
  state = defaultState();
}

// ═══════════════════════════════════════════════════════
// FORMATTING
// ═══════════════════════════════════════════════════════
const fmt      = n => '$' + n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtShort = n => n >= 1e6 ? '$'+(n/1e6).toFixed(2)+'M' : n >= 1e3 ? '$'+(n/1e3).toFixed(1)+'K' : '$'+n.toFixed(0);

function getPrev(ticker)   { const h=state.histories[ticker]; return h.length<2?state.prices[ticker]:h[h.length-2]; }
function getChange(ticker) { const c=state.prices[ticker],p=getPrev(ticker); return ((c-p)/p)*100; }
function get24h(ticker)    { const h=state.histories[ticker],past=h.length>=12?h[h.length-12]:h[0]; return ((state.prices[ticker]-past)/past)*100; }

// Slightly randomize volume each tick so it feels alive, but stays realistic
function tickVolume(ticker) {
  const v = state.volumes[ticker];
  const delta = Math.floor((Math.random() - 0.5) * v * 0.08);
  state.volumes[ticker] = Math.max(10000, v + delta);
}

// ═══════════════════════════════════════════════════════
// PRICE SIMULATION
// ═══════════════════════════════════════════════════════
function simulateTick(n = 1) {
  for (let t = 0; t < n; t++) {
    const updated = new Set();
    STOCKS.forEach(s => {
      if (updated.has(s.ticker)) return;
      const old = state.prices[s.ticker];
      // Wochentag-Effekte
      const dayMod =
        state.gameDay === 0 ? 1.35 :   // MON – hohe Volatilität
        state.gameDay === 4 ? 0.80 :   // FRI – leichter Sell-Off Bias
        state.gameDay === 5 ? 0.60 :   // SAT – ruhiger Markt
        state.gameDay === 6 ? 0.60 :   // SUN – ruhiger Markt
        1.0;                            // DI–DO normal
      const drift = (Math.random() - 0.495) * s.vol * dayMod;
      const np = Math.max(1, +(old * (1 + drift)).toFixed(2));
      state.prices[s.ticker] = np;
      state.histories[s.ticker].push(np);
      if (state.histories[s.ticker].length > 60) state.histories[s.ticker].shift();
      tickVolume(s.ticker);

      // FIX: Rivals verarbeitet in separatem Pass → kein Überschreiben
      if (s.rival && state.prices[s.rival] !== undefined) {
        updated.add(s.rival);
        const ro = state.prices[s.rival];
        const rd = -drift * (0.4 + Math.random() * 0.3);
        const rn = Math.max(1, +(ro * (1 + rd)).toFixed(2));
        state.prices[s.rival] = rn;
        state.histories[s.rival].push(rn);
        if (state.histories[s.rival].length > 60) state.histories[s.rival].shift();
        tickVolume(s.rival);
      }
      updated.add(s.ticker);
    });

    // Den bestehenden if (state.gameHour >= 24) Block ersetzen:
    if (state.gameHour >= 24) {
    state.gameHour = 6;
    state.gameDay  = (state.gameDay + 1) % 7;
    state.gameDayOfMonth++;
    if (state.gameDayOfMonth > 28) {
        state.gameDayOfMonth = 1;
        state.gameMonth = (state.gameMonth + 1) % 12;
    }
    checkShortFees(); // Leihgebühr einmal täglich
    }
  }

  // Nach state.gameHour/gameDay/gameMonth Updates, vor checkLimitOrders():
    const _nwv = state.cash + Object.entries(state.holdings)
    .reduce((a,[t,h]) => a + h.qty * state.prices[t], 0);
    state.netWorthHistory.push(_nwv);
    if (state.netWorthHistory.length > 120) state.netWorthHistory.shift();

  checkLimitOrders();
  checkStopLosses();
  checkDividends();        
  checkShortStopLosses();  
  renderAll();
}

function compressTime() {
  if (!state.savedAt) return;
  const elapsed = Date.now() - state.savedAt;
  const missedTicks = Math.min(Math.floor(elapsed / 4000), 200);
  if (missedTicks > 0) {
    simulateTick(missedTicks);
    showToast(`⏩ Simulated ${missedTicks} missed ticks`);
  }
}

// ═══════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════
let prevPrices = {};

function renderAll() {
  renderTable();
  renderTicker();
  renderWatchlist();
  renderPortfolioSidebar();
  renderShortsSidebar();
  renderOrders();
  renderScoreboard();
  renderTradeHistory();      
  renderPortfolioChart();    
  updateHeader();
  updateGameTime();
  if (modalTicker) refreshModal();
}

function renderTable() {
  const body = document.getElementById('stockTableBody');
  const filtered = currentFilter === 'ALL' ? STOCKS : STOCKS.filter(s => s.sector === currentFilter);
  const frag = document.createDocumentFragment();

  // Highlight pending news ticker
  const pendingTicker = pendingNewsEvent ? pendingNewsEvent.ticker : null;

  filtered.forEach(s => {
    const chg   = getChange(s.ticker);
    const chg24 = get24h(s.ticker);
    const price = state.prices[s.ticker];
    const heldQty = state.holdings[s.ticker]?.qty || 0;
    const watched = state.watchlist.includes(s.ticker);

    const tr = document.createElement('tr');
    tr.className = 'stock-row' + (watched ? ' watched' : '') + (s.ticker === pendingTicker ? ' news-pending' : '');
    tr.dataset.ticker = s.ticker;

    if (prevPrices[s.ticker] !== undefined) {
      if (price > prevPrices[s.ticker])      tr.classList.add('flash-up');
      else if (price < prevPrices[s.ticker]) tr.classList.add('flash-down');
    }
    prevPrices[s.ticker] = price;

    tr.innerHTML = `
      <td>
        <span class="stock-ticker">${s.ticker}</span>
        ${heldQty > 0 ? `<span class="owned-badge">${heldQty}</span>` : ''}
        ${s.ticker === pendingTicker ? `<span class="news-badge">📰 NEWS</span>` : ''}
        <span class="stock-name">${s.name}</span>
      </td>
      <td><span class="sector sector-${s.sector.toLowerCase()}">${s.sector}</span></td>
      <td class="stock-price">${fmt(price)}</td>
      <td class="stock-change ${chg>0?'up':chg<0?'down':'neutral'}">${chg>0?'+':''}${chg.toFixed(2)}%</td>
      <td class="stock-change ${chg24>0?'up':'down'}">${chg24>0?'+':''}${chg24.toFixed(2)}%</td>
      <td>${makeMiniChart(s.ticker)}</td>
      <td>${heldQty > 0 ? fmtShort(heldQty * price) : '<span style="color:var(--muted)">–</span>'}</td>`;

    frag.appendChild(tr);
  });

  body.innerHTML = '';
  body.appendChild(frag);
}

function makeMiniChart(ticker) {
  const h = state.histories[ticker].slice(-10);
  const min = Math.min(...h), max = Math.max(...h), range = max - min || 1;
  const last = h[h.length - 1];
  const bars = h.map(v => {
    const pct = ((v - min) / range * 22 + 4).toFixed(0);
    // FIX: grün wenn der Balken ÜBER dem letzten Preis liegt (steigend), rot wenn darunter
    const col = v >= last ? 'var(--green)' : 'var(--red)';
    return `<div class="mini-bar" style="height:${pct}px;background:${col}"></div>`;
  }).join('');
  return `<div class="mini-chart">${bars}</div>`;
}

function renderTicker() {
  const items = STOCKS.map(s => {
    const chg = get24h(s.ticker);
    return `<span class="ticker-item"><strong>${s.ticker}</strong> <span class="${chg>=0?'up':'down'}">${fmt(state.prices[s.ticker])} ${chg>=0?'▲':'▼'}${Math.abs(chg).toFixed(2)}%</span></span>`;
  });
  document.getElementById('tickerTrack').innerHTML = [...items,...items].join('');
}

function renderWatchlist() {
  const el = document.getElementById('watchlistEl');
  if (!state.watchlist.length) { el.innerHTML = '<div class="watch-empty">No stocks watched.<br>Click a stock → Add to watchlist.</div>'; return; }
  el.innerHTML = state.watchlist.map(ticker => {
    const chg = get24h(ticker); const price = state.prices[ticker];
    return `<div class="watch-item" data-ticker="${ticker}">
      <div><span class="watch-ticker">${ticker}</span><span class="watch-chg ${chg>=0?'up':'down'}" style="margin-left:8px">${chg>=0?'+':''}${chg.toFixed(1)}%</span></div>
      <span class="watch-price ${chg>=0?'up':'down'}">${fmt(price)}</span>
    </div>`;
  }).join('');
}

function renderPortfolioSidebar() {
  const el = document.getElementById('portfolioEl');
  const entries = Object.entries(state.holdings);
  if (!entries.length) { el.innerHTML = '<div class="watch-empty">No open positions.</div>'; return; }
  el.innerHTML = entries.map(([ticker, h]) => {
    const cur    = state.prices[ticker];
    const val    = cur * h.qty;
    const pnl    = (cur - h.avgCost) * h.qty;
    const pnlPct = (cur - h.avgCost) / h.avgCost * 100;
    const cls    = pnl >= 0 ? 'up' : 'down';
    return `
      <div class="portfolio-row" data-ticker="${ticker}">
        <div class="portfolio-row-left">
          <div class="portfolio-row-tick">${ticker}</div>
          <div class="portfolio-row-qty">${h.qty} @ ${fmt(h.avgCost)}</div>
        </div>
        <div class="portfolio-row-right">
          <div class="portfolio-row-val">${fmt(val)}</div>
          <div class="portfolio-row-pnl ${cls}">
            ${pnl>=0?'+':''}${fmt(pnl)} (${pnlPct.toFixed(1)}%)
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderShortsSidebar() {
  const el      = document.getElementById('shortsEl');
  const entries = Object.entries(state.shorts || {});
  if (!entries.length) {
    el.innerHTML = '<div class="watch-empty">No open shorts.</div>';
    return;
  }
  el.innerHTML = entries.map(([ticker, sh]) => {
    const cur    = state.prices[ticker];
    const pnl    = (sh.entryPrice - cur) * sh.qty;
    const pnlPct = ((sh.entryPrice - cur) / sh.entryPrice) * 100;
    const cls    = pnl >= 0 ? 'up' : 'down';
    return `
      <div class="portfolio-row" data-ticker="${ticker}">
        <div class="portfolio-row-left">
          <div class="portfolio-row-tick">
            <span style="color:var(--red);font-size:10px;margin-right:4px;">▼</span>${ticker}
          </div>
          <div class="portfolio-row-qty">${sh.qty} @ ${fmt(sh.entryPrice)}</div>
        </div>
        <div class="portfolio-row-right">
          <div class="portfolio-row-val">${fmt(cur * sh.qty)}</div>
          <div class="portfolio-row-pnl ${cls}">
            ${pnl>=0?'+':''}${fmt(pnl)} (${pnlPct.toFixed(1)}%)
          </div>
        </div>
      </div>`;
  }).join('');
}

document.getElementById('portfolioEl').addEventListener('click', e => {
  const row = e.target.closest('.portfolio-row');
  if (row) openModal(row.dataset.ticker);
});

function renderOrders() {
  const el = document.getElementById('ordersEl');
  if (!state.limitOrders.length) { el.innerHTML = '<div class="watch-empty">No active orders.</div>'; return; }
  el.innerHTML = state.limitOrders.map(o =>
    `<div class="order-item">
      <div>
        <span class="order-ticker">${o.ticker}</span>
        <span class="order-meta" style="margin-left:8px">${o.type==='buy-below'?'BUY ≤':'SELL ≥'} ${fmt(o.price)} × ${o.qty}</span>
      </div>
      <button class="order-cancel" data-order-id="${o.id}" title="Cancel">✕</button>
    </div>`
  ).join('');
}

function renderScoreboard() {
  const totalVal   = Object.entries(state.holdings).reduce((a,[t,h]) => a + h.qty*state.prices[t], 0);
  const netWorth   = state.cash + totalVal;
  const totalReturn = ((netWorth - state.stats.startCash) / state.stats.startCash * 100);
  const el = document.getElementById('scoreGrid');
  const items = [
    ['NET WORTH',    fmt(netWorth)],
    ['RETURN',       (totalReturn>=0?'+':'')+totalReturn.toFixed(1)+'%'],
    ['TRADES',       state.stats.totalTrades],
    ['REALIZED P&L', fmt(state.stats.realizedPnl)],
    ['DIVIDENDS',    fmt(state.stats.totalDividends)],  
    ['FEES PAID',    fmt(state.stats.totalFeesPaid)],   
    ['BEST TRADE',   fmt(state.stats.bestTrade)],
    ['WORST TRADE',  fmt(Math.abs(state.stats.worstTrade))],
  ];
  el.innerHTML = items.map(([lbl,val]) => `
    <div class="score-box">
      <div class="score-lbl">${lbl}</div>
      <div class="score-val" style="color:${lbl==='RETURN'?(totalReturn>=0?'var(--green)':'var(--red)'):'var(--text)'}">${val}</div>
    </div>`).join('');
}

function renderTradeHistory() {
  const el = document.getElementById('tradeHistoryEl');
  if (!state.tradeLog?.length) {
    el.innerHTML = '<div class="watch-empty">No trades yet.</div>';
    return;
  }
  el.innerHTML = state.tradeLog.map(t => {
    const isBuy  = t.mode === 'BUY';
    const pnlHtml = t.pnl !== null
      ? `<div class="th-pnl ${t.pnl >= 0 ? 'up' : 'down'}">${t.pnl >= 0 ? '+' : ''}${fmt(t.pnl)}</div>`
      : '';
    return `
      <div class="trade-hist-row">
        <div class="th-left">
          <span class="th-mode ${isBuy ? 'buy' : 'sell'}">${t.mode}</span>
          <span class="th-ticker">${t.ticker}</span>
          <span class="th-meta">${t.qty} @ ${fmt(t.price)}</span>
        </div>
        <div class="th-right">
          ${pnlHtml}
          <div class="th-fee">-${fmt(t.fee)}</div>
          <div class="th-time">${t.time}</div>
        </div>
      </div>`;
  }).join('');
}

function renderPortfolioChart() {
  const canvas = document.getElementById('portfolioChart');
  if (!canvas || !state.netWorthHistory?.length) return;
  const ctx  = canvas.getContext('2d');
  const data = state.netWorthHistory.slice(-60);
  const cw   = canvas.parentElement.clientWidth - 16;
  const h    = 80;
  canvas.width  = cw;
  canvas.height = h;
  const min   = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pad   = 4;
  const isUp  = data[data.length - 1] >= data[0];
  const col   = isUp ? 'rgba(0,255,136,0.9)' : 'rgba(255,51,85,0.9)';
  const colFill = isUp ? 'rgba(0,255,136,0.12)' : 'rgba(255,51,85,0.12)';
  ctx.clearRect(0, 0, cw, h);
  const coords = data.map((v, i) => ({
    x: (i / (data.length - 1)) * (cw - pad * 2) + pad,
    y: h - pad - ((v - min) / range) * (h - pad * 2)
  }));
  // Fill
  ctx.beginPath();
  coords.forEach((c, i) => i === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y));
  ctx.lineTo(coords[coords.length-1].x, h - pad);
  ctx.lineTo(pad, h - pad);
  ctx.closePath();
  ctx.fillStyle = colFill;
  ctx.fill();
  // Line
  ctx.beginPath();
  coords.forEach((c, i) => i === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y));
  ctx.strokeStyle = col;
  ctx.lineWidth   = 2;
  ctx.stroke();
  // Dot
  const lx = coords[coords.length-1].x, ly = coords[coords.length-1].y;
  ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2);
  ctx.fillStyle = col; ctx.fill();
}


function updateHeader() {
  const totalVal = Object.entries(state.holdings).reduce((a,[t,h]) => a + h.qty*state.prices[t], 0);
  document.getElementById('portfolioVal').textContent = fmt(totalVal);
  document.getElementById('cashDisplay').textContent  = fmt(state.cash);
}

function updateGameTime() {
  document.getElementById('gameTime').textContent = state.gameHour.toString().padStart(2,'0') + ':00';
  document.getElementById('gameDate').textContent = DAYS[state.gameDay] + ', ' + MONTHS[state.gameMonth] + ' ' + state.gameDayOfMonth;
}

// ═══════════════════════════════════════════════════════
// STOCK MODAL
// ═══════════════════════════════════════════════════════
function openModal(ticker) {
  modalTicker = ticker;
  modalMode   = 'buy';
  refreshModal();
  document.getElementById('mTabBuy').className  = 'trade-tab2 buy-active';
  document.getElementById('mTabSell').className = 'trade-tab2';
  document.getElementById('btnModalTrade').className   = 'btn-modal-trade btn-modal-buy';
  document.getElementById('btnModalTrade').textContent = 'BUY SHARES';
  document.getElementById('mQtyInput').value = 1;
  updateMTotal();
  document.getElementById('stockModal').classList.add('open');

  const sl = state.stopLosses[ticker];
  document.getElementById('stopLossInput').value = sl || '';
  document.getElementById('stopLossStatus').textContent = sl ? `Active: auto-sell at −${sl}% loss` : '';
  updateWatchBtn();
}

function closeModal() {
  document.getElementById('stockModal').classList.remove('open');
}

function refreshModal() {
  if (!modalTicker) return;
  const s     = STOCKS.find(x => x.ticker === modalTicker);
  const price = state.prices[modalTicker];
  const chg   = getChange(modalTicker);
  const chg24 = get24h(modalTicker);
  const h     = state.histories[modalTicker];
  const hi    = Math.max(...h.slice(-12));
  const lo    = Math.min(...h.slice(-12));
  const held  = state.holdings[modalTicker];

  const vol = (state.volumes[modalTicker] || 0).toLocaleString('en-US');

  document.getElementById('modalTicker').textContent = s.ticker;
  document.getElementById('modalName').textContent   = s.name + ' · ' + s.sector;

  const priceEl = document.getElementById('modalPrice');
  priceEl.textContent = fmt(price);
  priceEl.className   = 'modal-price ' + (chg>=0?'up':'down');

  const chgEl = document.getElementById('modalChange');
  chgEl.textContent = (chg24>=0?'+':'')+chg24.toFixed(2)+'% (24H)';
  chgEl.className   = 'modal-change ' + (chg24>=0?'up':'down');

  document.getElementById('modalStats').innerHTML = `
    <div class="mstat">HIGH <span>${fmt(hi)}</span></div>
    <div class="mstat">LOW  <span>${fmt(lo)}</span></div>
    <div class="mstat">VOL  <span>${vol}</span></div>
    <div class="mstat">RIVAL<span class="rival-val">${s.rival||'—'}</span></div>
    ${held ? `<div class="mstat">HELD <span>${held.qty} @ ${fmt(held.avgCost)}</span></div>` : ''}
    ${held ? `<div class="mstat">P&L  <span class="${(price-held.avgCost)>=0?'up':'down'}">${((price-held.avgCost)/held.avgCost*100).toFixed(1)}%</span></div>` : ''}
  `;

  drawChart('modalChart', modalTicker, 200, 120);
  updateMTotal();

  // ── Short-Status anzeigen ──────────────────────── NEU
  const shortStatus = document.getElementById('shortStatus');
  if (shortStatus) {
    const sh = state.shorts?.[modalTicker];
    if (sh) {
      const pnl    = (sh.entryPrice - price) * sh.qty;
      const pnlPct = ((sh.entryPrice - price) / sh.entryPrice * 100).toFixed(1);
      shortStatus.innerHTML = `📉 Short: ${sh.qty} @ ${fmt(sh.entryPrice)} · P&L: <span class="${pnl>=0?'up':'down'}">${pnl>=0?'+':''}${fmt(pnl)} (${pnlPct}%)</span>`;
    } else {
      shortStatus.textContent = '';
    }
  }
}

function drawChart(canvasId, ticker, w, h) {
  const canvas = document.getElementById(canvasId);
  const ctx    = canvas.getContext('2d');
  const cw     = canvas.parentElement.clientWidth - (canvasId==='modalChart'?48:40);
  canvas.width = cw; canvas.height = h;
  const data  = state.histories[ticker].slice(-30);
  const min   = Math.min(...data), max = Math.max(...data), range = max-min||1;
  const pad   = 6;
  const isUp  = data[data.length-1] >= data[0];
  ctx.clearRect(0,0,cw,h);
  const grad = ctx.createLinearGradient(0,0,0,h);
  grad.addColorStop(0, isUp?'rgba(0,255,136,0.22)':'rgba(255,51,85,0.22)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  const coords = data.map((v,i)=>({
    x:(i/(data.length-1))*(cw-pad*2)+pad,
    y:h-pad-((v-min)/range)*(h-pad*2)
  }));
  ctx.beginPath();
  coords.forEach((c,i)=>i===0?ctx.moveTo(c.x,c.y):ctx.lineTo(c.x,c.y));
  const lx=coords[coords.length-1].x, ly=coords[coords.length-1].y;
  ctx.lineTo(lx,h-pad); ctx.lineTo(pad,h-pad); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();
  ctx.beginPath();
  coords.forEach((c,i)=>i===0?ctx.moveTo(c.x,c.y):ctx.lineTo(c.x,c.y));
  ctx.strokeStyle=isUp?'rgba(0,255,136,0.9)':'rgba(255,51,85,0.9)';
  ctx.lineWidth=2; ctx.stroke();
  ctx.beginPath(); ctx.arc(lx,ly,4,0,Math.PI*2);
  ctx.fillStyle=isUp?'#00ff88':'#ff3355'; ctx.fill();
}

function updateMTotal() {
  if (!modalTicker) return;
  const qty = parseInt(document.getElementById('mQtyInput').value)||0;
  document.getElementById('mTotal').textContent = fmt(qty * state.prices[modalTicker]);
}

function updateWatchBtn() {
  const btn = document.getElementById('btnWatch');
  if (state.watchlist.includes(modalTicker)) {
    btn.textContent = '★ REMOVE FROM WATCHLIST';
    btn.classList.add('watching');
  } else {
    btn.textContent = '☆ ADD TO WATCHLIST';
    btn.classList.remove('watching');
  }
}

// ═══════════════════════════════════════════════════════
// FEES
// ═══════════════════════════════════════════════════════

function calcFee(total) {
  if (total < 1000)  return FEE_FLAT;
  if (total < 10000) return +(total * FEE_STANDARD).toFixed(2);
  return +(total * FEE_LARGE).toFixed(2);
}


// ═══════════════════════════════════════════════════════
// TRADING
// ═══════════════════════════════════════════════════════
function executeTrade(ticker, mode, qty) {
  const price = state.prices[ticker];
  const total = qty * price;
  const fee   = calcFee(total);

  if (mode === 'buy') {
    if (total + fee > state.cash) {
      showToast(`Insufficient funds! Need ${fmt(total + fee)} (incl. ${fmt(fee)} fee)`, true);
      return false;
    }
    state.cash -= (total + fee);
    if (!state.holdings[ticker]) state.holdings[ticker] = { qty:0, avgCost:0 };
    const h  = state.holdings[ticker];
    const nt = h.qty * h.avgCost + total;
    h.qty += qty;
    h.avgCost = nt / h.qty;
    state.stats.totalFeesPaid += fee;
    state.stats.totalTrades++;
    state.tradeLog.unshift({  time:   `${DAYS[state.gameDay]} ${state.gameHour.toString().padStart(2,'0')}:00`,  ticker, mode: 'BUY', qty, price, pnl: null, fee});
    if (state.tradeLog.length > TRADE_LOG_MAX) state.tradeLog.pop();
    showToast(`✓ Bought ${qty} × ${ticker} @ ${fmt(price)} · Fee: ${fmt(fee)}`);

  } else {
    if (!state.holdings[ticker] || state.holdings[ticker].qty < qty) {
      showToast('Not enough shares!', true); return false;
    }
    const avg = state.holdings[ticker].avgCost;
    const pnl = (price - avg) * qty - fee;
    state.cash += (total - fee);
    state.holdings[ticker].qty -= qty;
    if (state.holdings[ticker].qty === 0) delete state.holdings[ticker];
    state.stats.realizedPnl  += pnl;
    state.stats.totalFeesPaid += fee;
    if (pnl > state.stats.bestTrade)  state.stats.bestTrade  = pnl;
    if (pnl < state.stats.worstTrade) state.stats.worstTrade = pnl;
    state.stats.totalTrades++;
    state.tradeLog.unshift({  time:   `${DAYS[state.gameDay]} ${state.gameHour.toString().padStart(2,'0')}:00`,  ticker, mode: 'SELL', qty, price, pnl, fee});
if (state.tradeLog.length > TRADE_LOG_MAX) state.tradeLog.pop();
    showToast(`✓ Sold ${qty} × ${ticker} @ ${fmt(price)} · P&L: ${pnl>=0?'+':''}${fmt(pnl)} · Fee: ${fmt(fee)}`);
  }
  renderAll();
  return true;
}

// ═══════════════════════════════════════════════════════
// SHORT SELLING
// ═══════════════════════════════════════════════════════
function openShort(ticker, qty) {
  const price      = state.prices[ticker];
  const total      = qty * price;
  const fee        = calcFee(total);
  const collateral = total; // 1:1 Sicherheit einfrieren

  if (collateral + fee > state.cash) {
    showToast(`Insufficient funds for collateral! Need ${fmt(collateral + fee)}`, true);
    return false;
  }

  const maxShort = state.cash * SHORT_MAX_RATIO;
  const currentShortVal = Object.entries(state.shorts)
    .reduce((a, [t, s]) => a + s.qty * state.prices[t], 0);
  if (currentShortVal + total > maxShort) {
    showToast(`Max short exposure reached (${fmt(maxShort)})`, true);
    return false;
  }

  state.cash -= (collateral + fee);
  state.stats.totalFeesPaid += fee;

  if (!state.shorts[ticker]) {
    state.shorts[ticker] = { qty: 0, entryPrice: 0, collateral: 0 };
  }
  const sh    = state.shorts[ticker];
  const nt    = sh.qty * sh.entryPrice + total;
  sh.qty      += qty;
  sh.entryPrice = nt / sh.qty;
  sh.collateral += collateral;

  state.stats.totalTrades++;
  state.tradeLog.unshift({
    time: `${DAYS[state.gameDay]} ${state.gameHour.toString().padStart(2,'0')}:00`,
    ticker, mode: 'SHORT', qty, price, pnl: null, fee
  });
  if (state.tradeLog.length > TRADE_LOG_MAX) state.tradeLog.pop();

  showToast(`📉 Shorted ${qty} × ${ticker} @ ${fmt(price)} · Fee: ${fmt(fee)}`);
  renderAll();
  return true;
}

function closeShort(ticker, qty) {
  const sh = state.shorts[ticker];
  if (!sh || sh.qty < qty) { showToast('No short position to close!', true); return false; }

  const price      = state.prices[ticker];
  const total      = qty * price;
  const fee        = calcFee(total);
  // Gewinn = (Entry - Current) × qty
  const pnl        = (sh.entryPrice - price) * qty - fee;
  const collateral = (sh.collateral / sh.qty) * qty;

  // Collateral zurück + P&L
  state.cash += collateral + pnl;
  state.stats.realizedPnl   += pnl;
  state.stats.totalFeesPaid += fee;
  if (pnl > state.stats.bestTrade)  state.stats.bestTrade  = pnl;
  if (pnl < state.stats.worstTrade) state.stats.worstTrade = pnl;

  sh.qty        -= qty;
  sh.collateral -= collateral;
  if (sh.qty <= 0) delete state.shorts[ticker];

  state.stats.totalTrades++;
  state.tradeLog.unshift({
    time: `${DAYS[state.gameDay]} ${state.gameHour.toString().padStart(2,'0')}:00`,
    ticker, mode: 'COVER', qty, price, pnl, fee
  });
  if (state.tradeLog.length > TRADE_LOG_MAX) state.tradeLog.pop();

  showToast(`✓ Covered ${qty} × ${ticker} @ ${fmt(price)} · P&L: ${pnl>=0?'+':''}${fmt(pnl)}`);
  renderAll();
  return true;
}

// Tägliche Short-Leihgebühr
function checkShortFees() {
  Object.entries(state.shorts).forEach(([ticker, sh]) => {
    const dailyFee = +(state.prices[ticker] * sh.qty * SHORT_FEE_DAILY).toFixed(2);
    state.cash -= dailyFee;
    state.stats.totalFeesPaid += dailyFee;
  });
}

// Short Stop-Loss – wenn Kurs über Entry + X% steigt
function checkShortStopLosses() {
  Object.entries(state.shorts).forEach(([ticker, sh]) => {
    const pct = state.stopLosses['short_' + ticker];
    if (!pct) return;
    const price    = state.prices[ticker];
    const lossP    = ((price - sh.entryPrice) / sh.entryPrice) * 100;
    if (lossP >= pct) {
      const qty = sh.qty;
      delete state.stopLosses['short_' + ticker];
      closeShort(ticker, qty);
      showToast(`🛡 Short stop-loss triggered: covered ${qty} × ${ticker}`, true);
    }
  });
}

// ═══════════════════════════════════════════════════════
// LIMIT ORDERS & STOP-LOSS
// ═══════════════════════════════════════════════════════
function checkLimitOrders() {
  const fired = [];
  state.limitOrders.forEach(o => {
    const price = state.prices[o.ticker];
    if (o.type === 'buy-below'  && price <= o.price) fired.push({ ...o, mode:'buy' });
    if (o.type === 'sell-above' && price >= o.price) fired.push({ ...o, mode:'sell' });
  });
  fired.forEach(o => {
    state.limitOrders = state.limitOrders.filter(x => x.id !== o.id);
    executeTrade(o.ticker, o.mode, o.qty);
    showNewsEvent(o.ticker, `Limit order triggered: ${o.mode.toUpperCase()} ${o.qty} × ${o.ticker} @ ${fmt(state.prices[o.ticker])}`, o.mode==='buy'?0.01:-0.01, false);
  });
}

function checkStopLosses() {
  Object.entries(state.stopLosses).forEach(([ticker, pct]) => {
    const h = state.holdings[ticker];
    if (!h) return;
    const price   = state.prices[ticker];
    const lossPct = ((price - h.avgCost) / h.avgCost) * 100;
    if (lossPct <= -pct) {
      const qty = h.qty;
      delete state.stopLosses[ticker];
      executeTrade(ticker, 'sell', qty);
      showNewsEvent(ticker, `Stop-loss triggered: sold ${qty} × ${ticker} at −${Math.abs(lossPct).toFixed(1)}%`, -0.02, false);
    }
  });
}

function checkDividends() {
  // Nur alle DIVIDEND_INTERVAL_DAYS Spieltage auszahlen
  const daysSinceLast = state.gameDayOfMonth - (state.lastDividendDay || 0);
  if (daysSinceLast < DIVIDEND_INTERVAL_DAYS) return;

  let totalPayout = 0;
  const payouts   = [];

  Object.entries(state.holdings).forEach(([ticker, h]) => {
    const stock = STOCKS.find(s => s.ticker === ticker);
    if (!stock) return;
    const rate    = DIVIDEND_RATES[stock.sector] || 0;
    if (rate === 0) return;
    const payout  = +(state.prices[ticker] * h.qty * rate).toFixed(2);
    if (payout <= 0) return;
    state.cash += payout;
    totalPayout += payout;
    payouts.push(`${ticker} +${fmt(payout)}`);
    state.stats.totalDividends += payout;
  });

  if (totalPayout > 0) {
    state.lastDividendDay = state.gameDayOfMonth;
    showNewsEvent('💰', `Dividend payout: ${fmt(totalPayout)}`, 0, false);
    showToast(`💰 Dividends received: ${fmt(totalPayout)}\n${payouts.join(' · ')}`);
  }
}

// ═══════════════════════════════════════════════════════
// NEWS EVENTS – 30s REACTION WINDOW
// ═══════════════════════════════════════════════════════

let newsEventTimerToast = null;

/**
 * Kündigt ein News-Event an. Der Kurseffekt wird erst nach NEWS_REACTION_TIME
 * Sekunden angewendet. Der Spieler sieht Ticker + Richtung und kann vorher handeln.
 */
function fireNewsEvent() {
  if (pendingNewsEvent) return;

  const ev = NEWS_EVENTS[Math.floor(Math.random() * NEWS_EVENTS.length)];

  let s;
  if (ev.sector) {
    // Sektor-Event: zufällige Aktie aus dem betroffenen Sektor
    const sectorStocks = STOCKS.filter(x => x.sector === ev.sector);
    s = sectorStocks[Math.floor(Math.random() * sectorStocks.length)];
  } else {
    // Global: komplett zufällige Aktie
    s = STOCKS[Math.floor(Math.random() * STOCKS.length)];
  }

  pendingNewsEvent = { ticker: s.ticker, stockObj: s, eventObj: ev };

  // Sektor-Badge im Toast anzeigen
  const label = ev.sector
    ? `[${ev.sector}] ${s.name}: ${ev.msg}`
    : `${s.name}: ${ev.msg}`;

  showNewsToast(s.ticker, label, ev.impact, ev.sector);

  let remaining = NEWS_REACTION_TIME;
  pendingCountdownId = setInterval(() => {
    remaining--;
    updateNewsCountdown(remaining);
    if (remaining <= 0) {
      clearInterval(pendingCountdownId);
      pendingCountdownId = null;
    }
  }, 1000);

  pendingNewsTimer = setTimeout(applyPendingNews, NEWS_REACTION_TIME * 1000);
  renderTable();
}

function applyPendingNews() {
  if (!pendingNewsEvent) return;
  const { ticker, eventObj } = pendingNewsEvent;

  // Kurs anwenden
  const oldPrice = state.prices[ticker];
  const newPrice = Math.max(1, +(oldPrice * (1 + eventObj.impact)).toFixed(2));
  state.prices[ticker] = newPrice;
  state.histories[ticker].push(newPrice);
  if (state.histories[ticker].length > 60) state.histories[ticker].shift();

  // Rival mitziehen (invertiert, abgeschwächt)
  const stockObj = STOCKS.find(s => s.ticker === ticker);
  if (stockObj?.rival && state.prices[stockObj.rival] !== undefined) {
    const rivalOld = state.prices[stockObj.rival];
    const rivalImpact = -eventObj.impact * (0.4 + Math.random() * 0.3);
    const rivalNew = Math.max(1, +(rivalOld * (1 + rivalImpact)).toFixed(2));
    state.prices[stockObj.rival] = rivalNew;
    state.histories[stockObj.rival].push(rivalNew);
    if (state.histories[stockObj.rival].length > 60) state.histories[stockObj.rival].shift();
  }

  // State zurücksetzen
  pendingNewsEvent   = null;
  pendingNewsTimer   = null;
  clearInterval(pendingCountdownId);
  pendingCountdownId = null;

  // Feedback & Re-render
  const dir = eventObj.impact >= 0 ? '▲' : '▼';
  closeNewsToast();
  showToast(`📰 ${ticker} ${dir} ${(Math.abs(eventObj.impact) * 100).toFixed(1)}% — market reacted`);
  renderAll();
}

function showNewsToast(ticker, msg, impact, sector = null) {
  const el  = document.getElementById('newsEventToast');
  const dir = impact >= 0 ? '▲' : '▼';
  const col = impact >= 0 ? 'var(--green)' : 'var(--red)';

  // Sektor-Badge HTML
  const sectorBadge = sector
    ? `<span style="
        background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);
        border-radius:3px;color:var(--accent);font-size:9px;font-weight:700;
        letter-spacing:1px;padding:1px 6px;margin-right:6px;vertical-align:middle;
        text-transform:uppercase;">${sector} SECTOR</span>`
    : '';

  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
          ${sectorBadge}
          <span class="net-ticker">${ticker}</span>
          <span class="net-impact" style="color:${col};">${dir} ${(Math.abs(impact)*100).toFixed(1)}% INCOMING</span>
        </div>
        <div style="font-size:12px;color:var(--dim);line-height:1.5;margin-bottom:8px;">${msg}</div>
        <button
          onclick="openModal('${ticker}')"
          style="background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.35);
                 border-radius:4px;color:var(--accent);font-family:'Rajdhani',sans-serif;
                 font-weight:700;font-size:11px;letter-spacing:1px;padding:4px 10px;cursor:pointer;">
          📊 TRADE ${ticker} NOW
        </button>
      </div>
      <button
        onclick="closeNewsToast()"
        style="background:none;border:none;color:var(--dim);cursor:pointer;
               font-size:16px;line-height:1;padding:0;flex-shrink:0;">✕</button>
    </div>
    <div id="newsCountdownRow"
         style="display:flex;justify-content:space-between;align-items:center;
                margin-top:10px;padding-top:8px;border-top:1px solid var(--border);">
      <span style="font-size:11px;color:var(--dim);letter-spacing:1px;text-transform:uppercase;">
        MARKET REACTS IN
      </span>
      <span id="newsCountdownVal"
            style="font-family:'Share Tech Mono',monospace;font-size:20px;
                   font-weight:700;color:var(--gold);min-width:44px;text-align:right;">
        ${NEWS_REACTION_TIME}s
      </span>
    </div>
    <div style="margin-top:8px;height:4px;border-radius:2px;
                background:rgba(255,255,255,0.08);overflow:hidden;">
      <div id="newsProgressFill"
           style="height:100%;width:100%;border-radius:2px;
                  background:${col};
                  transition:width ${NEWS_REACTION_TIME}s linear;"></div>
    </div>`;

  el.classList.add('show');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const fill = document.getElementById('newsProgressFill');
      if (fill) fill.style.width = '0%';
    });
  });
}
function updateNewsCountdown(remaining) {
  const el = document.getElementById('newsCountdownVal');
  if (!el) return;

  el.textContent = remaining + 's';

  if (remaining <= 5) {
    el.style.color     = 'var(--red)';
    el.style.animation = 'pulse-countdown 0.4s ease-in-out infinite alternate';
  } else if (remaining <= 15) {
    el.style.color     = 'var(--red)';
    el.style.animation = 'none';
  } else if (remaining <= 20) {
    el.style.color     = 'orange';
    el.style.animation = 'none';
  } else {
    el.style.color     = 'var(--gold)';
    el.style.animation = 'none';
  }
}

function closeNewsToast() {
  clearTimeout(newsEventTimerToast);
  newsEventTimerToast = null;
  document.getElementById('newsEventToast').classList.remove('show');
}

// Spieler schließt Toast manuell → Event läuft still weiter im Hintergrund
// (pendingNewsEvent bleibt aktiv, Tabellen-Highlight bleibt)
// ═══════════════════════════════════════════════════════
// SAVE / LOAD / RESET
// ═══════════════════════════════════════════════════════
function saveGame() {
  if (!currentSlot) return;
  state.savedAt = Date.now();
  try {
    localStorage.setItem(SAVE_PREFIX + currentSlot, JSON.stringify(state));
    showToast('💾 Saved – Slot ' + currentSlot);
  } catch(e) { showToast('Save failed: '+e.message, true); }
}

function loadSlot(slot) {
  try {
    const raw = localStorage.getItem(SAVE_PREFIX + slot);
    if (!raw) return false;
    const s = JSON.parse(raw);
    if (!s || !s.prices) return false;

    const base = defaultState();
    state = { ...base, ...s };

    // Fehlende Felder aus alten Saves nachrüsten
    if (!state.volumes) state.volumes = base.volumes;
    if (state.lastDividendDay === undefined) state.lastDividendDay = 0;
    if (!state.tradeLog)        state.tradeLog        = [];
    if (!state.netWorthHistory) state.netWorthHistory = [];
    if (!state.shorts) state.shorts = {};

    // Stats-Felder einzeln sichern damit keine undefined entstehen
    state.stats = {
      totalTrades:    state.stats?.totalTrades    ?? 0,
      realizedPnl:    state.stats?.realizedPnl    ?? 0,
      bestTrade:      state.stats?.bestTrade       ?? 0,
      worstTrade:     state.stats?.worstTrade      ?? 0,
      startCash:      state.stats?.startCash       ?? 100000,
      totalFeesPaid:  state.stats?.totalFeesPaid   ?? 0,  
      totalDividends: state.stats?.totalDividends  ?? 0,  
    };

    return true;
  } catch(e) {
    localStorage.removeItem(SAVE_PREFIX + slot);
    return false;
  }
}

function getSlotMeta(slot) {
  try {
    const raw = localStorage.getItem(SAVE_PREFIX + slot);
    if (!raw) return null;
    const s = JSON.parse(raw);
    const totalVal = Object.entries(s.holdings||{}).reduce((a,[t,h])=>a+(s.prices[t]||0)*h.qty,0);
    const nw = (s.cash||0)+totalVal;
    return { savedAt: s.savedAt ? new Date(s.savedAt).toLocaleString('de-DE') : '–', netWorth: fmt(nw) };
  } catch(e) { return null; }
}

function startTimers() {
  if (saveIntervalId)    clearInterval(saveIntervalId);
  if (priceIntervalId)   clearInterval(priceIntervalId);
  if (newsIntervalId)    clearInterval(newsIntervalId);
  if (insiderIntervalId) clearInterval(insiderIntervalId);

  saveIntervalId     = setInterval(saveGame, 30000);
  priceIntervalId    = setInterval(() => simulateTick(1), 4000);
  newsIntervalId     = setInterval(fireNewsEvent, 60000);
  insiderIntervalId  = setInterval(fireInsiderTip, INSIDER_INTERVAL_MS);

  if (!beforeUnloadAdded) {
    window.addEventListener('beforeunload', saveGame);
    beforeUnloadAdded = true;
  }
}

function stopTimers() {
  clearInterval(saveIntervalId);
  clearInterval(priceIntervalId);
  clearInterval(newsIntervalId);
  clearInterval(insiderIntervalId);
  // Pending news abbrechen
  if (pendingNewsTimer)   { clearTimeout(pendingNewsTimer);   pendingNewsTimer = null; }
  if (pendingCountdownId) { clearInterval(pendingCountdownId); pendingCountdownId = null; }
  pendingNewsEvent = null;
}

// ═══════════════════════════════════════════════════════
// CUSTOM CONFIRM
// ═══════════════════════════════════════════════════════
let confirmResolve = null;
function showConfirm(icon, title, msg) {
  return new Promise(resolve => {
    confirmResolve = resolve;
    document.getElementById('confirmIcon').textContent  = icon;
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMsg').textContent   = msg;
    document.getElementById('confirmBackdrop').classList.add('open');
  });
}

// ═══════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════
let toastTimer;
function showToast(msg, isError=false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  t.classList.toggle('error', isError);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show','error'), 3000);
}

// ═══════════════════════════════════════════════════════
// PROFILE SCREEN
// ═══════════════════════════════════════════════════════
function showProfileScreen() {
  const el = document.createElement('div');
  el.className = 'profile-backdrop';
  el.id = 'profileScreen';

  const slots = [1,2,3].map(slot => {
    const meta = getSlotMeta(slot);
    return `<div class="slot-btn" data-slot="${slot}">
      <div>
        <div class="slot-name">SLOT ${slot}</div>
        <div class="slot-meta">${meta ? `Net Worth: ${meta.netWorth} · Saved: ${meta.savedAt}` : 'Empty – New Game'}</div>
      </div>
      ${meta ? `<div class="slot-actions"><button class="slot-del" data-del="${slot}">DELETE</button></div>` : ''}
    </div>`;
  }).join('');

  el.innerHTML = `<div class="profile-box">
    <div class="profile-title">🎮 LOS SANTOS EXCHANGE</div>
    <div class="profile-sub">Select a save slot to continue or start a new game</div>
    <div class="slot-list">${slots}</div>
    <button class="btn-new-game" id="btnNewGame">+ NEW GAME (SLOT 1)</button>
  </div>`;
  document.body.appendChild(el);

  el.querySelectorAll('.slot-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.target.classList.contains('slot-del')) return;
      const slot   = +btn.dataset.slot;
      const loaded = loadSlot(slot);
      currentSlot  = slot;
      if (loaded) {
        document.body.removeChild(el);
        compressTime();
        startTimers();
        renderAll();
        renderNews();
        showToast('📂 Slot ' + slot + ' geladen');
      } else {
        initState();
        document.body.removeChild(el);
        startTimers();
        renderAll();
        renderNews();
        showToast('🆕 New game – Slot ' + slot);
      }
      if (navigator.storage?.persist) navigator.storage.persist();
    });
  });

  el.querySelectorAll('.slot-del').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const slot = +btn.dataset.del;
      const ok = await showConfirm('🗑️','Delete Slot '+slot,'This save will be permanently deleted.');
      if (ok) { localStorage.removeItem(SAVE_PREFIX + slot); document.body.removeChild(el); showProfileScreen(); }
    });
  });
}

// ═══════════════════════════════════════════════════════
// NEWS BOTTOM BAR
// ═══════════════════════════════════════════════════════
function renderNews() {
  const doubled = [...NEWS_STATIC,...NEWS_STATIC];
  document.getElementById('newsTrack').innerHTML = doubled.map(n =>
    `<span class="news-item">◆ ${n}</span>`).join('');
}

// ═══════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════
document.getElementById('stockTableBody').addEventListener('click', e => {
  const row = e.target.closest('.stock-row');
  if (row) openModal(row.dataset.ticker);
});

document.getElementById('watchlistEl').addEventListener('click', e => {
  const item = e.target.closest('.watch-item');
  if (item) openModal(item.dataset.ticker);
});

document.getElementById('sectorTabs').addEventListener('click', e => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  currentFilter = btn.dataset.sector;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
});

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('stockModal').addEventListener('click', e => {
  if (e.target === document.getElementById('stockModal')) closeModal();
});

document.getElementById('mTabBuy').addEventListener('click', () => {
  modalMode = 'buy';
  document.getElementById('mTabBuy').className  = 'trade-tab2 buy-active';
  document.getElementById('mTabSell').className = 'trade-tab2';
  document.getElementById('btnModalTrade').className   = 'btn-modal-trade btn-modal-buy';
  document.getElementById('btnModalTrade').textContent = 'BUY SHARES';
  updateMTotal();
});
document.getElementById('mTabSell').addEventListener('click', () => {
  modalMode = 'sell';
  document.getElementById('mTabBuy').className  = 'trade-tab2';
  document.getElementById('mTabSell').className = 'trade-tab2 sell-active';
  document.getElementById('btnModalTrade').className   = 'btn-modal-trade btn-modal-sell';
  document.getElementById('btnModalTrade').textContent = 'SELL SHARES';
  updateMTotal();
});

document.querySelector('.m-qty-btns').addEventListener('click', e => {
  const btn = e.target.closest('.m-qty-btn');
  if (!btn || !modalTicker) return;
  if (btn.dataset.qty === 'max') {
    const price = state.prices[modalTicker];
    if (modalMode === 'buy') {
      document.getElementById('mQtyInput').value = Math.max(1, Math.floor(state.cash / price));
    } else {
      document.getElementById('mQtyInput').value = Math.max(1, state.holdings[modalTicker]?.qty || 1);
    }
  } else {
    document.getElementById('mQtyInput').value = btn.dataset.qty;
  }
  updateMTotal();
});

document.getElementById('mQtyInput').addEventListener('input', updateMTotal);

document.getElementById('btnModalTrade').addEventListener('click', () => {
  if (!modalTicker) return;
  const qty = parseInt(document.getElementById('mQtyInput').value);
  if (!qty || qty < 1) { showToast('Enter a valid quantity', true); return; }
  executeTrade(modalTicker, modalMode, qty);
  refreshModal();
});

document.getElementById('btnAddOrder').addEventListener('click', () => {
  if (!modalTicker) return;
  const type  = document.getElementById('limitType').value;
  const price = parseFloat(document.getElementById('limitPrice').value);
  const qty   = parseInt(document.getElementById('limitQty').value);
  if (!price || !qty || qty < 1) { showToast('Fill in price and quantity', true); return; }
  state.limitOrders.push({ id: state.orderIdSeq++, ticker: modalTicker, type, price, qty });
  document.getElementById('limitPrice').value = '';
  document.getElementById('limitQty').value   = '';
  showToast(`⏱ Order set: ${type} ${qty}×${modalTicker} @ ${fmt(price)}`);
  renderOrders();
});

document.getElementById('ordersEl').addEventListener('click', e => {
  const btn = e.target.closest('.order-cancel');
  if (!btn) return;
  const id = +btn.dataset.orderId;
  state.limitOrders = state.limitOrders.filter(o => o.id !== id);
  renderOrders();
  showToast('Order cancelled');
});

document.getElementById('btnSetStopLoss').addEventListener('click', () => {
  if (!modalTicker) return;
  const pct = parseFloat(document.getElementById('stopLossInput').value);
  if (!pct || pct < 1 || pct > 99) { showToast('Enter a % between 1–99', true); return; }
  state.stopLosses[modalTicker] = pct;
  document.getElementById('stopLossStatus').textContent = `Active: auto-sell at −${pct}% loss`;
  showToast(`🛡 Stop-loss set for ${modalTicker} at −${pct}%`);
});

document.getElementById('btnWatch').addEventListener('click', () => {
  if (!modalTicker) return;
  const idx = state.watchlist.indexOf(modalTicker);
  if (idx === -1) { state.watchlist.push(modalTicker); showToast('★ Added to watchlist'); }
  else            { state.watchlist.splice(idx, 1);    showToast('Removed from watchlist'); }
  updateWatchBtn();
  renderWatchlist();
});

document.getElementById('btnSave').addEventListener('click', saveGame);

document.getElementById('btnReset').addEventListener('click', async () => {
  const ok = await showConfirm('🔄','Reset Game','Your current progress in Slot '+currentSlot+' will be reset to $100,000. This cannot be undone.');
  if (!ok) return;
  stopTimers();
  localStorage.removeItem(SAVE_PREFIX + currentSlot);
  initState();
  startTimers();
  renderAll();
  renderNews();
  showToast('🔄 Game reset – Slot ' + currentSlot);
});

document.getElementById('btnHardReset').addEventListener('click', async () => {
  const ok = await showConfirm('🧨','Hard Reset','ALL save slots will be permanently deleted. There is no undo.');
  if (!ok) return;
  stopTimers();
  [1,2,3].forEach(i => localStorage.removeItem(SAVE_PREFIX + i));
  location.reload();
});

document.getElementById('btnConfirmOk').addEventListener('click', () => {
  document.getElementById('confirmBackdrop').classList.remove('open');
  if (confirmResolve) { confirmResolve(true); confirmResolve = null; }
});
document.getElementById('btnConfirmCancel').addEventListener('click', () => {
  document.getElementById('confirmBackdrop').classList.remove('open');
  if (confirmResolve) { confirmResolve(false); confirmResolve = null; }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('stockModal').classList.contains('open')) closeModal();
  }
});

// ── SIDEBAR TABS ──────────────────────────────────────
document.querySelector('.sidebar-tabs').addEventListener('click', e => {
  const btn = e.target.closest('.stab');
  if (!btn) return;
  document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.stab-content').forEach(c => c.style.display = 'none');
  btn.classList.add('active');
  document.getElementById('stab-' + btn.dataset.tab).style.display = 'block';
});

// ═══════════════════════════════════════════════════════
// INSIDER TIPS
// ═══════════════════════════════════════════════════════
const INSIDER_MSGS_UP = [
  'heard something big is coming for',
  'my guy on the inside says buy',
  'word on the street — load up on',
  'trust me on this one, watch',
  'Lester just called, he likes',
];
const INSIDER_MSGS_DOWN = [
  'something smells off about',
  'I\'d get out of',
  'heard some bad news incoming for',
  'my contact says dump',
  'word is trouble ahead for',
];

function fireInsiderTip() {
  // Kein Tip während ein News-Event pending ist
  if (pendingNewsEvent) return;

  const s        = STOCKS[Math.floor(Math.random() * STOCKS.length)];
  const isUp     = Math.random() > 0.5;
  const correct  = Math.random() < INSIDER_ACCURACY;

  // Richtung die dem Spieler angezeigt wird
  const shownDir = isUp ? 'up' : 'down';
  // Tatsächliche Wirkung (70% korrekt)
  const realDir  = correct ? isUp : !isUp;

  const msgs  = isUp ? INSIDER_MSGS_UP : INSIDER_MSGS_DOWN;
  const msg   = msgs[Math.floor(Math.random() * msgs.length)];
  const col   = isUp ? 'var(--gold)' : 'rgba(255,180,0,0.9)';
  const arrow = isUp ? '▲' : '▼';

  // Toast anzeigen
  const el = document.getElementById('newsEventToast');
  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.4);
                       border-radius:3px;color:var(--gold);font-size:9px;font-weight:700;
                       letter-spacing:1px;padding:1px 6px;">💬 INSIDER</span>
          <span class="net-ticker">${s.ticker}</span>
          <span style="color:${col};font-weight:700;font-size:13px;">${arrow}</span>
        </div>
        <div style="font-size:12px;color:var(--dim);line-height:1.5;margin-bottom:8px;">
          "Hey… I ${msg} <strong style="color:#fff">${s.name}</strong>. Don't tell anyone."
        </div>
        <button
          onclick="openModal('${s.ticker}')"
          style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.35);
                 border-radius:4px;color:var(--gold);font-family:'Rajdhani',sans-serif;
                 font-weight:700;font-size:11px;letter-spacing:1px;padding:4px 10px;cursor:pointer;">
          📊 TRADE ${s.ticker}
        </button>
      </div>
      <button onclick="closeNewsToast()"
              style="background:none;border:none;color:var(--dim);cursor:pointer;
                     font-size:16px;line-height:1;padding:0;flex-shrink:0;">✕</button>
    </div>`;

  el.classList.add('show');

  // Nach 20s den Kurs tatsächlich bewegen (versteckt, kein Announcement)
  const impact = (0.04 + Math.random() * 0.06) * (realDir ? 1 : -1);
  setTimeout(() => {
    if (!state.prices[s.ticker]) return;
    const old = state.prices[s.ticker];
    const np  = Math.max(1, +(old * (1 + impact)).toFixed(2));
    state.prices[s.ticker] = np;
    state.histories[s.ticker].push(np);
    if (state.histories[s.ticker].length > 60) state.histories[s.ticker].shift();
    renderAll();
  }, 20000);

  // Toast nach 15s ausblenden
  clearTimeout(newsEventTimerToast);
  newsEventTimerToast = setTimeout(() => {
    document.getElementById('newsEventToast').classList.remove('show');
  }, 15000);
}

// Short buttons
document.getElementById('btnShortOpen').addEventListener('click', () => {
  if (!modalTicker) return;
  const qty = parseInt(document.getElementById('mQtyInput').value);
  if (!qty || qty < 1) { showToast('Enter a valid quantity', true); return; }
  openShort(modalTicker, qty);
  refreshModal();
});

document.getElementById('btnShortClose').addEventListener('click', () => {
  if (!modalTicker) return;
  const sh = state.shorts?.[modalTicker];
  if (!sh) { showToast('No short position on ' + modalTicker, true); return; }
  closeShort(modalTicker, sh.qty);
  refreshModal();
});

// ═══════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════
renderNews();
showProfileScreen();