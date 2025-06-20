import { TestBed } from '@angular/core/testing';

import { WeatherServiceService } from '../services/weather-service.service';

describe('WeatherServiceService', () => {
  let service: WeatherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
