import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Admin } from './pages/admin/admin';
import { Usuario } from './pages/usuario/usuario';
import { AdminUsuarios } from './pages/admin-usuarios/admin-usuarios';

const adminGuard = () => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');

  if (role === 'admin') {
    return true;
  } else {
    router.navigate(['/login']); 
    return false;
  }
};

const userGuard = () => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');

  if (role === 'user') {
    return true;
  } else if (role === 'admin') {
    router.navigate(['/admin']);
    return false;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: 'admin-usuarios', component: AdminUsuarios, canActivate: [adminGuard] },
  
  { path: 'usuario', component: Usuario, canActivate: [userGuard] },
  
  { path: '**', redirectTo: '' }
];