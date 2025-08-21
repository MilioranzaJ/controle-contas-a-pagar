import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaDetalhesComponent } from './conta-detalhes.component';

describe('ContaDetalhesComponent', () => {
  let component: ContaDetalhesComponent;
  let fixture: ComponentFixture<ContaDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
