/* Parameters */
const CARDS_PER_ROW = 5;
const ROWS = 3;
const CARDS_PER_PAGE = CARDS_PER_ROW * ROWS; // 15
const TOTAL_PAGES = 10;
const TOTAL_CARDS = CARDS_PER_PAGE * TOTAL_PAGES; // 150

/* Toggle this to use your real assets later */
const USE_LOCAL_IMAGES = false;
const LOCAL_IMAGE_PATH = (i) => `assets/card-${i}.webp`; // put your files as /assets/card-1.png..card-150.png

/* Elements */
const grid = document.getElementById('cardGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageLabel = document.getElementById('pageLabel');

let currentPage = 1;
let cards = [];

// === Load Card Data ===
fetch('data/cards.json')
  .then(res => res.json())
  .then(data => {
    cards = data; // already an array
    renderPage(currentPage);
    setupPagination();
  })
  .catch(err => console.error("Error loading cards:", err));

// === Render Page ===
function renderPage(pageNum) {
  const start = (pageNum - 1) * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  const pageCards = cards.slice(start, end);

  const grid = document.querySelector('.card-grid');
  grid.innerHTML = ''; // clear previous page

  pageCards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <div class="card-info">
        <strong>${card.name}</strong><br>
        <em>${card.rarity}</em><br>
        ${card.description}
      </div>
    `;
    grid.appendChild(cardEl);
  });

  // update page label
  document.querySelector('#page-num').textContent = `Page ${pageNum} / ${TOTAL_PAGES}`;
}

// === Pagination Controls ===
function setupPagination() {
  const prevBtn = document.querySelector('#prev-page');
  const nextBtn = document.querySelector('#next-page');

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < TOTAL_PAGES) {
      currentPage++;
      renderPage(currentPage);
    }
  });
}

/* Also support keyboard arrows */
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});


/* Generate a unique SVG image per card as a data URI */
function svgPlaceholder(id, w = 180, h = 252){
  const palette = ['#4f8ef7','#49c0a7','#f07f73','#c37be2','#e3b341','#7bb6f0','#6ed092','#ef8fb4','#9ad06d','#f2a75c'];
  const bg = palette[id % palette.length];
  const text = `#${id}`;
  const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stop-color="${bg}" stop-opacity="1"/>
         <stop offset="100%" stop-color="#1f2a33" stop-opacity=".9"/>
       </linearGradient>
     </defs>
     <rect width="100%" height="100%" rx="18" fill="url(#g)"/>
     <g fill="rgba(255,255,255,0.18)">
       <circle cx="${w*0.2}" cy="${h*0.25}" r="22"/>
       <circle cx="${w*0.8}" cy="${h*0.7}" r="18"/>
       <circle cx="${w*0.5}" cy="${h*0.5}" r="40"/>
     </g>
     <text x="50%" y="54%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700"
           font-size="42" fill="white">${text}</text>
   </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* Initial render */
renderPage();

