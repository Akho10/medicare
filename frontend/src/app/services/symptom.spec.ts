import { TestBed } from '@angular/core/testing';
import { SymptomService } from './symptom';

describe('SymptomService', () => {
  let service: SymptomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymptomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
