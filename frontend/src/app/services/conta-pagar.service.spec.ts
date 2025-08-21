import { TestBed } from '@angular/core/testing';

import { ContaPagar } from './conta-pagar';

describe('ContaPagar', () => {
  let service: ContaPagar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaPagar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
