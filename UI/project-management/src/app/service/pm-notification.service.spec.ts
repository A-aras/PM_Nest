import { TestBed, inject } from '@angular/core/testing';

import { PmNotificationService } from './pm-notification.service';

describe('PmNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmNotificationService]
    });
  });

  it('should be created', inject([PmNotificationService], (service: PmNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
