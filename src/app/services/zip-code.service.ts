import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ZipCodeService {

    constructor(
        private apiService: ApiService
    ) { }

    // this.apiService.get(`http://open.mapquestapi.com/geocoding/v1/address?key=${this.keys.mapQuestAPI}&location=50010`).subscribe(value => {
    //     console.log(value);
    // });
}
