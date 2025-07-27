// Base de datos simulada
const db = {
    users: [
        { username: 'admin', password: 'admin' }
    ],
    notes: [
        {
            id: 1,
            title: 'Avances en la tecnología de inteligencia artificial',
            excerpt: 'La IA continúa transformando industrias enteras con nuevas aplicaciones revolucionarias.',
            content: '<p>La inteligencia artificial ha avanzado a pasos agigantados en los últimos años. Grandes empresas tecnológicas están invirtiendo miles de millones en investigación y desarrollo para crear sistemas cada vez más capaces y autónomos.</p><p>Los últimos modelos de lenguaje como GPT-4 han demostrado capacidades impresionantes en comprensión y generación de texto, mientras que los sistemas de visión por computadora están alcanzando niveles de precisión humana en tareas de identificación de objetos.</p><p>Expertos predicen que en los próximos cinco años veremos aplicaciones de IA en prácticamente todos los sectores económicos, desde la medicina hasta la agricultura, revolucionando la forma en que trabajamos y vivimos.</p>',
            image: 'https://images.unsplash.com/photo-1677442135133-33d364e8d1b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            date: '2023-10-15'
        },
        {
            id: 2,
            title: 'Nuevo récord en energías renovables',
            excerpt: 'Países europeos superan el 50% de generación eléctrica mediante fuentes renovables.',
            content: '<p>En un hito histórico para la energía sostenible, varios países europeos han reportado que más de la mitad de su electricidad proviene ahora de fuentes renovables. Alemania, España y Portugal lideran esta transición con inversiones masivas en energía eólica y solar.</p><p>Los datos muestran que durante el primer semestre de este año, las energías renovables representaron el 52% de la generación eléctrica en la Unión Europea, superando por primera vez a los combustibles fósiles.</p><p>Este logro se produce una década antes de lo previsto en los objetivos climáticos de la UE, lo que ha llevado a los líderes europeos a establecer metas aún más ambiciosas para la próxima década.</p>',
            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
            date: '2023-10-10'
        }
    ]
};

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
    mainContainer: document.getElementById('main-container'),
    overlay: document.getElementById('overlay')
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

// Funciones de página
function loadPage(page, noteId = null) {
    appState.currentPage = page;
    closeAllMenus();
    
    switch (page) {
        case 'home':
            renderHomePage();
            break;
        case 'note':
            if (noteId) {
                const note = db.notes.find(n => n.id === noteId);
                if (note) {
                    appState.currentNote = note;
                    renderNotePage();
                } else {
                    renderHomePage();
                }
            }
            break;
        case 'admin':
            if (appState.isLoggedIn) {
                renderAdminPanel();
            } else {
                renderHomePage();
            }
            break;
        default:
            renderHomePage();
    }
}

// Elimina las funciones de renderizado de notas de este archivo
// (renderHomePage, renderNotePage y cualquier función relacionada con la visualización de notas)

// Mantén solo la gestión de partials, navegación y estado general

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
            window.location.href = 'html/login.html';
        });
    }
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            window.location.href = 'html/register.html';
        });
    }
}

// Cargar todos los partials y luego el contenido dinámico
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        loadPartial('header_contenido', 'html/partials/header.html'),
        loadPartial('footer_contenido', 'html/partials/footer.html'),
        loadPartial('menu_contenido', 'html/menu.html'),
        loadPartial('user_menu_contenido', 'html/user-menu.html')
    ]).then(() => {
        setupMenuListeners();
        setupAuthButtonListeners(); // <-- Agrega los listeners aquí
        if (typeof renderNotas === 'function') {
            renderNotas();
        }
    });
});