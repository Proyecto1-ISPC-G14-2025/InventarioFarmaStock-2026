# FarmaStock Frontend

Sistema de gestión de inventario para farmacias. Desarrollado con Angular 21 y Bootstrap 5.

## Requisitos previos

- [Node.js](https://nodejs.org/) v22
- Angular CLI instalado globalmente:

```bash
npm install -g @angular/cli
```

## Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPO>
cd farmastock-frontend
```

2. Instalar dependencias:

```bash
npm install
```

## Uso

Correr el servidor de desarrollo:

```bash
ng serve
```

Luego abrí el navegador en `http://localhost:4200`

## Build para producción

```bash
ng build
```

Los archivos compilados quedan en la carpeta `dist/`.

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   └── footer/
│   └── pages/
│       ├── home/
│       ├── login/
│       ├── admin/
│       ├── admin-usuarios/
│       └── usuario/
├── assets/
│   └── img/
└── styles.css
```

## Credenciales de prueba

| Rol           | Email                  | Contraseña |
|---------------|------------------------|------------|
| Administrador | admin@correo.com       | admin123   |
| Usuario       | usuario@correo.com     | user123    |

