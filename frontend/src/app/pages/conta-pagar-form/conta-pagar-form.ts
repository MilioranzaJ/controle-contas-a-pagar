import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { CategoriaService } from '../../services/categoria.service';
import { FormaPagamentoService } from '../../services/forma-pagamento.service';
import { ContaPagarService } from '../../services/conta-pagar.service';
import { NgxMaskDirective } from 'ngx-mask';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-conta-pagar-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgxMaskDirective],
  templateUrl: './conta-pagar-form.html',
  styleUrl: './conta-pagar-form.css'
})
export class ContaPagarFormComponent implements OnInit {
  conta: any = {};
  contaId: string | null = null;
  isEditMode = false;

  fornecedores: any[] = [];
  categorias: any[] = [];
  formasPagamento: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private categoriaService: CategoriaService,
    private formaPagamentoService: FormaPagamentoService,
    private contaPagarService: ContaPagarService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.carregarDropdowns();
    this.contaId = this.route.snapshot.paramMap.get('id');

    if (this.contaId) {
      this.isEditMode = true;
      this.contaPagarService.buscarPorId(this.contaId).subscribe(dados => {
        if (dados.dataVencimento) {
          dados.dataVencimento = new Date(dados.dataVencimento).toISOString().split('T')[0];
        }
        this.conta = dados;
      });
    }
  }

  carregarDropdowns(): void {
    this.fornecedorService.listar().subscribe(dados => this.fornecedores = dados);
    this.categoriaService.listar().subscribe(dados => this.categorias = dados);
    this.formaPagamentoService.listar().subscribe(dados => this.formasPagamento = dados);
  }

  salvar(): void {
    const dadosParaSalvar = {
      descricao: this.conta.descricao,
      valor: parseFloat(String(this.conta.valor).replace('R$ ', '').replace('.', '').replace(',', '.')),
      dataVencimento: this.conta.dataVencimento,
      status: this.conta.status || 'PENDENTE',
      categoriaId: this.conta.categoriaId,
      fornecedorId: this.conta.fornecedorId,
      formaPagamentoId: this.conta.formaPagamentoId,
      observacoes: this.conta.observacoes,
    };

    const operacao = this.isEditMode && this.contaId
      ? this.contaPagarService.atualizar(this.contaId, dadosParaSalvar)
      : this.contaPagarService.salvar(dadosParaSalvar);

operacao.subscribe({
      next: () => {
        // 3. CHAME A NOTIFICAÇÃO DE SUCESSO
        const message = this.isEditMode ? 'Conta atualizada com sucesso!' : 'Conta criada com sucesso!';
        this.notificationService.show(message);
        this.router.navigate(['/contas']);
      },
      error: (err) => {
        // 4. CHAME A NOTIFICAÇÃO DE ERRO
        this.notificationService.show('Erro ao salvar conta.', 'error');
        console.error('Erro ao salvar conta:', err);
      }
    });
  }

  cancelar(): void {
    // CORREÇÃO AQUI
    this.router.navigate(['/contas']);
  }
}