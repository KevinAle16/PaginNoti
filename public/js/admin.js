function renderAdminPanel() {
    const content = `
        <div class="admin-form">
            <h2>Panel de Administración</h2>
            <form id="note-form">
                <div class="form-group">
                    <label for="note-title">Título</label>
                    <input type="text" class="form-control" id="note-title" required>
                </div>
                <div class="form-group">
                    <label for="note-excerpt">Resumen</label>
                    <textarea class="form-control" id="note-excerpt" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label for="note-content">Contenido (HTML permitido)</label>
                    <textarea class="form-control" id="note-content" rows="10" required></textarea>
                </div>
                <div class="form-group">
                    <label for="note-image">URL de la Imagen</label>
                    <input type="text" class="form-control" id="note-image" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Publicar Nota</button>
            </form>
        </div>
    `;
    
    elements.mainContainer.innerHTML = content;
    
    // Event listener para el formulario
    document.getElementById('note-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const Titulo = document.getElementById('note-title').value;
        const Contenido = document.getElementById('note-content').value;

        // Enviar la nota al backend
        const res = await fetch('http://localhost:3000/api/notas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ Titulo, Contenido })
        });
        const result = await res.json();

        if (result.success) {
            showMessage('Nota publicada exitosamente', 'success');
            document.getElementById('note-form').reset();
            setTimeout(() => loadPage('home'), 1500);
        } else {
            showMessage('Error al publicar la nota', 'error');
        }
    });
}

function showAdminPanel() {
    closeAllMenus();
    loadPage('admin');
}