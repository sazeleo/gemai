// ── Nav scroll effect ───────────────────────────────
window.addEventListener('scroll', () => {
  document.querySelector('.nav').classList.toggle('scrolled', window.scrollY > 40);
});

// ── Collection data ─────────────────────────────────
const gems = [
  { name: 'Princess Diamond',    type: 'diamond',  carat: '1.82ct', price: '$18,400', icon: '💎' },
  { name: 'Oval Diamond',        type: 'diamond',  carat: '2.10ct', price: '$24,200', icon: '💎' },
  { name: 'Blue Sapphire',       type: 'sapphire', carat: '3.40ct', price: '$31,000', icon: '🔷' },
  { name: 'Padparadscha Sapp.',  type: 'sapphire', carat: '2.95ct', price: '$44,500', icon: '🔷' },
  { name: 'Ceylon Sapphire',     type: 'sapphire', carat: '4.10ct', price: '$28,800', icon: '🔷' },
  { name: 'Burmese Ruby',        type: 'ruby',     carat: '1.65ct', price: '$38,000', icon: '🔴' },
  { name: 'Mozambique Ruby',     type: 'ruby',     carat: '2.20ct', price: '$27,500', icon: '🔴' },
  { name: 'Colombian Emerald',   type: 'emerald',  carat: '3.50ct', price: '$52,000', icon: '🟢' },
  { name: 'Zambian Emerald',     type: 'emerald',  carat: '2.80ct', price: '$33,600', icon: '🟢' },
  { name: 'Muzo Emerald',        type: 'emerald',  carat: '1.95ct', price: '$29,000', icon: '🟢' },
  { name: 'Radiant Diamond',     type: 'diamond',  carat: '3.05ct', price: '$61,000', icon: '💎' },
  { name: 'Pear Sapphire',       type: 'sapphire', carat: '2.55ct', price: '$22,400', icon: '🔷' },
];

function renderCollection(filter = 'all') {
  const grid = document.getElementById('collection-grid');
  const filtered = filter === 'all' ? gems : gems.filter(g => g.type === filter);

  grid.innerHTML = filtered.map(g => `
    <div class="coll-card" data-type="${g.type}">
      <div class="coll-card-img">${g.icon}</div>
      <div class="coll-card-body">
        <div class="coll-type">${g.type}</div>
        <h4>${g.name}</h4>
        <div class="coll-card-footer">
          <span class="coll-price">${g.price}</span>
          <span class="coll-carat">${g.carat}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Card click → scroll to appointment
  grid.querySelectorAll('.coll-card').forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
      showToast('Added to viewing request');
    });
  });
}

// ── Filter buttons ──────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCollection(btn.dataset.filter);
  });
});

renderCollection();

// ── Appointment form ────────────────────────────────
document.getElementById('appt-form').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Appointment request sent! We\'ll be in touch within 24 hours.');
  e.target.reset();
});

// ── Toast ────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Hamburger (mobile) ───────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  if (links.style.display === 'flex') {
    links.style.display = '';
  } else {
    links.style.cssText = 'display:flex; flex-direction:column; position:absolute; top:64px; left:0; right:0; background:#0a0a0b; padding:1.5rem 5%; gap:1.5rem; border-bottom:1px solid #2a2a35;';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links').style.display = '';
  });
});
