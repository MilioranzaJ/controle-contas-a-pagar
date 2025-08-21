import { Routes } from '@angular/router';
import { ContaPagarListComponent } from './pages/conta-pagar-list/conta-pagar-list';
import { ContaPagarFormComponent } from './pages/conta-pagar-form/conta-pagar-form';
import { ContaDetalhesComponent } from './pages/conta-detalhes/conta-detalhes.component';
import { FornecedorListComponent } from './pages/fornecedor-list/fornecedor-list';
import { FornecedorFormComponent } from './pages/fornecedor-form/fornecedor-form';
import { FornecedorDetalhesComponent } from './pages/fornecedor-detalhes/fornecedor-detalhes.component';

export const routes: Routes = [
  
  { path: 'contas', component: ContaPagarListComponent }, 
  { path: 'contas/novo', component: ContaPagarFormComponent },
  { path: 'contas/detalhes/:id', component: ContaDetalhesComponent },
  { path: 'contas/status/:status', component: ContaPagarListComponent }, 
  { path: 'contas/status/vencidas', component: ContaPagarListComponent },
  { path: 'contas/editar/:id', component: ContaPagarFormComponent },

  { path: 'fornecedores', component: FornecedorListComponent },
  { path: 'fornecedores/novo', component: FornecedorFormComponent },
  { path: 'fornecedores/detalhes/:id', component: FornecedorDetalhesComponent },
  { path: 'fornecedores/editar/:id', component: FornecedorFormComponent },

 
  { path: '', redirectTo: '/contas', pathMatch: 'full' },
];