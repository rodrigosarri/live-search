import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LiveSearchService } from './live-search.service';

describe('LiveSearchService', () => {
  let service: LiveSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(LiveSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
