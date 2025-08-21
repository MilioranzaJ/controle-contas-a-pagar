import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../../services/fornecedor.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-fornecedor-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxMaskPipe],
  providers: [FornecedorService],
  templateUrl: './fornecedor-list.html',
  styleUrl: './fornecedor-list.css'
})
export class FornecedorListComponent implements OnInit {
  fornecedores: any[] = [];

  constructor(private fornecedorService: FornecedorService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    this.fornecedorService.listar().subscribe((dados: any[]) => {
      this.fornecedores = dados;
    });
  }

deletarFornecedor(id: string): void {
    const confirmacao = confirm('Tem certeza que deseja deletar este fornecedor? Esta ação não pode ser desfeita.');

    if (confirmacao) {
      this.fornecedorService.deletar(id).subscribe({
        next: () => {
          // Usando o serviço de notificação para dar feedback ao usuário
          this.notificationService.show('Fornecedor excluído com sucesso!');
          this.carregarFornecedores();
        },
        error: (err) => {
          // Feedback de erro também
          this.notificationService.show('Erro ao excluir fornecedor.', 'error');
          console.error('Erro ao deletar fornecedor:', err);
        }
      });
    }
  }
}