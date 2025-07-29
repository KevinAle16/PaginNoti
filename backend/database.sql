CREATE DATABASE IF NOT EXISTS pagNoti CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE pagNoti;

-- Crea tabla de usuarios si no existe
CREATE TABLE IF NOT EXISTS Usuarios (
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    NombreCompleto VARCHAR(255) NOT NULL,
    CorreoElectronico VARCHAR(255) NOT NULL UNIQUE,
    NombreUsuario VARCHAR(255) NOT NULL UNIQUE,
    Contraseña VARCHAR(255) NOT NULL
);

-- Crea tabla de notas si no existe
CREATE TABLE IF NOT EXISTS Notas (
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    UsuarioID INTEGER NOT NULL,
    Titulo TEXT NOT NULL,
    Contenido TEXT NOT NULL,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID) ON DELETE CASCADE
);

-- Crea tabla de imágenes si no existe (relación 1:1 con nota)
CREATE TABLE IF NOT EXISTS Imagenes (
    NotaID INTEGER PRIMARY KEY,
    RutaImagen TEXT NOT NULL,
    FOREIGN KEY (NotaID) REFERENCES Notas(ID) ON DELETE CASCADE
);

-- Crea tabla de favoritos (relación muchos a muchos)
CREATE TABLE IF NOT EXISTS NotasFavoritas (
    UsuarioID INTEGER NOT NULL,
    NotaID INTEGER NOT NULL,
    FechaAgregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UsuarioID, NotaID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID) ON DELETE CASCADE,
    FOREIGN KEY (NotaID) REFERENCES Notas(ID) ON DELETE CASCADE
);
