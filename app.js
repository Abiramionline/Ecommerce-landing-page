document.addEventListener('DOMContentLoaded', () => {
  const CART_KEY = 'comfycart_v1';
  let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

  const grid = document.getElementById('products-grid');
  const cartToggle = document.getElementById('cart-toggle');
  const cartClose = document.getElementById('cart-close');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartItemsEl = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');

  const save = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));
  const currency = n => `₹${Number(n).toLocaleString('en-IN')}`;
  const updateCount = () => {
    cartCountEl.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
  };

  const openCart = () => {
    cartDrawer.classList.add('open');
    cartBackdrop.hidden = false;
    cartDrawer.setAttribute('aria-hidden', 'false');
  };
  const closeCart = () => {
    cartDrawer.classList.remove('open');
    cartBackdrop.hidden = true;
    cartDrawer.setAttribute('aria-hidden', 'true');
  };
  cartToggle?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartBackdrop?.addEventListener('click', closeCart);

  const addToCart = ({ id, name, price }) => {
    const existing = cart.find(i => i.id === id);
    if (existing) existing.quantity += 1;
    else cart.push({ id, name, price: Number(price), quantity: 1 });
    save();
    render();
  };
  const changeQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
    save();
    render();
  };
  const removeItem = id => {
    cart = cart.filter(i => i.id !== id);
    save();
    render();
  };

  function render() {
    cartItemsEl.innerHTML = '';
    let total = 0;

    cart.forEach(i => {
      const line = i.price * i.quantity;
      total += line;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item-info">
          <span class="cart-item-name">${i.name}</span>
          <span class="cart-item-meta">${currency(i.price)} × ${i.quantity}</span>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn" data-id="${i.id}" data-delta="-1">−</button>
          <button class="qty-btn" data-id="${i.id}" data-delta="1">+</button>
          <button class="remove-btn" data-id="${i.id}">Remove</button>
        </div>
      `;
      cartItemsEl.appendChild(li);
    });

    cartTotalEl.textContent = currency(total);
    updateCount();

    cartItemsEl.querySelectorAll('.qty-btn').forEach(b => {
      b.addEventListener('click', () => changeQty(b.dataset.id, Number(b.dataset.delta)));
    });
    cartItemsEl.querySelectorAll('.remove-btn').forEach(b => {
      b.addEventListener('click', () => removeItem(b.dataset.id));
    });
  }

  // Event delegation: one listener for all product buttons
  grid?.addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    addToCart({
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: btn.dataset.price
    });
  });

  render();
});