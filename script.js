// === Config ===
const CARDS_PER_PAGE = 15;   // 3 rows × 5 cols
const TOTAL_PAGES = 10;      // 150 cards / 15 per page
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
