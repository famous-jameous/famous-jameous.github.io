// === Config ===
const CARDS_PER_PAGE = 15;   // 3 rows × 5 cols
let currentPage = 1;
let cards = [];
let totalPages = 1;

// === Load Card Data ===
fetch('data/cards.json')
  .then(res => res.json())
  .then(data => {
    cards = data; // already an array
    totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);
    renderPage(currentPage);
    setupPagination();
  })
  .catch(err => console.error("Error loading cards:", err));

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
  document.querySelector('#pageLabel').textContent = `Page ${pageNum}/${totalPages}`;

  // enable/disable buttons
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
}
