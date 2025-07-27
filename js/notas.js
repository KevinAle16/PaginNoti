// Cargar y mostrar notas desde archivos JSON en la carpeta 'notas'

async function cargarNotas() {
    // Obtén la lista de archivos desde el índice
    const res = await fetch('notas/index.json');
    const archivosNotas = await res.json();

    const notas = [];
    for (const archivo of archivosNotas) {
        try {
            const notaRes = await fetch(`notas/${archivo}`);
            if (notaRes.ok) {
                const nota = await notaRes.json();
                notas.push(nota);
            }
        } catch (err) {
            console.error('Error cargando', archivo, err);
        }
    }
    return notas;
}

async function renderNotas() {
    const container = document.getElementById('main-container');
    if (!container) return;

    const notas = await cargarNotas();
    let html = '<div class="notes-grid">';
    for (const nota of notas) {
        // Supón que la imagen está en 'imagenes/imagen_ID.jpg'
        const imagenRuta = `imagenes/imagen_${nota.ID}.jpg`;
        html += `
            <div class="note-card" data-id="${nota.ID}">
                <img src="${imagenRuta}" alt="${nota.Titulo}" class="note-image">
                <div class="note-content">
                    <h3 class="note-title">${nota.Titulo}</h3>
                    <p class="note-excerpt">${nota.Contenido.substring(0, 100)}...</p>
                    <a href="#" class="read-more">Leer más</a>
                </div>
            </div>
        `;
    }
    html += '</div>';
    container.innerHTML = html;

    // Listener para mostrar nota completa
    document.querySelectorAll('.note-card .read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.note-card');
            const noteId = parseInt(card.dataset.id);
            mostrarNotaCompleta(noteId, notas);
        });
    });
}

function mostrarNotaCompleta(noteId, notas) {
    const nota = notas.find(n => n.ID === noteId);
    if (!nota) return;
    const container = document.getElementById('main-container');
    const imagenRuta = `imagenes/imagen_${nota.ID}.jpg`;
    container.innerHTML = `
        <div class="note-page">
            <button id="back-btn" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> Volver</button>
            <img src="${imagenRuta}" alt="${nota.Titulo}" class="note-page-image">
            <h1 class="note-page-title">${nota.Titulo}</h1>
            <div class="note-page-content">
                ${nota.Contenido}
            </div>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', renderNotas);
}

// Llama a renderNotas() cuando cargue la página principal