import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { WeatherServiceService } from '../services/weather-service.service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Output() weatherInfo = new EventEmitter<{locations: any[], unit: string}>();

  constructor(private weatherService: WeatherServiceService){}
  formBuilder = inject(FormBuilder);

  locationsForm = this.formBuilder.group({
    city: ['', Validators.required]
  });

  metricUnit: string = 'metric';

  //true = celsius false = fahrenheit
  isCelsius: boolean = true;

  weatherData: any;
  locations: any;
  selectedLocation: any;

  obterRegioes(){
    let city = String(this.locationsForm.get('city')?.value);

    this.weatherService.getLatLon(city).subscribe(data => {
      this.locations = data;

      console.log(data);

      this.weatherInfo.emit({
        locations: this.locations,
        unit: this.metricUnit
      });

    });
  }

  changeUnit() {
    this.isCelsius = !this.isCelsius;

    if (this.isCelsius == true) {
      this.metricUnit = 'metric';
    }
    else {
      this.metricUnit = 'standard';
    }
  } 
}
  
