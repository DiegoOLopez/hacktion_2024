import { TestBed } from '@angular/core/testing';

import { RequestSentenceService } from './request-sentence.service';

describe('RequestSentenceService', () => {
  let service: RequestSentenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestSentenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
