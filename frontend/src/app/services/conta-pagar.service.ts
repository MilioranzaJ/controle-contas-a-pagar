import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// A interface define o "contrato" dos nossos dados de Conta a Pagar
export interface ContaPagar {
  id: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  status: 'PENDENTE' | 'PAGA' | 'VENCIDA';
  fornecedor: {
    nome: string;
  };
  categoria: {
    nome: string;
  };
  formaPagamento?: { // Opcional
    nome: string;
  };
  // Outros campos que a API retorna...
}

@Injectable({
  providedIn: 'root'
})
export class ContaPagarService {
  private apiUrl = 'http://localhost:3333/api';

  constructor(private http: HttpClient) { }

  // Método de listagem que aceita o status da URL e os filtros do formulário
  listar(filtros: any): Observable<ContaPagar[]> {
    let params = new HttpParams();

    // Traduz o status da URL (ex: 'pendentes') para o que o backend espera (ex: 'PENDENTE')
    if (filtros.status) {
        let statusApi: string | undefined;
        if (filtros.status === 'pendentes') {
          statusApi = 'PENDENTE';
        } else if (filtros.status === 'pagas') {
          statusApi = 'PAGA';
        } else if (filtros.status === 'vencidas') {
          statusApi = 'VENCIDA';
        }
        if (statusApi) {
          params = params.append('status', statusApi);
        }
    }
    // Adiciona os outros filtros se eles existirem
    if (filtros.categoriaId) {
      params = params.append('categoriaId', filtros.categoriaId);
    }
    if (filtros.fornecedorId) {
      params = params.append('fornecedorId', filtros.fornecedorId);
    }

    return this.http.get<ContaPagar[]>(`${this.apiUrl}/contas`, { params });
  }

  // Método para buscar uma única conta por ID
  buscarPorId(id: string): Observable<ContaPagar> {
    return this.http.get<ContaPagar>(`${this.apiUrl}/contas/${id}`);
  }

  // Método para criar uma nova conta
  salvar(conta: any): Observable<ContaPagar> {
    return this.http.post<ContaPagar>(`${this.apiUrl}/contas`, conta);
  }

  // Método para atualizar uma conta existente
  atualizar(id: string, conta: any): Observable<ContaPagar> {
    return this.http.put<ContaPagar>(`${this.apiUrl}/contas/${id}`, conta);
  }

  // Método para marcar uma conta como paga (atualização parcial)
  marcarComoPaga(id: string): Observable<ContaPagar> {
    const dados = { status: 'PAGA' };
    return this.http.patch<ContaPagar>(`${this.apiUrl}/contas/${id}`, dados);
  }

  // Método para deletar uma conta
  deletar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/contas/${id}`);
  }
}