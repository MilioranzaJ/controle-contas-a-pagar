import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../../services/fornecedor.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';

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

  constructor(private fornecedorService: FornecedorService) {}

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
          console.log('Fornecedor deletado com sucesso!');
          this.carregarFornecedores(); 
        },
        error: (err) => {
          console.error('Erro ao deletar fornecedor:', err);
        }
      });
    }
  }
}