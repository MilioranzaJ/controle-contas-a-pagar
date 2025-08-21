import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContaPagarService } from '../../services/conta-pagar.service';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-conta-detalhes',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxMaskPipe],
  providers: [ContaPagarService],
  templateUrl: './conta-detalhes.component.html',
  styleUrl: './conta-detalhes.component.css'
})
export class ContaDetalhesComponent implements OnInit {
  conta: any = null;

  constructor(
    private route: ActivatedRoute,
    private contaPagarService: ContaPagarService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contaPagarService.buscarPorId(id).subscribe(dados => {
        this.conta = dados;
      });
    }
  }
}