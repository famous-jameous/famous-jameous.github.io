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

/* Create 150 "cards" worth of data */
const cards = Array.from({ length: TOTAL_CARDS }, (_, idx) => {
  const id = idx + 1;
  return {
    id,
    name: `Joker ${id}`,
    rarity: pickRarity(id),
    // Use a generated SVG placeholder or a real asset path
    image: USE_LOCAL_IMAGES ? LOCAL_IMAGE_PATH(id) : svgPlaceholder(id),
    description: sampleDescription(id)
  };
});

/* Renders current page into the grid */
function renderPage() {
  const start = (currentPage - 1) * CARDS_PER_PAGE;
  const slice = cards.slice(start, start + CARDS_PER_PAGE);

  grid.innerHTML = ''; // clear

  slice.forEach(card => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <div class="card-info"><strong>${card.name}</strong> • ${card.rarity}<br>${card.description}</div>
    `;
    grid.appendChild(el);
  });

  pageLabel.textContent = `Page ${currentPage}/${TOTAL_PAGES}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === TOTAL_PAGES;
}

/* Pagination handlers */
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < TOTAL_PAGES) {
    currentPage++;
    renderPage();
  }
});

/* Also support keyboard arrows */
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

/* Helpers */
/* Fun rarity cycle */
function pickRarity(i){
  const pool = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  return pool[i % pool.length];
}

/* Lightweight sample text */
function sampleDescription(i){
  const effects = [
    'Boost next hand',
    'Upgrades discarded hand',
    'Doubles a random bonus',
    'Adds chips to straights',
    'Extra wild on flush',
    'Mult for pairs',
    'Copy last bonus',
    'Convert 1 card to wild',
    'Reroll shop discount',
    'Protects streak'
  ];
  return effects[i % effects.length];
}

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

