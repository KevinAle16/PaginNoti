-- Tabla de Usuarios
CREATE TABLE Usuarios (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NombreCompleto TEXT NOT NULL,
    CorreoElectronico TEXT NOT NULL UNIQUE,
    NombreUsuario TEXT NOT NULL UNIQUE,
    Contraseña TEXT NOT NULL
);

-- Tabla de Notas
CREATE TABLE Notas (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Titulo TEXT NOT NULL,
    Contenido TEXT NOT NULL
);

-- Tabla de Imagenes
CREATE TABLE Imagenes (
    ID INTEGER PRIMARY KEY,
    Imagen TEXT NOT NULL,
    FOREIGN KEY(ID) REFERENCES Notas(ID)
);