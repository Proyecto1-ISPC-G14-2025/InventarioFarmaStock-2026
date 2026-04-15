# :pill: InventarioFarmaStock-2026
Administrador web de Inventarios para medicamentos. (Modulo Programador Web 2026)

## :pushpin: Descripción
Este proyecto es un Administrador Web de Inventarios para Medicamentos, diseñado para facilitar la gestión eficiente y segura del stock en farmacias o centros de salud. La aplicación permite controlar entradas, salidas, fechas de expiración, y reportes detallados del inventario de medicamentos.
La solución implementa un enfoque moderno y escalable con tecnologías web ampliamente utilizadas.



### :pushpin: Características principales
Gestión completa de medicamentos: agregar, editar, eliminar y actualizar stock.

Control de fechas de expiración con alertas para medicamentos próximos a vencer.

Registro y seguimiento de movimientos de inventario (entradas y salidas).

Panel dashboard con resumen de stock y reportes visuales.

Autenticación y roles de usuario para administrar permisos.

Reportes exportables para auditorías y análisis.

Interfaz responsive adaptable a múltiples dispositivos gracias a Bootstrap.

### :pushpin: Requisitos funcionales de Farmastock

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

### :pushpin: Tecnologías

Stack: Angular (Frontend), Django REST Framework + MySQL (Backend).


### :pushpin: Instalación y configuración 

Clona el repositorio.

Configura el entorno virtual Python e instala dependencias con pip. (pip install mysql-connector-python para conexion a la base de datos)

Configura la base de datos MySQL y variables de entorno para conexión.

Ejecuta migraciones para crear tablas.

Inicia el servidor backend y abre la aplicación desde el navegador.



## :muscle: Integrantes
<br/>
* Nicolas Elias Calmucci - Usuario Github: Eleven1433 / Scrum master - Desarrollador
<br/>
* Cesar Ramiro Ruggieri - Usuario Github: subrami22 - Desarrollador
<br/>
*  - Usuario Github: - Desarrollador
<br/>
*  - Usuario Github:  - Desarrollador
<br/>
* - Usuario Github:  - Desarrollador
<br/>
