const price = 38.50;
let quantity = 1;
let cart = 0;

const qtyEl = document.getElementById('qty');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartItems = document.getElementById('cartItems');
const overlay = document.getElementById('cartOverlay');
const toast = document.getElementById('toast');
const nav = document.getElementById('nav');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');

document.querySelectorAll('[data-qty]').forEach(btn => {
  btn.addEventListener('click', () => {
    quantity = Math.max(1, Math.min(30, quantity + Number(btn.dataset.qty)));
    qtyEl.textContent = quantity;
  });
});

function renderCart() {
  cartCount.textContent = cart;
  cartTotal.textContent = `€${(cart * price).toFixed(2)}`;
  cartItems.innerHTML = cart ? `
    <div class="cart-line">
      <img src="assets/product-hero.png" alt="">
      <div class="cart-line-info">
        <b>NoCreo 297 Signature Cap</b>
        <small>Black & Gold · Qty ${cart}</small>
      </div>
      <strong>€${(cart * price).toFixed(2)}</strong>
    </div>` : `<p style="color:#777;font-size:13px;line-height:1.7">Your bag is empty. Add the 297 Signature Cap to begin.</p>`;
}

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

document.getElementById('addToCart').addEventListener('click', () => {
  cart += quantity;
  renderCart();
  overlay.classList.add('open');
  showToast();
});

document.getElementById('openCart').addEventListener('click', () => overlay.classList.add('open'));
document.getElementById('closeCart').addEventListener('click', () => overlay.classList.remove('open'));
overlay.addEventListener('click', e => {
  if (e.target === overlay) overlay.classList.remove('open');
});

document.getElementById('checkout').addEventListener('click', () => {
  if (!cart) return;
  alert('Connect this checkout button to your payment provider before publishing.');
});

document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => item.classList.toggle('open'));
});

document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImage.src = card.dataset.full;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  setTimeout(() => { lightboxImage.src = ''; }, 250);
}

document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    overlay.classList.remove('open');
  }
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

renderCart();

// Responsive mobile/tablet navigation
const mobileMenu = document.getElementById('mobileMenu');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');

function showMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  openMenu?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function hideMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  openMenu?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

openMenu?.addEventListener('click', showMobileMenu);
closeMenu?.addEventListener('click', hideMobileMenu);
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) hideMobileMenu();
});
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', hideMobileMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) hideMobileMenu();
});
