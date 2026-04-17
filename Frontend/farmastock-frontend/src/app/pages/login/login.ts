import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  role = '';
  loginError = false;
  shaking = false;

  usuarios: any = {
    'admin@correo.com': { password: 'admin123', role: 'admin' },
    'usuario@correo.com': { password: 'user123', role: 'user' }
  };

  constructor(private router: Router) {}

  onLogin() {
    const user = this.usuarios[this.email];
    if (user && user.password === this.password && user.role === this.role) {
      this.loginError = false;
      if (this.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/usuario']);
      }
    } else {
      this.loginError = true;
      this.shaking = true;
      setTimeout(() => this.shaking = false, 600);
    }
  }
}