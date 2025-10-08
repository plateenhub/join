
// Simple demo "auth" & cart indicators
function currentUser(){
  try{ return JSON.parse(localStorage.getItem('user')||'null'); }
  catch(e){ return null; }
}
function setUser(u){ localStorage.setItem('user', JSON.stringify(u)); }
function logout(){ localStorage.removeItem('user'); location.href='index.html'; }

function getCart(){ return JSON.parse(localStorage.getItem('cart')||'[]'); }
function setCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }

function updateNav(){
  const u = currentUser();
  const login = document.getElementById('nav-login');
  const reg = document.getElementById('nav-register');
  const dash = document.getElementById('nav-dashboard');
  const logoutBtn = document.getElementById('nav-logout');
  if (u){
    if (login) login.style.display='none';
    if (reg) reg.style.display='none';
    if (logoutBtn){ logoutBtn.style.display='inline-block'; logoutBtn.onclick=logout; }
  }else{
    if (dash) dash.style.display='none';
    if (logoutBtn) logoutBtn.style.display='none';
  }
  const cart = getCart();
  const n = cart.reduce((s,it)=>s + (it.qty||0),0);
  const cc = document.getElementById('cart-count');
  if (cc) cc.textContent = n;
}
document.addEventListener('DOMContentLoaded', updateNav);

// Featured grid on index
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const data = getProducts().slice(0,6);
  grid.innerHTML = data.map(p => cardHTML(p)).join('');
});

// Product listing page
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const initialCat = params.get('cat')||'';
  const catSel = document.getElementById('category');
  if (initialCat && catSel) catSel.value = initialCat;

  function render(){
    const q = document.getElementById('search').value.toLowerCase();
    const cat = document.getElementById('category').value;
    const sort = document.getElementById('sort').value;
    let list = getProducts().filter(p => 
      (!cat || p.category===cat) &&
      (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
    if (sort==='price-asc') list.sort((a,b)=>a.price-b.price);
    if (sort==='price-desc') list.sort((a,b)=>b.price-a.price);
    if (sort==='name-asc') list.sort((a,b)=>a.name.localeCompare(b.name));
    if (sort==='name-desc') list.sort((a,b)=>b.name.localeCompare(a.name));
    grid.innerHTML = list.map(p => cardHTML(p)).join('');
  }
  ['search','category','sort'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', render);
  });
  render();
});

// Product detail page
document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('product-detail');
  if (!wrap) return;
  const id = new URLSearchParams(location.search).get('id');
  const p = getProducts().find(x => String(x.id)===String(id));
  if (!p){ wrap.innerHTML = '<p>Product not found.</p>'; return; }
  wrap.innerHTML = `
    <div><img src="${p.image||'Images/electronics_category_logo.png'}" alt="${p.name}" style="border-radius:16px;"></div>
    <div>
      <h2>${p.name}</h2>
      <p class="muted">${p.category}</p>
      <p class="price">$${p.price.toFixed(2)}</p>
      <p>${p.description}</p>
      <p><strong>In stock:</strong> ${p.stock}</p>
      <button class="btn" id="add">Add to Cart</button>
    </div>`;
  document.getElementById('add').onclick = () => addToCart(p);
});

// Common card UI
function cardHTML(p){
  return `<div class="card">
    <img src="${p.image||'Images/electronics_category_logo.png'}" alt="${p.name}">
    <h4>${p.name}</h4>
    <p class="muted">${p.category}</p>
    <p><strong>$${p.price.toFixed(2)}</strong></p>
    <div style="display:flex;gap:8px">
      <a class="btn small" href="product.html?id=${p.id}">View</a>
      <button class="btn small" onclick='addToCartById(${JSON.stringify(p.id)})'>Add</button>
    </div>
  </div>`;
}

function addToCartById(id){
  const p = getProducts().find(x=>String(x.id)===String(id));
  if (p) addToCart(p);
}
function addToCart(p){
  const cart = getCart();
  const i = cart.findIndex(x=>x.id===p.id);
  if (i>=0) cart[i].qty += 1;
  else cart.push({id:p.id, name:p.name, price:p.price, qty:1});
  setCart(cart);
  updateNav();
  alert('Added to cart');
}

