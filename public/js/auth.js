// Funciones de autenticación
function showLoginForm() {
    const loginForm = `
        <div class="admin-form">
            <h2>Iniciar Sesión</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="username">Usuario</label>
                    <input type="text" class="form-control" id="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" class="form-control" id="password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
            </form>
        </div>
    `;
    
    elements.mainContainer.innerHTML = loginForm;
    
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });
}

function showRegisterForm() {
    const registerForm = `
        <div class="admin-form">
            <h2>Registrar Nueva Cuenta</h2>
            <form id="register-form">
                <div class="form-group">
                    <label for="new-username">Usuario</label>
                    <input type="text" class="form-control" id="new-username" required>
                </div>
                <div class="form-group">
                    <label for="new-password">Contraseña</label>
                    <input type="password" class="form-control" id="new-password" required>
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirmar Contraseña</label>
                    <input type="password" class="form-control" id="confirm-password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Registrarse</button>
            </form>
        </div>
    `;
    
    elements.mainContainer.innerHTML = registerForm;
    
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            showMessage('Las contraseñas no coinciden', 'error');
            return;
        }
        
        // Registro del usuario
        const registroExitoso = await registrarUsuario({ username, password });
        if (registroExitoso) {
            showMessage('Registro exitoso. Ahora puedes iniciar sesión.', 'success');
            setTimeout(() => showLoginForm(), 2000);
        } else {
            showMessage('Error al registrar el usuario. Inténtalo de nuevo.', 'error');
        }
    });
}

async function login(username, password) {
    const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({NombreUsuario: username, Contraseña: password})
    });
    const result = await res.json();
    if (result.success) {
        // Guardar sesión, redirigir, etc.
    } else {
        showMessage('Usuario o contraseña incorrectos', 'error');
    }
}

function logout() {
    appState.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    updateAuthUI();
    closeAllMenus();
    loadPage('home');
    showMessage('Sesión cerrada correctamente', 'success');
}

function updateAuthUI() {
    if (appState.isLoggedIn) {
        elements.authButtons.style.display = 'none';
        elements.userBtn.style.display = 'block';
    } else {
        elements.authButtons.style.display = 'flex';
        elements.userBtn.style.display = 'none';
    }
}

// Muestra el mensaje de error en el main-container
function showMessage(text, type) {
    const container = document.getElementById('main-container');
    if (!container) return;
    // Elimina mensajes previos
    const oldMsg = container.querySelector('.message');
    if (oldMsg) oldMsg.remove();

    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.style.background = 'rgba(200,0,0,0.2)';
    message.style.color = '#900';
    message.style.padding = '1em';
    message.style.margin = '1em 0';
    message.style.borderRadius = '8px';
    message.textContent = text;
    container.prepend(message);

    setTimeout(() => {
        if (message.parentNode) message.remove();
    }, 3000);
}

async function registrarUsuario(datos) {
    const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datos)
    });
    const result = await res.json();
    return result.success;
}