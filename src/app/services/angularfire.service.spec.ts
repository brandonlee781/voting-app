/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AngularfireService } from './angularfire.service';

describe('AngularfireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularfireService]
    });
  });

  it('should ...', inject([AngularfireService], (service: AngularfireService) => {
    expect(service).toBeTruthy();
  }));
});
