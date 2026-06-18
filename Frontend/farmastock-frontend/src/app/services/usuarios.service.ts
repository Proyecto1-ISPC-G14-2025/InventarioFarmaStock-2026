import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Representa la combinación de User + Perfil que devuelve PerfilSerializer.
// Nunca incluye la contraseña real: 'password' es solo de escritura
// (se usa al crear o al cambiar la contraseña, nunca llega en las respuestas GET).
export interface UsuarioSistema {
    id: number;
    username: string;
    email: string;
    nombre: string;
    rol: 'admin' | 'usuario';
    activo: boolean;
    password?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    private apiUrl = 'http://localhost:8000/api/perfiles/';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        });
    }

    getAll(): Observable<UsuarioSistema[]> {
        return this.http.get<UsuarioSistema[]>(this.apiUrl, { headers: this.getAuthHeaders() });
    }

    create(usuario: Partial<UsuarioSistema>): Observable<UsuarioSistema> {
        return this.http.post<UsuarioSistema>(this.apiUrl, usuario, { headers: this.getAuthHeaders() });
    }

    update(id: number, usuario: Partial<UsuarioSistema>): Observable<UsuarioSistema> {
        return this.http.put<UsuarioSistema>(`${this.apiUrl}${id}/`, usuario, { headers: this.getAuthHeaders() });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
    }
}