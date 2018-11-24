import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { ApiService } from './api.service';

import * as keys from '../../api-keys';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZipLocation } from '../interfaces/zip-location';

@Injectable({
    providedIn: 'root'
})
export class ZipCodeService {
    keys = keys.default;
    constructor(
        private apiService: ApiService
        ) { }

    getLocationDetails(zip: any): Observable<ZipLocation> {
        return this.apiService.get(
            `http://open.mapquestapi.com/geocoding/v1/address?key=${this.keys.mapQuestAPI}&location=${zip}`,
            undefined
        ).pipe(
            map(data => {
                const USLocation = _.find(data.results[0].locations, {'adminArea1': 'US'});
                return USLocation;
            })
        );
    }

    // console.log(data.results[0].locations)
}
