const ADMIN_API = '/lsx-proxy/admin.php';
let saveState = null;
let currentId = null;
let csrfToken = '';

// ── Gemeinsame Fetch-Funktion ─────────────────────────
async function adminFetch(body) {
  return fetch(ADMIN_API, {
    method:      'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify(body),
  });
}

// ── Status-Meldung ────────────────────────────────────
function showStatus(msg, ok = true) {
  const el = document.getElementById('status');
  el.textContent   = msg;
  el.className     = ok ? 'ok' : 'err';
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}

// ── Auth Check beim Start ─────────────────────────────
async function checkAdminAuth() {
  const gate  = document.getElementById('authGate');
  const panel = document.getElementById('adminPanel');
  const msg   = document.getElementById('authMsg');
  const loginBtn = document.getElementById('btnDiscordLogin');

  try {
    // CSRF-Token zuerst laden via load.php
    const loadResp = await fetch('/lsx-proxy/load.php', { credentials: 'include' });

    if (loadResp.status === 401) {
      msg.textContent = 'Please login with Discord first.';
      loginBtn.style.display = 'flex';
      return;
    }

    const loadData = await loadResp.json();
    if (loadData.user?.csrf) csrfToken = loadData.user.csrf;

    // Admin-Check
    const resp = await adminFetch({ action: 'check' });

    if (resp.status === 401) {
      msg.textContent = 'Please login with Discord first.';
      loginBtn.style.display = 'flex';
      return;
    }

    if (resp.status === 403) {
      msg.textContent = '⛔ Access denied — you are not an admin.';
      msg.style.color = '#ff3355';
      return;
    }

    const data = await resp.json();

    // ── Zugang gewährt ────────────────────────────────
    gate.style.display  = 'none';
    panel.style.display = 'block';

    // User im Header anzeigen
    document.getElementById('adminUser').innerHTML = `
      <img src="${data.avatar || ''}" alt="">
      <span>${data.username}</span>
      <span class="admin-badge">ADMIN</span>
    `;

    // User-Liste automatisch laden
    loadUserList();

  } catch (e) {
    msg.textContent = 'Connection error. Is the server running?';
    msg.style.color = '#ff3355';
  }
}

// ── User-Liste laden ──────────────────────────────────
async function loadUserList() {
  const resp = await adminFetch({ action: 'list' });
  if (!resp.ok) return showStatus('Fehler beim Laden der User-Liste', false);
  const list = await resp.json();
  renderUserList(list);
}

function renderUserList(list) {
  const tbody = document.getElementById('userListBody');
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Keine Saves gefunden</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(u => `
    <tr>
      <td>
        <div class="player-cell">
          <img class="player-avatar" src="${u.avatar || ''}" alt="" onerror="this.style.display='none'">
          <div>
            <div class="player-name">${u.username || '?'}</div>
            <div class="player-id">${u.id}</div>
          </div>
        </div>
      </td>
      <td><span class="nw-value ${u.netWorth >= 1_000_000 ? 'nw-million' : 'nw-normal'}">
        $${(u.netWorth || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </span></td>
      <td style="color:var(--dim);font-family:monospace">
        $${(u.cash || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </td>
      <td style="color:var(--dim)">${u.trades || 0}</td>
      <td style="color:var(--dim)">${u.gameDay || 0}</td>
      <td>
        <div class="btn-row">
          <button onclick="quickLoad('${u.id}')">LOAD</button>
          <button class="btn-red" onclick="quickDelete('${u.id}')">DELETE</button>
        </div>
      </td>
    </tr>`).join('');
}

async function quickLoad(id) {
  document.getElementById('discordId').value = id;
  await loadUser();
  document.getElementById('cardCash').scrollIntoView({ behavior: 'smooth' });
}

async function quickDelete(id) {
  if (!confirm(`Save für ${id} löschen?`)) return;
  const resp   = await adminFetch({ action: 'delete', id });
  const result = await resp.json();
  if (result.ok) {
    showStatus('✅ Save gelöscht');
    loadUserList();
  } else {
    showStatus('❌ Fehler', false);
  }
}

// ── User laden ────────────────────────────────────────
async function loadUser() {
  const id = document.getElementById('discordId').value.trim();
  if (!id) return showStatus('Bitte Discord ID eingeben', false);
  currentId = id;

  const resp = await adminFetch({ action: 'load', id });
  if (!resp.ok) return showStatus('User nicht gefunden oder Fehler', false);

  saveState = await resp.json();
  renderAll();
  showStatus(`✅ User ${id} geladen`);
}

