import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Admin } from './pages/admin/admin';
import { Usuario } from './pages/usuario/usuario';
import { AdminUsuarios } from './pages/admin-usuarios/admin-usuarios';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'admin', component: Admin },
  { path: 'usuario', component: Usuario },
  { path: 'admin-usuarios', component: AdminUsuarios },
  { path: '**', redirectTo: '' }
];