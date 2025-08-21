import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router'; 
import { FornecedorService } from '../../services/fornecedor.service';
import { NgxMaskDirective } from 'ngx-mask';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgxMaskDirective],
  providers: [FornecedorService],
  templateUrl: './fornecedor-form.html',
  styleUrl: './fornecedor-form.css'
})
export class FornecedorFormComponent implements OnInit { 
  fornecedor: any = {};
  fornecedorId: string | null = null;
  isEditMode = false;

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    this.fornecedorId = this.route.snapshot.paramMap.get('id');

    if (this.fornecedorId) {
      this.isEditMode = true;
     
      this.fornecedorService.buscarPorId(this.fornecedorId).subscribe(dados => {
        this.fornecedor = dados;
      });
    }
  }

  salvar(): void {
    const operacao = this.isEditMode && this.fornecedorId
      ? this.fornecedorService.atualizar(this.fornecedorId, this.fornecedor)
      : this.fornecedorService.salvar(this.fornecedor);

    operacao.subscribe({
      next: () => {
        const message = this.isEditMode ? 'Fornecedor atualizado com sucesso!' : 'Fornecedor criado com sucesso!';
        this.notificationService.show(message);
        this.router.navigate(['/fornecedores']);
      },
      error: (err) => {
        this.notificationService.show('Erro ao salvar fornecedor.', 'error');
        console.error('Erro ao salvar fornecedor:', err);
      }
    });
  }

cancelar(): void {
  this.router.navigate(['/fornecedores']);
}
}