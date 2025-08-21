import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorDetalhesComponent } from './fornecedor-detalhes.component';

describe('FornecedorDetalhesComponent', () => {
  let component: FornecedorDetalhesComponent;
  let fixture: ComponentFixture<FornecedorDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedorDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedorDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
