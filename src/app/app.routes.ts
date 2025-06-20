import { Routes } from '@angular/router';
import { WeatherPanelComponent } from './weather-panel/weather-panel.component';

export const routes: Routes = [
    {path: '', title: 'Clima', component: WeatherPanelComponent}
];
