import { TestBed } from '@angular/core/testing';

import { UtilitiesService } from './my-list.service';

describe('UtilitiesService', () => {
  let service: UtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
