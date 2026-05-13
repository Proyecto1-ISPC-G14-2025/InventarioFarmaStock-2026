import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Medicamento {
  id?: number;
  nombre: string;
  codigo_barras: string;
  categoria: string;
  lote: string;
  stock_actual: number;
  stock_minimo: number;
  precio_compra: number;
  fecha_expiracion: string;
  proveedor?: number | null;
  proveedor_nombre?: string;
}

export interface Proveedor {
  id: number;
  nombre: string;
  contacto?: string;
  telefono?: string;
  email?: string;
}

const JSON_HEADERS = new HttpHeaders({ 'Accept': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8000/api/medicamentos/';
  private proveedoresUrl = 'http://localhost:8000/api/proveedores/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.apiUrl, { headers: JSON_HEADERS });
  }

  create(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.apiUrl, medicamento, { headers: JSON_HEADERS });
  }

  update(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.apiUrl}${id}/`, medicamento, { headers: JSON_HEADERS });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers: JSON_HEADERS });
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.proveedoresUrl, { headers: JSON_HEADERS });
  }
}