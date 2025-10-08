
function readForm(){
  return {
    name: document.getElementById('p-name').value.trim(),
    description: document.getElementById('p-desc').value.trim(),
    category: document.getElementById('p-cat').value,
    price: parseFloat(document.getElementById('p-price').value || '0'),
    stock: parseInt(document.getElementById('p-stock').value || '0', 10),
    image: document.getElementById('p-img').value.trim()
  };
}
function fillForm(p){
  document.getElementById('p-name').value = p.name;
  document.getElementById('p-desc').value = p.description;
  document.getElementById('p-cat').value = p.category;
  document.getElementById('p-price').value = p.price;
  document.getElementById('p-stock').value = p.stock;
  document.getElementById('p-img').value = p.image || '';
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');
  if (!form) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  let list = getProducts();
  let editing = null;
  if (id){
    editing = list.find(p => String(p.id)===String(id));
    if (editing) fillForm(editing);
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = readForm();
    if (editing){
      Object.assign(editing, data);
    } else {
      const newId = Date.now();
      list.push({ id: newId, ...data });
    }
    setProducts(list);
    alert('Saved ✅');
    location.href = 'dashboard.html';
  });
});
