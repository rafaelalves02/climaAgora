import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private httpClient: HttpClient) { }

  private api_key = 'e92160f7321c38e674f41978219e3a02';

  private api_url = 'https://api.openweathermap.org';

  getLatLon(city: string){
    let url = `${this.api_url}/geo/1.0/direct?q=${city},BRL&limit=5&appid=${this.api_key}`;

    return this.httpClient.get(url);
  }

  getWeather(lat: number,lon: number,unit: string){
    let url = `${this.api_url}/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly&units=${unit}&lang=pt&appid=${this.api_key}`;

    return this.httpClient.get(url);
  }
}
