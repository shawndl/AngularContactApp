import { TestBed, inject } from '@angular/core/testing';

import { ValidationErrorsService } from './validation-errors.service';

describe('ValidationErrorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationErrorsService]
    });
  });

  it('should be created', inject([ValidationErrorsService], (service: ValidationErrorsService) => {
    expect(service).toBeTruthy();
  }));
});