// ── Render ────────────────────────────────────────────
function renderAll() {
  document.getElementById('userInfo').style.display = 'block';
  document.getElementById('userTags').innerHTML = `
    <span class="tag">💰 $${(saveState.cash || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
    <span class="tag">📦 ${Object.keys(saveState.holdings || {}).length} Holdings</span>
    <span class="tag">📉 ${Object.keys(saveState.shorts || {}).length} Shorts</span>
    <span class="tag">📋 ${(saveState.limitOrders || []).length} Orders</span>
    <span class="tag">🏆 $${(saveState.lastMilestone || 0).toLocaleString()}</span>
    <span class="tag">📅 Day ${saveState.gameDay ?? '-'}</span>
  `;
  document.getElementById('saveData').textContent =
    JSON.stringify(saveState, null, 2).slice(0, 800) + '\n...';

  ['cardCash', 'cardStats', 'cardHoldings', 'cardMilestone', 'cardDanger']
    .forEach(id => document.getElementById(id).style.display = 'block');

  document.getElementById('currentCash').value =
    '$' + (saveState.cash || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
  document.getElementById('newCash').value = saveState.cash || 0;

  const s = saveState.stats || {};
  document.getElementById('statStartCash').value = s.startCash     || 0;
  document.getElementById('statPnl').value        = s.realizedPnl   || 0;
  document.getElementById('statTrades').value     = s.totalTrades   || 0;
  document.getElementById('statFees').value       = s.totalFeesPaid || 0;
  document.getElementById('statBest').value       = s.bestTrade     || 0;
  document.getElementById('statWorst').value      = s.worstTrade    || 0;
  document.getElementById('milestoneVal').value   = saveState.lastMilestone || 0;

  renderHoldings();
}

function renderHoldings() {
  const body = document.getElementById('holdingsBody');
  const h    = saveState.holdings || {};
  if (!Object.keys(h).length) {
    body.innerHTML = '<tr><td colspan="4" class="table-empty">Keine Holdings</td></tr>';
    return;
  }
  body.innerHTML = Object.entries(h).map(([ticker, data]) => `
    <tr>
      <td><strong style="color:#fff">${ticker}</strong></td>
      <td><input type="number" value="${data.qty}"
           onchange="updateHolding('${ticker}','qty',this.value)"></td>
      <td><input type="number" value="${data.avgCost}"
           onchange="updateHolding('${ticker}','avgCost',this.value)"></td>
      <td><button class="btn-red" onclick="removeHolding('${ticker}')">✕</button></td>
    </tr>`).join('');
}

// ── Save ──────────────────────────────────────────────
async function save() {
  const resp   = await adminFetch({ action: 'save', id: currentId, state: saveState });
  const result = await resp.json();
  if (result.ok) {
    showStatus('✅ Gespeichert');
    renderAll();
  } else {
    showStatus('❌ Fehler: ' + (result.error || ''), false);
  }
}

// ── Cash ──────────────────────────────────────────────
function setCash() {
  const val = parseFloat(document.getElementById('newCash').value);
  if (isNaN(val)) return showStatus('Ungültiger Wert', false);
  saveState.cash = val;
  save();
}
function addCash(amount) {
  saveState.cash = (saveState.cash || 0) + amount;
  save();
}

// ── Stats ─────────────────────────────────────────────
function saveStats() {
  saveState.stats = {
    startCash:      parseFloat(document.getElementById('statStartCash').value) || 0,
    realizedPnl:    parseFloat(document.getElementById('statPnl').value)       || 0,
    totalTrades:    parseInt(document.getElementById('statTrades').value)       || 0,
    totalFeesPaid:  parseFloat(document.getElementById('statFees').value)       || 0,
    bestTrade:      parseFloat(document.getElementById('statBest').value)       || 0,
    worstTrade:     parseFloat(document.getElementById('statWorst').value)      || 0,
    totalDividends: saveState.stats?.totalDividends || 0,
  };
  save();
}

// ── Holdings ──────────────────────────────────────────
function updateHolding(ticker, field, value) {
  if (!saveState.holdings?.[ticker]) return;
  saveState.holdings[ticker][field] = parseFloat(value);
}
function removeHolding(ticker) {
  delete saveState.holdings[ticker];
  save();
}
function addHolding() {
  const ticker  = document.getElementById('addTicker').value.trim().toUpperCase();
  const qty     = parseInt(document.getElementById('addQty').value);
  const avgCost = parseFloat(document.getElementById('addAvgCost').value);
  if (!ticker || !qty || !avgCost) return showStatus('Alle Felder ausfüllen', false);
  if (!saveState.holdings) saveState.holdings = {};
  saveState.holdings[ticker] = { qty, avgCost };
  save();
}

// ── Milestone ─────────────────────────────────────────
function saveMilestone() {
  saveState.lastMilestone = parseFloat(document.getElementById('milestoneVal').value) || 0;
  save();
}
function resetMilestone() {
  saveState.lastMilestone = 0;
  save();
}

// ── Danger Zone ───────────────────────────────────────
function clearHoldings() {
  if (!confirm('Alle Holdings löschen?')) return;
  saveState.holdings = {};
  save();
}
function clearShorts() {
  if (!confirm('Alle Shorts löschen?')) return;
  saveState.shorts = {};
  save();
}
function clearOrders() {
  if (!confirm('Alle Limit Orders löschen?')) return;
  saveState.limitOrders = [];
  save();
}
function resetGame() {
  if (!confirm('Kompletten Spielstand löschen? NICHT rückgängig machbar!')) return;
  saveState = { newGame: true };
  save();
}

// ── Delete User ───────────────────────────────────────
async function deleteUser() {
  const id = document.getElementById('discordId').value.trim();
  if (!id) return showStatus('Bitte Discord ID eingeben', false);
  if (!confirm(`Save für ${id} permanent löschen?`)) return;
  const resp   = await adminFetch({ action: 'delete', id });
  const result = await resp.json();
  if (result.ok) {
    showStatus('✅ Save gelöscht');
    loadUserList();
  } else {
    showStatus('❌ Fehler', false);
  }
}

// ── Boot ──────────────────────────────────────────────
checkAdminAuth();