import { TestBed } from '@angular/core/testing';

import { AutosaveService } from './autosave.service';

describe('Autosave', () => {
  let service: AutosaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutosaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
