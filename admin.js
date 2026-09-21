/* ==========================================================================
   Admin panel — triple-click the "Haikus" <h1> to open.
   Requires a fine-grained GitHub PAT stored in localStorage.
   Token scope: Contents (Read and write) on ObedAcharjee/Haikus2 only.
   ========================================================================== */

const ADMIN = {
  owner: 'ObedAcharjee',
  repo: 'Haikus2',
  branch: 'main',
  dataPath: 'haikus-data.js',
  imagesDir: 'images',
  tokenKey: 'haiku_admin_token'
};

// ---------- token storage ----------
const getToken   = () => localStorage.getItem(ADMIN.tokenKey);
const setToken   = (t) => localStorage.setItem(ADMIN.tokenKey, t);
const clearToken = () => localStorage.removeItem(ADMIN.tokenKey);

// ---------- GitHub Contents API ----------
async function ghGet(path) {
  const res = await fetch(
    `https://api.github.com/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${path}?ref=${ADMIN.branch}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/vnd.github+json'
      }
    }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function ghPut(path, base64Content, message, sha) {
  const body = { message, content: base64Content, branch: ADMIN.branch };
  if (sha) body.sha = sha;
  const res = await fetch(
    `https://api.github.com/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );
  if (!res.ok) throw new Error(`PUT ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

// ---------- helpers ----------
const toBase64     = (s) => btoa(unescape(encodeURIComponent(s)));
const fromBase64   = (b) => decodeURIComponent(escape(atob(b.replace(/\s/g, ''))));
const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const r = new FileReader();
  r.onload = () => resolve(r.result.split(',')[1]);
  r.onerror = reject;
  r.readAsDataURL(file);
});
const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------- panel UI ----------
let panelEl = null;

function buildPanel() {
  const wrap = document.createElement('div');
  wrap.id = 'admin-panel';
  wrap.innerHTML = `
    <div class="admin-backdrop"></div>
    <div class="admin-dialog">
      <h3>Add a Haiku</h3>
      <label>Title
        <input id="adm-title" type="text" placeholder="e.g. War">
      </label>
      <label>Line 1 <input id="adm-l1" type="text"></label>
      <label>Line 2 <input id="adm-l2" type="text"></label>
      <label>Line 3 <input id="adm-l3" type="text"></label>
      <label>Image
        <input id="adm-img" type="file" accept="image/*">
      </label>
      <div class="admin-actions">
        <button id="adm-save">Save &amp; Publish</button>
        <button id="adm-close" type="button">Cancel</button>
        <button id="adm-forget" type="button" title="Clear stored GitHub token">Forget token</button>
      </div>
      <p id="adm-status"></p>
    </div>`;
  document.body.appendChild(wrap);

  wrap.querySelector('#adm-close').onclick = closePanel;
  wrap.querySelector('.admin-backdrop').onclick = closePanel;
  wrap.querySelector('#adm-forget').onclick = () => {
    clearToken();
    setStatus('Token cleared from this browser.', 'ok');
  };
  wrap.querySelector('#adm-save').onclick = saveHaiku;
  return wrap;
}

function setStatus(msg, kind) {
  const el = document.getElementById('adm-status');
  if (!el) return;
  el.textContent = msg;
  el.className = kind || '';
}

function openPanel() {
  if (!panelEl) panelEl = buildPanel();
  panelEl.classList.add('open');
  const t = document.getElementById('adm-title');
  if (t) t.focus();
}

function closePanel() {
  if (panelEl) panelEl.classList.remove('open');
}

// ---------- save flow ----------
async function saveHaiku() {
  const title = document.getElementById('adm-title').value.trim();
  const l1    = document.getElementById('adm-l1').value.trim();
  const l2    = document.getElementById('adm-l2').value.trim();
  const l3    = document.getElementById('adm-l3').value.trim();
  const file  = document.getElementById('adm-img').files[0];

  if (!title || !l1 || !l2 || !l3 || !file) {
    return setStatus('Fill every field and pick an image.', 'err');
  }

  if (!getToken()) {
    const t = prompt('Paste your GitHub token (fine-grained PAT, Contents: Read and write on this repo):');
    if (!t) return setStatus('Cancelled — no token.', 'err');
    setToken(t.trim());
  }

  try {
    // 1. Upload the image
    setStatus('Uploading image…');
    const ext     = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const imgPath = `${ADMIN.imagesDir}/${slugify(title)}-${Date.now()}.${ext}`;
    const imgB64  = await fileToBase64(file);
    await ghPut(imgPath, imgB64, `Add image for "${title}"`);

    // 2. Load current haikus-data.js
    setStatus('Reading haikus-data.js…');
    const dataFile = await ghGet(ADMIN.dataPath);
    if (!dataFile) throw new Error('haikus-data.js not found in repo');

    const src = fromBase64(dataFile.content);

    // Evaluate the file in an isolated scope to pull out HAIKUS
    const HAIKUS = (new Function(`${src}\nreturn HAIKUS;`))();

    // 3. Append new haiku
    const newHaiku = {
      id: slugify(title),
      title,
      image: imgPath,
      lines: [l1, l2, l3]
    };
    HAIKUS.push(newHaiku);

    // 4. Rebuild the file, preserving the leading comment header
    const headerIdx = src.indexOf('const HAIKUS');
    const header    = headerIdx > 0 ? src.slice(0, headerIdx) : '';
    const newSrc    = `${header}const HAIKUS = ${JSON.stringify(HAIKUS, null, 2)};\n`;

    // 5. Commit
    setStatus('Committing haikus-data.js…');
    await ghPut(ADMIN.dataPath, toBase64(newSrc), `Add haiku: ${title}`, dataFile.sha);

    setStatus('Published! Reloading in 4s…', 'ok');
    setTimeout(() => location.reload(true), 4000);
  } catch (e) {
    console.error(e);
    setStatus(`Error: ${e.message}`, 'err');
  }
}

// ---------- triggers ----------
document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('header h1');
  if (h1) {
    h1.style.cursor = 'default';
    let clicks = 0, timer = null;
    h1.addEventListener('click', () => {
      clicks++;
      if (timer) clearTimeout(timer);
      if (clicks >= 3) {
        clicks = 0;
        openPanel();
      } else {
        timer = setTimeout(() => { clicks = 0; }, 500);
      }
    });
  }

  // Keyboard backup (Ctrl+Shift+A)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      openPanel();
    }
  });
});
