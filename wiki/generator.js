let executives = [
  {role:'CEO', name:''},
  {role:'CFO', name:''},
];

function renderExecs() {
  const list = document.getElementById('execList');
  list.innerHTML = executives.map((e, i) => `
    <div class="exec-row">
      <input type="text" value="${e.role}" placeholder="Role (e.g. CEO)" oninput="executives[${i}].role=this.value;updatePreview()">
      <input type="text" value="${e.name}" placeholder="Full Name" oninput="executives[${i}].name=this.value;updatePreview()">
      <button class="btn-remove" onclick="removeExec(${i})">✕</button>
    </div>`).join('');
}

function addExec() {
  executives.push({role:'', name:''});
  renderExecs();
  updatePreview();
}

function removeExec(i) {
  executives.splice(i, 1);
  renderExecs();
  updatePreview();
}

function buildObject() {
  return {
    ticker:     document.getElementById('f-ticker').value.trim().toUpperCase(),
    name:       document.getElementById('f-name').value.trim(),
    sector:     document.getElementById('f-sector').value,
    rival:      document.getElementById('f-rival').value.trim().toUpperCase(),
    basePrice:  parseFloat(document.getElementById('f-basePrice').value) || 0,
    vol:        parseFloat(document.getElementById('f-vol').value) || 0,
    tagline:    document.getElementById('f-tagline').value.trim(),
    founded:    document.getElementById('f-founded').value.trim(),
    employees:  document.getElementById('f-employees').value.trim(),
    hq:         document.getElementById('f-hq').value.trim(),
    desc:       document.getElementById('f-desc').value.trim(),
    executives: executives.filter(e => e.role || e.name),
  };
}

function updatePreview() {
  const obj = buildObject();
  document.getElementById('previewJson').textContent = JSON.stringify(obj, null, 2);
}

function downloadJSON() {
  const obj = buildObject();
  if (!obj.ticker) { showToast('❌ Ticker is required', true); return; }
  if (!obj.name)   { showToast('❌ Company name is required', true); return; }
  if (!obj.sector) { showToast('❌ Sector is required', true); return; }
  if (!obj.basePrice) { showToast('❌ Base price is required', true); return; }

  const blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = obj.ticker + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast(`✅ Downloaded ${obj.ticker}.json — upload to wiki/companies/`);
}

function copyJSON() {
  const json = JSON.stringify(buildObject(), null, 2);
  navigator.clipboard.writeText(json).then(() => showToast('📋 Copied to clipboard'));
}

function resetForm() {
  ['f-ticker','f-name','f-rival','f-tagline','f-founded','f-employees','f-hq','f-desc'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f-sector').value = '';
  document.getElementById('f-basePrice').value = '';
  document.getElementById('f-vol').value = '';
  executives = [{role:'CEO',name:''},{role:'CFO',name:''}];
  renderExecs();
  updatePreview();
}

function loadJSON(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const obj = JSON.parse(e.target.result);
      document.getElementById('f-ticker').value    = obj.ticker    || '';
      document.getElementById('f-name').value      = obj.name      || '';
      document.getElementById('f-sector').value    = obj.sector    || '';
      document.getElementById('f-rival').value     = obj.rival     || '';
      document.getElementById('f-basePrice').value = obj.basePrice || '';
      document.getElementById('f-vol').value       = obj.vol       || '';
      document.getElementById('f-tagline').value   = obj.tagline   || '';
      document.getElementById('f-founded').value   = obj.founded   || '';
      document.getElementById('f-employees').value = obj.employees || '';
      document.getElementById('f-hq').value        = obj.hq        || '';
      document.getElementById('f-desc').value      = obj.desc      || '';
      executives = obj.executives?.length
        ? obj.executives
        : [{role:'CEO',name:''},{role:'CFO',name:''}];
      renderExecs();
      updatePreview();
      showToast(`✅ Loaded ${obj.ticker} — edit and re-download`);
    } catch(err) {
      showToast('❌ Invalid JSON file', true);
    }
  };
  reader.readAsText(file);
  input.value = '';
}

let toastTimer;
function showToast(msg, isErr=false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.borderColor = isErr ? 'var(--red)' : 'var(--green)';
  t.style.color = isErr ? 'var(--red)' : 'var(--green)';
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ── Init ────────────────────────────────────────────────
renderExecs();
updatePreview();