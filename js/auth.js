document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.querySelector('input[placeholder="Username"]').value;
        const password = loginForm.querySelector('input[placeholder="Password"]').value;
  
        // Verifica usuario y contraseña
        if (username === 'admin' && password === '1234') {
          window.location.href = '../html/admin.html'; // o ajusta tu ruta real
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Registro completado');
        window.location.href = './login.html';
      });
    }
  });
  
