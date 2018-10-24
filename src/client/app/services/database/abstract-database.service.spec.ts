import { TestBed, inject } from '@angular/core/testing';

import { AbstractDatabaseService } from './abstract-database.service';

describe('AbstractDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbstractDatabaseService]
    });
  });

  it('should be created', inject([AbstractDatabaseService], (service: AbstractDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
