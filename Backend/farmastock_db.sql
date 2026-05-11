-- Script de creación de base de datos FarmaStock
-- MySQL 8.0+

CREATE DATABASE IF NOT EXISTS farmastock_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE farmastock_db;

-- Tabla: proveedores
CREATE TABLE IF NOT EXISTS proveedores (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(200) NOT NULL,
    contacto    VARCHAR(100),
    telefono    VARCHAR(20),
    email       VARCHAR(254)
);

-- Tabla: medicamentos
CREATE TABLE IF NOT EXISTS medicamentos (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    nombre           VARCHAR(200) NOT NULL,
    codigo_barras    VARCHAR(100) NOT NULL UNIQUE,
    categoria        VARCHAR(100) NOT NULL,
    lote             VARCHAR(100) NOT NULL,
    stock_actual     INT NOT NULL DEFAULT 0,
    stock_minimo     INT NOT NULL DEFAULT 5,
    precio_compra    DECIMAL(10, 2) NOT NULL,
    fecha_expiracion DATE NOT NULL,
    proveedor_id     INT,
    CONSTRAINT fk_medicamento_proveedor
        FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
        ON DELETE SET NULL
);

-- Tabla: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    nombre        VARCHAR(200) NOT NULL,
    email         VARCHAR(254) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol           VARCHAR(10) NOT NULL DEFAULT 'usuario',
    activo        TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT chk_rol CHECK (rol IN ('admin', 'usuario'))
);

-- Tabla: movimientos
CREATE TABLE IF NOT EXISTS movimientos (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    tipo            VARCHAR(10) NOT NULL,
    cantidad        INT NOT NULL,
    fecha           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo          VARCHAR(255),
    medicamento_id  INT NOT NULL,
    usuario_id      INT,
    CONSTRAINT fk_movimiento_medicamento
        FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_movimiento_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE SET NULL,
    CONSTRAINT chk_tipo CHECK (tipo IN ('entrada', 'salida'))
);

-- Datos de ejemplo para desarrollo
INSERT INTO proveedores (nombre, contacto, telefono, email) VALUES
('Laboratorio Roemmers', 'Ventas', '0800-222-1234', 'ventas@roemmers.com.ar'),
('Bayer Argentina', 'Distribución', '0800-333-5678', 'dist@bayer.com.ar');

INSERT INTO medicamentos (nombre, codigo_barras, categoria, lote, stock_actual, stock_minimo, precio_compra, fecha_expiracion, proveedor_id) VALUES
('Paracetamol 500mg', '7790040012345', 'Analgésico', 'A-2024-01', 100, 20, 150.00, '2026-12-31', 1),
('Ibuprofeno 400mg',  '7790040067890', 'Antiinflamatorio', 'B-2024-02', 80, 15, 200.00, '2026-10-15', 2),
('Amoxicilina 500mg', '7790040011111', 'Antibiótico', 'C-2024-03', 50, 10, 350.00, '2025-06-30', 1);

INSERT INTO usuarios (nombre, email, password_hash, rol, activo) VALUES
('Administrador', 'admin@farmastock.com', 'hashed_password_aqui', 'admin', 1),
('Juan López',    'jlopez@farmastock.com', 'hashed_password_aqui', 'usuario', 1);