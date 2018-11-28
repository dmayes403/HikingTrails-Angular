import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { ZipCodeService } from './zip-code.service';

import { ZipLocation } from '../interfaces/zip-location';

import * as keys from '../../api-keys';

@Injectable({
    providedIn: 'root'
})
export class TrailsService {
    keys = keys.default;

    constructor(
        private apiService: ApiService,
        private zipCodeService: ZipCodeService
    ) { }

    getTrailsByZip(zip: string, distance?: string): Observable<any> {
        return this.zipCodeService.getLocationDetails(zip).pipe(
            switchMap((locationDetails: ZipLocation) => {
                return this.apiService.get(`https://www.hikingproject.com/data/get-trails?lat=${locationDetails.latLng.lat}&lon=${locationDetails.latLng.lng}&maxDistance=${distance ? distance : '10'}&key=${this.keys.hikingAPI}&maxResults=500`, undefined);
            })
        );
    }
}
