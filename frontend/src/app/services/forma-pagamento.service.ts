import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormaPagamentoService {
  private apiUrl = 'http://localhost:3333/api';
  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/formas-pagamento`);
  }
}