import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-fornecedor-detalhes',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxMaskPipe],
  templateUrl: './fornecedor-detalhes.component.html',
  styleUrl: './fornecedor-detalhes.component.css'
})
export class FornecedorDetalhesComponent implements OnInit {
  fornecedor: any = null;

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fornecedorService.buscarPorId(id).subscribe(dados => {
        this.fornecedor = dados;
      });
    }
  }
}