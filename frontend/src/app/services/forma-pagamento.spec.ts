import { TestBed } from '@angular/core/testing';

import { FormaPagamento } from './forma-pagamento.service';

describe('FormaPagamento', () => {
  let service: FormaPagamento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormaPagamento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
