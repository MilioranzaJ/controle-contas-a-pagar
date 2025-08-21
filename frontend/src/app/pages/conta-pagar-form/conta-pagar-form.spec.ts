import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaPagarForm } from './conta-pagar-form';

describe('ContaPagarForm', () => {
  let component: ContaPagarForm;
  let fixture: ComponentFixture<ContaPagarForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaPagarForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaPagarForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
