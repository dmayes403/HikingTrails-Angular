import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ZipCodeService } from './zip-code.service';
import { ApiService } from './api.service';

import { ZipLocation } from '../interfaces/zip-location';
import { Trail } from '../interfaces/trail';

import { APIKeys } from '../../api-keys';

@Injectable({
    providedIn: 'root'
})
export class TrailsService {
    keys = APIKeys;

    constructor(
        private apiService: ApiService,
        private zipCodeService: ZipCodeService
    ) { }

    getTrailsByZip(zip: string, distance?: string): Observable<Trail[]> {
        return this.zipCodeService.getLocationDetails(zip).pipe(
            switchMap((locationDetails: ZipLocation) => {
                return this.apiService.get(`https://www.hikingproject.com/data/get-trails?lat=${locationDetails.latLng.lat}&lon=${locationDetails.latLng.lng}&maxDistance=${distance ? distance : '10'}&key=${this.keys.hikingAPI}&maxResults=500`, undefined);
            }),
            map((response: {success: number, trails: Trail[]}) => response.trails)
        );
    }

    getTrailById(trailId: string): Observable<Trail[]> {
        return this.apiService.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${trailId}&key=${this.keys.hikingAPI}`, undefined).pipe(
            map((response: {success: number, trails: Trail[]}) => response.trails)
        );
    }

    getTrailsByIds(trailIds: string[]): Observable<Trail[]> {
        return this.apiService.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${trailIds}&key=${this.keys.hikingAPI}`, undefined).pipe(
            map((response: {success: number, trails: Trail[]}) => response.trails)
        );
    }
}