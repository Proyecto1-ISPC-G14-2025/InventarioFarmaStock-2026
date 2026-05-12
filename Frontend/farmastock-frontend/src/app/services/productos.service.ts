import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  proveedor?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8000/api/medicamentos/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.apiUrl);
  }

  create(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.apiUrl, medicamento);
  }

  update(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.apiUrl}${id}/`, medicamento);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}