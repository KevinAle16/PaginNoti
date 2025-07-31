// Estado de la aplicación
let appState = {
    currentPage: 'home',
    currentNote: null,
    isLoggedIn: false,
    isMenuOpen: false,
    isUserMenuOpen: false
};

// Elementos del DOM
const elements = {
    overlay: document.getElementById('overlay'),
    sidebar: document.getElementById('sidebar'),
    userMenu: document.getElementById('user-menu'),
    menuToggle: document.getElementById('menu-toggle'),
    closeSidebar: document.getElementById('close-sidebar'),
    loginBtn: document.getElementById('login-btn'),
    registerBtn: document.getElementById('register-btn'),
    userBtn: document.getElementById('user-btn'),
    authButtons: document.getElementById('auth-buttons'),
    logoutLink: document.getElementById('logout-link'),
    userLogoutLink: document.getElementById('user-logout-link'),
    adminLink: document.getElementById('admin-link'),
    mainContainer: document.getElementById('main-container')
};

// Funciones de menú
function toggleMenu() {
    appState.isMenuOpen = !appState.isMenuOpen;
    elements.sidebar.classList.toggle('active', appState.isMenuOpen);
    elements.overlay.classList.toggle('active', appState.isMenuOpen);
}

function toggleUserMenu() {
    appState.isUserMenuOpen = !appState.isUserMenuOpen;
    elements.userMenu.classList.toggle('active', appState.isUserMenuOpen);
    elements.overlay.classList.toggle('active', appState.isUserMenuOpen);
}

function closeMenu() {
    appState.isMenuOpen = false;
    elements.sidebar.classList.remove('active');
    elements.overlay.classList.remove('active');
}

function closeUserMenu() {
    appState.isUserMenuOpen = false;
    elements.userMenu.classList.remove('active');
    elements.overlay.classList.remove('active');
}

function closeAllMenus() {
    closeMenu();
    closeUserMenu();
}

// Funciones de navegación (sin renderizado de notas)
function loadPage(page, noteId = null) {
    appState.currentPage = page;
    closeAllMenus();

    switch (page) {
        case 'home':
            // El renderizado de notas se hace en notas.js
            if (typeof renderNotas === 'function') renderNotas();
            break;
        case 'note':
            // El renderizado de nota completa se hace en notas.js
            break;
        case 'admin':
            // El renderizado de admin se hace en admin.js
            break;
        default:
            if (typeof renderNotas === 'function') renderNotas();
    }
}

// Carga los partials (header, footer, etc.) en el DOM
function loadPartial(id, url) {
    return fetch(url)
        .then(res => res.text())
        .then(html => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = html;
        });
}

function setupMenuListeners() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeSidebar = document.getElementById('close-sidebar');

    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }
    if (closeSidebar && sidebar && overlay) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    if (overlay && sidebar) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

function setupAuthButtonListeners() {
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

// Cargar todos los partials y luego el contenido dinámico
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        loadPartial('header_contenido', 'partials/header.html'),
        loadPartial('footer_contenido', 'partials/footer.html'),
        loadPartial('menu_contenido', 'menu.html'),
        loadPartial('user_menu_contenido', 'user-menu.html')
    ]).then(() => {
        setupMenuListeners();
        setupAuthButtonListeners();
        if (typeof renderNotas === 'function') {
            renderNotas();
        }
    });
});