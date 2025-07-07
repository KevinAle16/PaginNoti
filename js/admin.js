document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('adminForm');
    const successMessage = document.getElementById('successMessage');

    if (adminForm) {
      adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Noticia subida');
        successMessage.style.display = 'block';
      adminForm.reset();
      window.location.href = 'index.html';
      });
    }
  });
  