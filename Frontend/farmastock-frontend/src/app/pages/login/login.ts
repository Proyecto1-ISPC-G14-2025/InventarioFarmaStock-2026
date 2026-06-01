import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginError = false;
  shaking = false;
  loginForm!: FormGroup;
  usuarios: Record<string, { password: string; role: string }> = {
    'admin@correo.com': { password: 'admin123', role: 'admin' },
    'usuario@correo.com': { password: 'user123', role: 'user' },
  };

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
     
    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          this.passwordConNumero
        ]
      ]
  
    });
  }
 passwordConNumero(control: AbstractControl): ValidationErrors | null {

  const tieneNumero = /\d/.test(control.value);

  return tieneNumero ? null : { sinNumero: true };
}
  onLogin(): void {
    this.loginError = false;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    const user = this.usuarios[email ?? ''];
    if (user && user.password === password) {
      localStorage.setItem('userRole', user.role);
      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (user.role === 'user') {
        this.router.navigate(['/usuario']);
      }
    } else {
      this.loginError = true;
      this.shaking = true;
      setTimeout(() => (this.shaking = false), 500);
    }

  }
  volverHome(): void {
  this.router.navigate(['']);
}
  get email() {

    return this.loginForm.get('email');

  }

  get password() {

    return this.loginForm.get('password');

  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}