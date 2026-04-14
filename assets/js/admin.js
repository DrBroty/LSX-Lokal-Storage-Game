  const ADMIN_KEY = new URLSearchParams(window.location.search).get('key') || '';
  const ADMIN_API = '/lsx-proxy/admin.php';
  let saveState   = null;
  let currentId   = null;

  function showStatus(msg, ok = true) {
    const el = document.getElementById('status');
    el.textContent  = msg;
    el.className    = ok ? 'ok' : 'err';
    el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', 4000);
  }

    // loadUser() korrigieren:
    async function loadUser() {
    const id = document.getElementById('discordId').value.trim();
    if (!id) return showStatus('Bitte Discord ID eingeben', false);
    currentId = id;

    const resp = await fetch(`${ADMIN_API}?action=load&id=${id}&key=${ADMIN_KEY}`);
    if (!resp.ok) return showStatus('User nicht gefunden oder Fehler', false);

    saveState = await resp.json();
    renderAll();
    showStatus(`✅ User ${id} geladen`);
    }

  function renderAll() {
    // User Info
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('userTags').innerHTML = `
      <span class="tag">💰 $${(saveState.cash||0).toLocaleString('en-US',{maximumFractionDigits:0})}</span>
      <span class="tag">📦 ${Object.keys(saveState.holdings||{}).length} Holdings</span>
      <span class="tag">📉 ${Object.keys(saveState.shorts||{}).length} Shorts</span>
      <span class="tag">📋 ${(saveState.limitOrders||[]).length} Orders</span>
      <span class="tag">🏆 Milestone: $${(saveState.lastMilestone||0).toLocaleString()}</span>
      <span class="tag">📅 Day ${saveState.gameDay ?? '-'}</span>
    `;
    document.getElementById('saveData').textContent =
      JSON.stringify(saveState, null, 2).slice(0, 1000) + '\n...';

    // Cards einblenden
    ['cardCash','cardStats','cardHoldings','cardMilestone','cardDanger']
      .forEach(id => document.getElementById(id).style.display = 'block');

    // Cash
    document.getElementById('currentCash').value =
      '$' + (saveState.cash||0).toLocaleString('en-US',{minimumFractionDigits:2});
    document.getElementById('newCash').value = saveState.cash || 0;

    // Stats
    const s = saveState.stats || {};
    document.getElementById('statStartCash').value = s.startCash      || 0;
    document.getElementById('statPnl').value       = s.realizedPnl    || 0;
    document.getElementById('statTrades').value    = s.totalTrades    || 0;
    document.getElementById('statFees').value      = s.totalFeesPaid  || 0;
    document.getElementById('statBest').value      = s.bestTrade      || 0;
    document.getElementById('statWorst').value     = s.worstTrade     || 0;

    // Milestone
    document.getElementById('milestoneVal').value = saveState.lastMilestone || 0;

    // Holdings
    renderHoldings();
  }

  function renderHoldings() {
    const body = document.getElementById('holdingsBody');
    const h    = saveState.holdings || {};
    if (!Object.keys(h).length) {
      body.innerHTML = '<tr><td colspan="4" style="color:#888;padding:8px">Keine Holdings</td></tr>';
      return;
    }
    body.innerHTML = Object.entries(h).map(([ticker, data]) => `
      <tr>
        <td><strong>${ticker}</strong></td>
        <td><input type="number" value="${data.qty}"
             onchange="updateHolding('${ticker}','qty',this.value)"></td>
        <td><input type="number" value="${data.avgCost}"
             onchange="updateHolding('${ticker}','avgCost',this.value)"></td>
        <td><button class="red" onclick="removeHolding('${ticker}')">✕</button></td>
      </tr>`).join('');
  }

// save() korrigieren:
async function save() {
  const resp = await fetch(`${ADMIN_API}?key=${ADMIN_KEY}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ action: 'save', id: currentId, state: saveState })
  });
  const result = await resp.json();
  if (result.ok) {
    showStatus('✅ Gespeichert');
    renderAll();
  } else {
    showStatus('❌ Fehler beim Speichern', false);
  }
}

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

  function updateHolding(ticker, field, value) {
    if (!saveState.holdings[ticker]) return;
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

  function saveMilestone() {
    saveState.lastMilestone = parseFloat(document.getElementById('milestoneVal').value) || 0;
    save();
  }

  function resetMilestone() {
    saveState.lastMilestone = 0;
    save();
  }

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

// deleteUser() korrigieren:
async function deleteUser() {
  const id = document.getElementById('discordId').value.trim();
  if (!id) return showStatus('Bitte Discord ID eingeben', false);
  if (!confirm(`Save-Datei für ${id} permanent löschen?`)) return;

  const resp = await fetch(`${ADMIN_API}?key=${ADMIN_KEY}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ action: 'delete', id })
  });
  const result = await resp.json();
  result.ok ? showStatus('✅ Save gelöscht') : showStatus('❌ Fehler', false);
}