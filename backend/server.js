const express = require('express');
const cors = require('cors');
const db = require('./db'); // Asegúrate de que la ruta sea correcta
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Sirve la carpeta 'public' como raíz

// Registrar usuario
app.post('/api/usuarios', async (req, res) => {
    const { NombreCompleto, CorreoElectronico, NombreUsuario, Contraseña } = req.body;
    try {
        await db.execute(
            'INSERT INTO Usuarios (NombreCompleto, CorreoElectronico, NombreUsuario, Contraseña) VALUES (?, ?, ?, ?)',
            [NombreCompleto, CorreoElectronico, NombreUsuario, Contraseña]
        );
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { NombreUsuario, Contraseña } = req.body;
    const [rows] = await db.execute(
        'SELECT * FROM Usuarios WHERE NombreUsuario=? AND Contraseña=?',
        [NombreUsuario, Contraseña]
    );
    if (rows.length > 0) {
        res.json({ success: true, usuario: rows[0] });
    } else {
        res.json({ success: false });
    }
});

// Obtener todas las notas
app.get('/api/notas', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM Notas');
    res.json(rows);
});

// Subir una nota nueva
app.post('/api/notas', async (req, res) => {
    const { Titulo, Contenido } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO Notas (Titulo, Contenido) VALUES (?, ?)',
            [Titulo, Contenido]
        );
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// Subir imagen (solo guarda la ruta en la base de datos)
app.post('/api/imagenes', async (req, res) => {
    const { ID, RutaImagen } = req.body;
    try {
        await db.execute(
            'INSERT INTO Imagenes (ID, Imagen) VALUES (?, ?)',
            [ID, RutaImagen]
        );
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log('API corriendo en puerto 3000'));