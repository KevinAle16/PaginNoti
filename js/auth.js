document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
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
  
