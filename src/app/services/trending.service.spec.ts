import { TestBed } from '@angular/core/testing';

import { AiringTodayService } from './trending.service';

describe('AiringTodayService', () => {
  let service: AiringTodayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiringTodayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
