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
    document.getElementById('note-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newNote = {
            id: db.notes.length + 1,
            title: document.getElementById('note-title').value,
            excerpt: document.getElementById('note-excerpt').value,
            content: document.getElementById('note-content').value,
            image: document.getElementById('note-image').value,
            date: new Date().toISOString().split('T')[0] // Fecha actual
        };
        
        // Agregar la nueva nota al principio del array
        db.notes.push(newNote);
        
        showMessage('Nota publicada exitosamente', 'success');
        document.getElementById('note-form').reset();
        
        // Volver a la página de inicio después de un breve retraso
        setTimeout(() => loadPage('home'), 1500);
    });
}

function showAdminPanel() {
    closeAllMenus();
    loadPage('admin');
}