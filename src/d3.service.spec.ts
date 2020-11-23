import { TestBed } from '@angular/core/testing';

import { D3Service } from './d3.service';

describe('D3serviceService', () => {
  let service: D3serviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(D3serviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
