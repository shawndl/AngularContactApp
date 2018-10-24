import { TestBed, inject } from '@angular/core/testing';

import { AuthTokenInjectorService } from './auth-token-injector.service';

describe('AuthTokenInjectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTokenInjectorService]
    });
  });

  it('should be created', inject([AuthTokenInjectorService], (service: AuthTokenInjectorService) => {
    expect(service).toBeTruthy();
  }));
});
