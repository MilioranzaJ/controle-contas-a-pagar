import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ContaPagar, ContaPagarService } from '../../services/conta-pagar.service';

@Component({
  selector: 'app-conta-pagar-list',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  providers: [ContaPagarService],
  templateUrl: './conta-pagar-list.html',
  styleUrl: './conta-pagar-list.css'
})
export class ContaPagarListComponent implements OnInit {
  contas: any[] = [];

  constructor(
    private contaPagarService: ContaPagarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarContas();
  }

  carregarContas(): void {
    this.contaPagarService.listar().subscribe(dados => {
      this.contas = dados;
    });
  }

  marcarComoPaga(conta: any): void {
    const confirmacao = confirm(`Tem certeza que deseja marcar a conta "${conta.descricao}" como paga?`);
    if (confirmacao) {
      this.contaPagarService.marcarComoPaga(conta.id).subscribe({
        next: () => this.carregarContas(),
        error: (err) => console.error('Erro ao marcar como paga:', err)
      });
    }
  }

  deletarConta(id: string): void {
    if (confirm('Tem certeza que deseja deletar esta conta?')) {
      this.contaPagarService.deletar(id).subscribe({
        next: () => this.carregarContas(),
        error: (err) => console.error('Erro ao deletar conta:', err)
      });
    }
  }
}