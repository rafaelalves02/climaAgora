import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { WeatherServiceService } from '../services/weather-service.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-weather-panel',
  imports: [MenuComponent, CommonModule, FooterComponent],
  templateUrl: './weather-panel.component.html',
  styleUrl: './weather-panel.component.css'
})
export class WeatherPanelComponent {

  constructor(private weatherService: WeatherServiceService) { }

  locations: any;
  selectedLocation: any;
  weatherData: any;
  metricUnit: any;
  isCelsius: string = '';
  cityWeather: string = '';
  dayNight: string = '';
  weather:string = '';

  ngOnInit() {

    const horaAtual = new Date().getHours();

    if(horaAtual > 18 || horaAtual < 6) {
      this.dayNight = 'night';
    }
    else {
      this.dayNight = 'day';
    }
  }

  receberDados(event: { locations: any[]; unit: string}){
    this.locations = event.locations;
    this.metricUnit = event.unit;
  }

  obterClima(location: any){
    this.selectedLocation = location;

    this.weatherService.getWeather(location.lat, location.lon, this.metricUnit).subscribe(data => {
      this.weatherData = data;

      console.log(data);

      this.weather = this.traduzirClima(this.weatherData?.weather[0]?.main)
    });

    if(this.metricUnit == 'standard') {
      this.isCelsius = 'F';
    }
    else {
      this.isCelsius = 'C';
    }

    this.locations = '';

  }

  traduzirClima(descricao: string): string {

    const traducoes: { [key: string]: string } = {
      Clear: 'Céu limpo',
      Clouds: 'Nublado',
      Rain: 'Chuva',
      Snow: 'Neve',
      Haze: 'Neblina',
      Thunderstorm: 'Trovoada',
      Drizzle: 'Garoa',
      Mist: 'Névoa'
    };

    return traducoes[descricao] || descricao;

  }
}
