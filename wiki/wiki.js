const SECTOR_EMOJI = {FOOD:'🍔',FINANCE:'🏦',TECH:'💻',TRANSPORT:'🚗',RETAIL:'🛒',ENERGY:'⚡',PHARMA:'💊',MEDIA:'📻'};
const SECTOR_ORDER = ['FOOD','FINANCE','TECH','TRANSPORT','RETAIL','ENERGY','PHARMA','MEDIA'];

let allCompanies = [];
let currentSector = 'ALL';
let currentSearch = '';

// ── Load all companies from JSON files ──────────────────
async function loadCompanies() {
  try {
    // companies.php liest automatisch alle *.json aus dem companies/ Ordner
    // Kein manuelles index.json nötig — neue Firma hochladen = fertig
    const resp = await fetch('companies.php');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    allCompanies = await resp.json();
    init();
  } catch(e) {
    document.getElementById('cardList').innerHTML =
      `<div class="loading" style="color:var(--red)">❌ Failed to load company data.<br><small>${e.message}</small></div>`;
  }
}

function init() {
  buildSectorBar();
  buildCards();
  buildNav();
  document.getElementById('statCount').textContent = allCompanies.length;
}

// ── Sector Bar ───────────────────────────────────────────
function buildSectorBar() {
  const bar = document.getElementById('sectorBar');
  const sectors = [...new Set(allCompanies.map(c => c.sector))].sort();
  SECTOR_ORDER.forEach(s => {
    if (!sectors.includes(s)) return;
    const btn = document.createElement('button');
    btn.className = 'sec-btn';
    btn.dataset.sector = s;
    btn.textContent = (SECTOR_EMOJI[s] || '') + ' ' + s;
    btn.onclick = () => filterSector(s, btn);
    bar.appendChild(btn);
  });
}

function filterSector(sector, btn) {
  currentSector = sector;
  document.querySelectorAll('.sec-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

// ── Build Cards ──────────────────────────────────────────
function volText(v) {
  if (v <= 0.022) return {label:'Very Low', pct: Math.round(v/0.065*100)};
  if (v <= 0.030) return {label:'Low',      pct: Math.round(v/0.065*100)};
  if (v <= 0.040) return {label:'Medium',   pct: Math.round(v/0.065*100)};
  if (v <= 0.050) return {label:'High',     pct: Math.round(v/0.065*100)};
  return                 {label:'Very High',pct: Math.round(v/0.065*100)};
}

function buildCards() {
  const list = document.getElementById('cardList');
  list.innerHTML = '';

  // Sort by sector then name
  const sorted = [...allCompanies].sort((a,b) =>
    SECTOR_ORDER.indexOf(a.sector) - SECTOR_ORDER.indexOf(b.sector) ||
    a.name.localeCompare(b.name)
  );

  sorted.forEach(c => {
    const v = volText(c.vol);
    const rival = allCompanies.find(x => x.ticker === c.rival);
    const rivalHtml = rival
      ? `<span class="rival-link" onclick="scrollTo('${c.rival}')">${c.rival} — ${rival.name}</span>`
      : `<span style="color:var(--dim)">—</span>`;

    const mgmtHtml = (c.executives||[]).map(e => `
      <div class="mgmt-item">
        <div class="mgmt-role">${e.role}</div>
        <div class="mgmt-name">${e.name}</div>
      </div>`).join('');

    const card = document.createElement('div');
    card.className = 'company-card';
    card.id = 'card-' + c.ticker;
    card.dataset.sector = c.sector;
    card.dataset.search = (c.ticker + ' ' + c.name + ' ' + c.sector).toLowerCase();

    card.innerHTML = `
      <div class="card-top">
        <div class="card-tl">
          <div class="card-ticker-row">
            <span class="card-ticker">${c.ticker}</span>
            <span class="card-sector-badge badge-${c.sector}">${SECTOR_EMOJI[c.sector]||''} ${c.sector}</span>
          </div>
          <div class="card-name">${c.name}</div>
          <div class="card-tagline">"${c.tagline}"</div>
        </div>
        <div class="card-price-box">
          <div class="card-price">$${Number(c.basePrice).toFixed(2)}</div>
          <div class="card-price-lbl">BASE PRICE</div>
          <div class="vol-indicator">Vol: ${v.label} (${v.pct}%)</div>
        </div>
      </div>
      <p class="card-desc">${c.desc}</p>
      <div class="card-mgmt">${mgmtHtml}</div>
      <div class="card-stats">
        <div class="card-stat"><div class="stat-val">${c.founded||'—'}</div><div class="stat-lbl">Founded</div></div>
        <div class="card-stat"><div class="stat-val">${c.employees||'—'}</div><div class="stat-lbl">Employees</div></div>
        <div class="card-stat"><div class="stat-val" style="font-size:11px;line-height:1.4">${c.hq||'—'}</div><div class="stat-lbl">HQ</div></div>
        <div class="card-stat"><div class="stat-val" style="font-size:12px">${rivalHtml}</div><div class="stat-lbl">Main Rival</div></div>
      </div>`;

    list.appendChild(card);
  });
}

function scrollTo(ticker) {
  const el = document.getElementById('card-' + ticker);
  if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

// ── Nav ──────────────────────────────────────────────────
function buildNav(filter='') {
  const nav = document.getElementById('navList');
  nav.innerHTML = '';
  const grouped = {};
  allCompanies.forEach(c => {
    if (filter && !c.ticker.toLowerCase().includes(filter) && !c.name.toLowerCase().includes(filter)) return;
    if (!grouped[c.sector]) grouped[c.sector] = [];
    grouped[c.sector].push(c);
  });
  SECTOR_ORDER.forEach(sector => {
    const list = grouped[sector];
    if (!list?.length) return;
    const lbl = document.createElement('div');
    lbl.className = 'nav-sector-label';
    lbl.textContent = (SECTOR_EMOJI[sector]||'') + ' ' + sector;
    nav.appendChild(lbl);
    list.sort((a,b) => a.name.localeCompare(b.name)).forEach(c => {
      const item = document.createElement('div');
      item.className = 'nav-item';
      item.dataset.ticker = c.ticker;
      item.innerHTML = `<span class="nav-ticker">${c.ticker}</span><span class="nav-name">${c.name}</span>`;
      item.onclick = () => {
        document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));
        item.classList.add('active');
        scrollTo(c.ticker);
      };
      nav.appendChild(item);
    });
  });
}

// ── Filters ──────────────────────────────────────────────
function applyFilters() {
  let visible = 0;
  document.querySelectorAll('.company-card').forEach(card => {
    const sectorOk = currentSector === 'ALL' || card.dataset.sector === currentSector;
    const searchOk = !currentSearch || card.dataset.search.includes(currentSearch);
    const show = sectorOk && searchOk;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });
  document.getElementById('statCount').textContent = visible;
  document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
}

// ── Search ───────────────────────────────────────────────
document.getElementById('globalSearch').addEventListener('input', e => {
  currentSearch = e.target.value.toLowerCase().trim();
  document.getElementById('navSearch').value = e.target.value;
  applyFilters();
  buildNav(currentSearch);
});
document.getElementById('navSearch').addEventListener('input', e => {
  buildNav(e.target.value.toLowerCase().trim());
});

// ── Boot ─────────────────────────────────────────────────
loadCompanies();