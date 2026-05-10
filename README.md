
[![Última actualización](https://img.shields.io/github/last-commit/Proyecto1-ISPC-G14-2025/InventarioFarmaStock-2026/main?label=Última%20actualización&color=green)](https://github.com/Proyecto1-ISPC-G14-2025/InventarioFarmaStock-2026/commits/main)
=======
# 💊 InventarioFarmaStock-2026

## Descripción del Proyecto

**FarmaStock** es una aplicación web full-stack que permite controlar el inventario de medicamentos en tiempo real. El sistema permite registrar entradas y salidas de productos, controlar fechas de vencimiento, gestionar usuarios con distintos roles y generar reportes de stock.

La solución implementa una arquitectura moderna con separación clara entre frontend y backend:

- **Frontend**: Angular (SPA con ruteo y componentes reutilizables)
- **Backend**: Django REST Framework (API RESTful con autenticación por roles)
- **Base de datos**: MySQL

---

## Integrantes del equipo

| Nombre | GitHub | Rol |
|--------|--------|-----|
| Nicolas Elias Calmucci | [Eleven1433](https://github.com/Eleven1433) | Scrum Master / Desarrollador |
| Cesar Ramiro Ruggieri | [subrami22](https://github.com/subrami22) | Desarrollador |
| Kevin Agustin Astrada | [Kevin-Astrada](https://github.com/Kevin-Astrada) | Desarrollador |
| Jorgelina Leonora Sapp | [jorgelinasapp](https://github.com/jorgelinasapp) | Desarrolladora |
| Octavio Arnaudo | [OctavioArnaudo](https://github.com/OctavioArnaudo) | Desarrollador |

---

## 📋 Tabla de Requisitos – Funcionales y No Funcionales

| Código      | Tipo      | Requisito (Descripción breve) |
|------------|-----------|---------------------------------|
| RF‑1       | Funcional | La aplicación debe permitir navegar entre las vistas principales (HOME, Dashboard, Quiénes Somos) usando un sistema de ruteo centralizado en Angular (SPA). |
| RF‑2       | Funcional | Desde el Dashboard, el usuario debe poder acceder a sus funcionalidades  manteniendo la navegación SPA. |
| RF‑3       | Funcional | El frontend debe incluir un formulario reactivo para registrar productos, que envíe datos al backend (`POST /api/productos/`) y muestre mensajes según el código de estado (201, 400). |
| RNF‑1      | No funcional | El frontend Angular debe seguir una estructura de carpetas modular y contar con componentes reutilizables, separando claramente lógica y presentación. |
| RNF‑2      | No funcional | Las vistas principales deben cargar de forma rápida, con diseño consistente usando Bootstrap, HTML semántico y formularios reactivos sin hardcoding en el HTML. |

## Estructura del repositorio

```
InventarioFarmaStock-2026/
├── Backend/                  # API con Django REST Framework
│   ├── farmastock/           # Proyecto principal Django
│   ├── inventario/           # App: modelos, vistas, serializers, URLs
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env_modelo           # Variables de entorno de ejemplo
│   └── .gitignore
├── Frontend/                 # Aplicación Angular
│   ├── farmastock-frontend/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/   # Navbar, Footer
│   │   │   │   ├── pages/        # Home, Login, Admin, Usuario
│   │   │   │   ├── app.routes.ts
│   │   │   │   └── app.config.ts
│   │   │   └── assets/img/
│   │   ├── package.json
│   │   └── angular.json
│   ├── .gitignore
│   └── README.md
├── Maqueta/                  # Prototipo HTML estático
└── README.md                 # Este archivo
```

---

## ⚙️ Instrucciones de instalación

### Requisitos previos

- Python 3.10 o superior
- Node.js 18 o superior y npm
- MySQL 8.0 o superior
- Git

---

### Backend (Django REST Framework)

#### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/InventarioFarmaStock-2026.git
cd InventarioFarmaStock-2026/Backend
```

#### 2. Crear y activar entorno virtual

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate
```

#### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

#### 4. Configurar variables de entorno

Copiar el archivo de ejemplo y completar los valores:

```bash
cp .env_modelo .env
```

Editar `.env` con los datos de tu entorno:

```env
SECRET_KEY=tu_clave_secreta_django
DEBUG=True
DB_NAME=farmastock_db
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_HOST=localhost
DB_PORT=3306
```

#### 5. Crear la base de datos en MySQL

```sql
CREATE DATABASE farmastock_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 6. Ejecutar migraciones

```bash
python manage.py migrate
```
#### 7. Crear superusuario para panel de Django

```bash
pytthon manage.py create superuser
```

#### 8. Iniciar el servidor backend

```bash
python manage.py runserver
```

El servidor estará disponible en: `http://localhost:8000`

Endpoint de prueba: `http://localhost:8000/api/medicamentos/`

---

### Frontend (Angular)

#### 1. Ingresar a la carpeta del frontend

```bash
cd InventarioFarmaStock-2026/Frontend/farmastock-frontend
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Iniciar el servidor de desarrollo

```bash
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

---

## Uso básico del sistema

### Rutas disponibles en el Frontend

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page / Home |
| `/login` | Inicio de sesión |
| `/admin` | Panel de administración |
| `/admin-usuarios` | Gestión de usuarios (solo admin) |
| `/usuario` | Vista del usuario regular |

### Credenciales de prueba (desarrollo)

> ⚠️ Estas credenciales son solo para el entorno de desarrollo local. No usar en producción.

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | admin@correo.com | admin123 |
| Usuario | usuario@correo.com | user123 |

### Endpoints del Backend

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/medicamentos/` | Listar todos los medicamentos |
| POST | `/api/medicamentos/` | Crear un medicamento |
| GET | `/api/medicamentos/{id}/` | Obtener un medicamento |
| PUT | `/api/medicamentos/{id}/` | Actualizar un medicamento |
| DELETE | `/api/medicamentos/{id}/` | Eliminar un medicamento |

---

## Tecnologías utilizadas

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | Angular | 19+ |
| Frontend (estilos) | Bootstrap | 5 |
| Backend | Django | 6.0 |
| Backend API | Django REST Framework | 3.17 |
| Base de datos | MySQL | 8.0 |
| Conector Python-MySQL | mysqlclient | 2.2 |
| Variables de entorno | python-dotenv | 1.2 |

---

## Licencia

Proyecto académico — Programación II / Programación Web II / Desarrollo de Software — 2026.

