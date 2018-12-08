import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

import * as keys from '../../api-keys';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    keys = keys.default;

    constructor(
        private apiService: ApiService
    ) { }

    getFiveDayForecast(lat: number, long: number): Observable<any> {
        return this.apiService.get(
            `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=5&APPID=${this.keys.weatherAPI}`, undefined
        );
    }
}
