import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' 
})
export class InfoWebService {
    
    public footerInfo = {
    sucursal: 'Córdoba Capital, Argentina',
    email: 'contacto@farmastock.com.ar',
    redes: [
        { nombre: 'Instagram', url: 'https://instagram.com/farmastock', icono: 'bi-instagram' },
        { nombre: 'Facebook', url: 'https://facebook.com/farmastock', icono: 'bi-facebook' }
    ]
    };

public homeInfo = {
    bienvenida: '¡Bienvenido a FarmaStock!',
    descripcion: 'Tu plataforma de control de stock.',
    ctaBoton: 'Ver Inventario',
    ctaRuta: '/inventario'
};

public quienesSomosInfo = {
    titulo: 'Nuestra Identidad',
    mision: 'Brindar soluciones farmacéuticas...',
    equipo: [
    { nombre: 'Socio1', rol: 'Desarrollador', bio: '...' },
    { nombre: 'Socio2', rol: 'Socio', bio: '...' }
    ]
};

    public contactoInfo = {
    direccion: 'Av. Colón 1234, Córdoba',
    telefono: '351-4567890',
    horario: 'Lunes a Sábados 08-22hs'
    };

public globalInfo = {
    nombreFarmacia: 'FarmaStock',
    sucursal: 'Av. Colón 123, Córdoba Capital',
    email: 'contacto@farmastock.com',     
    redesSociales: [
        { nombre: 'Instagram', url: 'https://...', icono: 'bi-instagram' },
        { nombre: 'Facebook', url: 'https://...', icono: 'bi-facebook' }
    ],
    copyright: '© 2026 FarmaStock - Todos los derechos reservados.'
};

public menuItems = [
    { label: 'Inicio', path: '' },
    { label: 'Inventario', path: '/inventario' },
    { label: 'Quiénes Somos', path: '/quienes-somos' },
    { label: 'Contacto', path: '/contacto' }
];  

    constructor() { }
}