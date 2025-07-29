// Inicializar la aplicación
function initApp() {
    // Verificar estado de autenticación
    const savedAuth = localStorage.getItem('isLoggedIn');
    if (savedAuth === 'true') {
        appState.isLoggedIn = true;
        updateAuthUI();
    }
    
    // Cargar página inicial
    loadPage('home');
    
    // Configurar event listeners
    setupEventListeners();
}

// Configurar event listeners
function setupEventListeners() {
    // Menús
    elements.menuToggle.addEventListener('click', toggleMenu);
    elements.closeSidebar.addEventListener('click', closeMenu);
    elements.userBtn.addEventListener('click', toggleUserMenu);
    elements.overlay.addEventListener('click', closeAllMenus);
    
    // Autenticación
    elements.loginBtn.addEventListener('click', () => showLoginForm());
    elements.registerBtn.addEventListener('click', () => showRegisterForm());
    elements.logoutLink.addEventListener('click', logout);
    elements.userLogoutLink.addEventListener('click', logout);
    
    // Admin
    elements.adminLink.addEventListener('click', showAdminPanel);

    // Redirección a login y registro
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }
}

// Funciones de utilidad
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function showMessage(text, type) {
    // Eliminar mensajes existentes
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insertar mensaje al principio del contenedor principal
    elements.mainContainer.prepend(message);
    
    // Eliminar mensaje después de 3 segundos
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

function updateAuthUI() {
    const adminBtn = document.getElementById('admin-link');
    if (adminBtn) {
        if (appState.isLoggedIn) {
            adminBtn.style.display = 'inline-block';
        } else {
            adminBtn.style.display = 'none';
        }
    }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);