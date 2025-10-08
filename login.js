
document.addEventListener('DOMContentLoaded', () => {
  const reg = document.getElementById('register-form');
  if (reg){
    reg.addEventListener('submit', e => {
      e.preventDefault();
      const user = {
        name: document.getElementById('reg-name').value.trim(),
        email: document.getElementById('reg-email').value.trim(),
      };
      localStorage.setItem('user', JSON.stringify(user));
      alert('Account created. You are now logged in.');
      location.href = 'index.html';
    });
  }
  const login = document.getElementById('login-form');
  if (login){
    login.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const user = { email, name: email.split('@')[0] };
      localStorage.setItem('user', JSON.stringify(user));
      alert('Logged in!');
      location.href = 'index.html';
    });
  }
});
