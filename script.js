// === Config ===
const CARDS_PER_PAGE = 15;   // 3 rows × 5 cols
let currentPage = 1;
let cards = [];
let totalPages = 1;

// === Load Card Data (array format at data/cards.json) ===
fetch('data/cards.json')
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch cards.json: ' + res.status);
    return res.json();
  })
  .then(data => {
    cards = Array.isArray(data) ? data : [];
    totalPages = Math.max(1, Math.ceil(cards.length / CARDS_PER_PAGE));
    renderPage(currentPage);
    setupPagination();
  })
  .catch(err => {
    console.error("Error loading cards:", err);
    // Optionally render an empty state or a simple placeholder grid
    document.querySelector('#cardGrid').innerHTML = '<p style="color:#f88">Failed to load card data.</p>';
  });

// === Render Page ===
function renderPage(pageNum) {
  const start = (pageNum - 1) * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  const pageCards = cards.slice(start, end);

  const grid = document.querySelector('#cardGrid');
  grid.innerHTML = ''; // clear previous page

  pageCards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    // create image element so we can attach onerror fallback
    const img = document.createElement('img');
    img.alt = card.name || `Card ${card.id}`;
    img.src = card.image || svgPlaceholder(card.id); // use card.image if present, else placeholder

    // if loading fails, show SVG placeholder
    img.onerror = () => {
      img.onerror = null;
      img.src = svgPlaceholder(card.id);
    };

    // info tooltip
    const info = document.createElement('div');
    info.className = 'card-info';
    info.innerHTML = `<strong>${escapeHtml(card.name || 'Card')}</strong><br><em>${escapeHtml(card.rarity || '')}</em><br>${escapeHtml(card.description || '')} <br>${escapeHtml(card.unlock || '')}`;

    cardEl.appendChild(img);
    cardEl.appendChild(info);
    grid.appendChild(cardEl);
  });

  // Update page label and nav button states (IDs from your index.html)
  document.querySelector('#pageLabel').textContent = `Page ${pageNum}/${totalPages}`;
  document.querySelector('#prevBtn').disabled = pageNum === 1;
  document.querySelector('#nextBtn').disabled = pageNum === totalPages;
}

// === Pagination Controls ===
function setupPagination() {
  const prevBtn = document.querySelector('#prevBtn');
  const nextBtn = document.querySelector('#nextBtn');

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
    }
  });

  // keyboard support
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
}

// === Utilities ===
function svgPlaceholder(id, w = 180, h = 252){
  const palette = ['#4f8ef7','#49c0a7','#f07f73','#c37be2','#e3b341','#7bb6f0','#6ed092','#ef8fb4','#9ad06d','#f2a75c'];
  const bg = palette[(id - 1) % palette.length];
  const text = `#${id}`;
  const svg =
`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="#1f2a33" stop-opacity=".95"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="14" fill="url(#g)"/>
  <g fill="rgba(255,255,255,0.18)">
    <circle cx="${w*0.2}" cy="${h*0.25}" r="18"/>
    <circle cx="${w*0.8}" cy="${h*0.7}" r="14"/>
  </g>
  <text x="50%" y="54%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="42" fill="white">${text}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// minimal HTML-escaping for inserted text
function escapeHtml(str){
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

