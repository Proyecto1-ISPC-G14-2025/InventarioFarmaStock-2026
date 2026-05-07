[![Última actualización](https://img.shields.io/github/last-commit/Proyecto1-ISPC-G14-2025/InventarioFarmaStock-2026/main?label=Última%20actualización&color=green)](https://github.com/Proyecto1-ISPC-G14-2025/InventarioFarmaStock-2026/commits/main)

# :pill: InventarioFarmaStock-2026
Administrador web de Inventarios para medicamentos. (Modulo Programador Web 2026)

## 1. Descripción del Proyecto
Descripción del proyecto
Farmastock es un administrador web de inventarios de medicamentos diseñado para facilitar la gestión eficiente, segura y organizada del stock en farmacias, hospitales y centros de salud. La aplicación permite controlar ingresos, egresos, fechas de vencimiento y generar reportes detallados del inventario, ayudando a mejorar el seguimiento de los medicamentos y la toma de decisiones. Su desarrollo se basa en una arquitectura web moderna, escalable y adaptada a las necesidades del sector salud.

## Características principales
Gestión completa de medicamentos: agregar, editar, eliminar y actualizar stock.

Control de fechas de expiración con alertas para productos próximos a vencer.

Registro y seguimiento de movimientos de inventario, como entradas y salidas.

Panel tipo dashboard con resumen del stock y reportes visuales.

Autenticación de usuarios y control de roles y permisos.

Generación de reportes exportables para auditorías y análisis.

Interfaz responsive adaptable a distintos dispositivos gracias a Bootstrap.

## 2.Instalación y configuración del Proyecto

COMPLETAR para front y back  

## 3.Requisitos funcionales y no funcionales del Proyecto

## Requisitos funcionales de Farmastock

| Código | Descripción |
|--------|-------------|
| RF‑1   | Registrar productos en stock: el sistema permitirá registrar nuevos productos (medicamentos, insumos, etc.) indicando nombre, código de barras, categoría, laboratorio, precio de compra, precio de venta, stock inicial y fecha de vencimiento (si aplica). |
| RF‑2   | Gestionar entradas y salidas de stock: el sistema permitirá registrar entradas (compras, devoluciones al stock) y salidas (ventas, merma, devoluciones a proveedor), actualizando automáticamente el stock disponible y el historial de movimientos por producto. |
| RF‑3   | Consultar y filtrar inventario: el sistema permitirá al usuario consultar el inventario actual, buscando productos por nombre, código de barras, categoría o lote, y mostrando cantidad disponible, precio y estado (por ejemplo, “bajo stock”, “vencido”). |
| RF‑4   | Generar alertas de stock bajo: el sistema identificará productos que se encuentren por debajo de un nivel mínimo predefinido y mostrará alertas en pantalla, además de poder enviar notificaciones al encargado de compras o al administrador. |
| RF‑5   | Generar reportes de stock y movimientos: el sistema permitirá generar reportes de inventario por fecha, por categoría o por proveedor, incluyendo cantidades actuales, movimientos de entrada/salida y valor total aproximado del stock. |

## Requisitos no funcionales de Farmastock

| Código | Descripción |
|--------|-------------|
| RNF‑1  | Desempeño y tiempos de respuesta: el sistema debe mostrar resultados de búsqueda y reportes en menos de 2 segundos, incluso con un inventario de varios miles de productos y movimientos. |
| RNF‑2  | Seguridad y control de accesos: el sistema debe asegurar que solo usuarios autorizados puedan realizar altas, bajas o modificaciones importantes en el stock, mediante un sistema de roles (por ejemplo: administrador, encargado de compras, cajero). |
| RNF‑3  | Copias de seguridad y disponibilidad: el sistema debe permitir respaldar la base de datos de Farmastock de forma automática cada 24 horas y garantizar que el servicio esté disponible al menos el 98 % de la semana laboral. |

## 4.Tecnologías

* Frontend: Angular
* Backend: Python y Django Rest Framework
* Base de Datos: MySQL
* Estilos: CSS3 y Bootstrap



