import { TestBed } from '@angular/core/testing';

import { UserTrailStatusService } from './user-trail-status.service';

describe('UserTrailStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserTrailStatusService = TestBed.get(UserTrailStatusService);
    expect(service).toBeTruthy();
  });
});
