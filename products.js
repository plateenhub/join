
// Seed data in localStorage
const DEFAULT_PRODUCTS = [
  {id: 101, name: 'Wireless Headphones', category: 'Electronics', price: 59.99, stock: 26, image: 'https://template.canva.com/EAGkBwAKCFU/1/0/1280w-QDux5f_5W6k.jpg', description: 'Bluetooth over-ear headphones with 30h battery life and clear mic.'},
  {id: 102, name: 'Smartwatch Lite', category: 'Electronics', price: 79.00, stock: 18, image: 'https://template.canva.com/EAGqhrtzK80/1/0/1280w-GPbV1OfHVLs.jpg', description: 'Fitness tracking, heart-rate monitor, notifications and 5-day battery.'},
  {id: 201, name: 'Non-stick Pan Set', category: 'Kitchen', price: 42.50, stock: 34, image: 'https://template.canva.com/EAGd-RpE9Ms/1/0/1600w-b7MH24j23io.jpg', description: 'Two-piece pan set with heat-resistant handles and even heating.'},
  {id: 202, name: 'High-Speed Blender', category: 'Kitchen', price: 65.00, stock: 12, image: 'https://template.canva.com/EAFdz_e8U7U/1/0/1600w-BDHx9N4y_YQ.jpg', description: 'Crush ice, make smoothies, and puree soups with 700W motor.'},
  {id: 301, name: 'Yoga Mat Pro', category: 'Sports', price: 24.99, stock: 50, image: 'https://template.canva.com/EAGpk5Jlv9o/1/0/1600w-ZhMOxXEW7yE.jpg', description: 'Non-slip TPE mat with carrying strap for studio or home practice.'},
  {id: 302, name: 'Football Size 5', category: 'Sports', price: 19.99, stock: 40, image: 'https://template.canva.com/EAGm9Jw2_As/1/0/1280w-TsVeZOo3HQE.jpg'}
];
function getProducts(){
  const raw = localStorage.getItem('products');
  if (!raw){
    localStorage.setItem('products', JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
  try{ return JSON.parse(raw); } catch(e){ return [...DEFAULT_PRODUCTS]; }
}
function setProducts(list){ localStorage.setItem('products', JSON.stringify(list)); }

// Admin table render (if present)
document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('#admin-table tbody');
  if (!body) return;
  renderAdminTable();
});
function renderAdminTable(){
  const body = document.querySelector('#admin-table tbody');
  if (!body) return;
  const list = getProducts();
  body.innerHTML = list.map(p => `
    <tr>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>
        <a class="btn small" href="editProductPage.html?id=${p.id}">Edit</a>
        <button class="btn small" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>`).join('');
}
function deleteProduct(id){
  if (!confirm('Delete this product?')) return;
  const list = getProducts().filter(p => p.id !== id);
  setProducts(list);
  renderAdminTable();
}
