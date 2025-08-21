import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importe FormsModule
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ContaPagar, ContaPagarService } from '../../services/conta-pagar.service';
import { FornecedorService } from '../../services/fornecedor.service'; // Importe
import { CategoriaService } from '../../services/categoria.service';   // Importe
import { filter } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-conta-pagar-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Adicione FormsModule
  templateUrl: './conta-pagar-list.html',
  styleUrl: './conta-pagar-list.css'
})
export class ContaPagarListComponent implements OnInit {
  contas: any[] = [];
  
  // Propriedades para os dropdowns dos filtros
  categorias: any[] = [];
  fornecedores: any[] = [];

  // Propriedades para armazenar os valores selecionados nos filtros
  filtroStatus: string | null = null;
  filtroCategoriaId: string = ''; // '' representa 'Todos'
  filtroFornecedorId: string = ''; // '' representa 'Todos'

  constructor(
    private contaPagarService: ContaPagarService,
    private categoriaService: CategoriaService,
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.carregarDadosParaFiltros();
    
    this.route.paramMap.subscribe(() => {
      this.filtroStatus = this.route.snapshot.paramMap.get('status');
      this.carregarContas();
    });
  }

  carregarDadosParaFiltros(): void {
    this.categoriaService.listar().subscribe(dados => this.categorias = dados);
    this.fornecedorService.listar().subscribe(dados => this.fornecedores = dados);
  }

  carregarContas(): void {
    const filtros = {
      status: this.filtroStatus,
      categoriaId: this.filtroCategoriaId,
      fornecedorId: this.filtroFornecedorId
    };
    this.contaPagarService.listar(filtros).subscribe(dados => {
      this.contas = dados;
    });
  }

  // Este método é chamado sempre que um filtro é alterado no HTML
  aplicarFiltros(): void {
    this.carregarContas();
  }

  marcarComoPaga(conta: any): void {
    const confirmacao = confirm(`Tem certeza que deseja marcar a conta "${conta.descricao}" como paga?`);
    if (confirmacao) {
      this.contaPagarService.marcarComoPaga(conta.id).subscribe({
        next: () => {
          // 3. CHAME A NOTIFICAÇÃO
          this.notificationService.show('Conta marcada como paga com sucesso!');
          this.carregarContas();
        },
        error: (err) => {
          this.notificationService.show('Erro ao marcar conta como paga.', 'error');
          console.error('Erro ao marcar como paga:', err);
        }
      });
    }
  }

deletarConta(id: string): void {
    if (confirm('Tem certeza que deseja deletar esta conta?')) {
      this.contaPagarService.deletar(id).subscribe({
        next: () => {
          // 4. CHAME A NOTIFICAÇÃO
          this.notificationService.show('Conta excluída com sucesso!');
          this.carregarContas();
        },
        error: (err) => {
          this.notificationService.show('Erro ao excluir conta.', 'error');
          console.error('Erro ao deletar conta:', err);
        }
      });
    }
  }
}