import { TestBed } from '@angular/core/testing';

import { TranscripcionService } from './transcripcion.service';

describe('TranscripcionService', () => {
  let service: TranscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscripcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
