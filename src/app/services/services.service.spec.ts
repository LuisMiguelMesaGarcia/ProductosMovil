import { TestBed } from '@angular/core/testing';

import { SERVICESService } from './services.service';

describe('SERVICESService', () => {
  let service: SERVICESService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SERVICESService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
