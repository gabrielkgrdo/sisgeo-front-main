import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Servidor } from '../modelos/servidor';


@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Servidor> {
    return this.http.get<Servidor>(`${API_CONFIG.baseUrl}/servidores/${id}`);
  }

  findAll(): Observable<Servidor[]> {
    return this.http.get<Servidor[]>(`${API_CONFIG.baseUrl}/servidores`);
  }

  create(servidor: Servidor): Observable<Servidor> {
    return this.http.post<Servidor>(`${API_CONFIG.baseUrl}/servidores`, servidor);
  }

  update(servidor: Servidor): Observable<Servidor> {
    return this.http.put<Servidor>(`${API_CONFIG.baseUrl}/servidores/${servidor.id}`, servidor);
  } 

  delete(id: any): Observable<Servidor> {
    return this.http.delete<Servidor>(`${API_CONFIG.baseUrl}/servidores/${id}`);
  }
}
