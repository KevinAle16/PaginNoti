document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANTE: espera un poco para que el fetch del header termine
    setTimeout(() => {
      const loginBtn = document.getElementById('loginBtn');
      const registerBtn = document.getElementById('registerBtn');
  
      if (loginBtn) {
        loginBtn.addEventListener('click', () => {
          window.location.href = 'html/login.html';
        });
      }
  
      if (registerBtn) {
        registerBtn.addEventListener('click', () => {
          window.location.href = 'html/register.html';
        });
      }
    }, 300); // Espera 300ms para dar tiempo al fetch del header
  });

fetch ('/html/partials/head.html')
.then (response=>response.text())
.then (data=>document.getElementById('head_contenido').innerHTML=data);

fetch ('html/partials/header.html')
.then (response=>response.text())
.then (data=>document.getElementById('header_contenido').innerHTML=data);

fetch ('html/partials/footer.html')
.then (response=>response.text())
.then (data=>document.getElementById('footer_contenido').innerHTML=data);


  