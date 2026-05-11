import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class ContactoComponent {
  // Datos dinámicos (Evitamos Hardcoding)
    tituloPagina = 'Contactate con FarmaStock';
    sucursalCba = {
    direccion: 'Av. Colón 1234, Córdoba Capital',
    telefono: '351-4567890',
    email: 'info@farmastock.com.ar'
    };

  // Formulario Reactivo con validaciones
    formContacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mensaje: new FormControl('', [Validators.required])
    });

    enviarConsulta() {
    if (this.formContacto.valid) {
        console.log('Enviando:', this.formContacto.value);
        alert('¡Consulta enviada con éxito!');
        this.formContacto.reset();
    }
    }
}