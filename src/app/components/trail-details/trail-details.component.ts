import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Subject } from 'rxjs';

import { WeatherService } from '../../services/weather.service';
import { TrailsService } from '../../services/trails.service';

import { Trail } from '../../interfaces/trail';
import { Weather } from '../../interfaces/weather';
import { ForecastDialogComponent } from '../forecast-dialog/forecast-dialog.component';
import { Forecast } from '../../interfaces/forecast';

@Component({
    selector: 'app-trail-details',
    templateUrl: './trail-details.component.html',
    styleUrls: ['./trail-details.component.scss']
})
export class TrailDetailsComponent implements OnInit, OnDestroy {
    unsubscribe = new Subject();

    trail: Trail;
    weather: Weather;
    today = new Date();

    constructor(
        private weatherService: WeatherService,
        private trailsService: TrailsService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.route.params.pipe(
            takeUntil(this.unsubscribe),
            switchMap(params => {
                return this.trailsService.getTrailById(params['id']);
            }),
            switchMap((trail: Trail[]) => {
                console.log(trail);
                this.trail = trail[0];
                return this.weatherService.getFiveDayForecast(this.trail.latitude, this.trail.longitude);
            }),
            tap((weather: Weather) => {
                console.log(weather);
                this.weather = weather;
            })
        ).subscribe();
    }

    getFullStars(trail: Trail) {
        if (trail) {
            return new Array(Math.floor(trail.stars));
        }
    }

    getHalfStars(trail: Trail) {
        if (trail) {
            if (trail.stars % 1 > .3) {
                return [1];
            } else {
                return [];
            }
        }
    }

    getEmptyStars(trail: Trail) {
        if (trail) {
            const empty = 5 - trail.stars;
            const emptyArr = new Array(Math.floor(empty));
            const remainder = empty % 1;
            const finalArr = remainder >= .7 ? [...emptyArr, 6] : [...emptyArr];
            return finalArr;
        }
    }

    getDate(index: number): Date {
        const today = new Date();
        const daysToAdd = index;
        return new Date(today.setDate(today.getDate() + daysToAdd));
    }

    getTemp(temp: number) {
        const remainder = temp % 1;
        const addedNum = remainder <= .49 ? 0 : 1;
        return Math.floor(temp) + addedNum;
    }

    openWeatherDialog(weather: Forecast, date: Date): void {
        const dialogRef = this.dialog.open(ForecastDialogComponent, {
            data: {
                weather,
                date ,
                location: this.trail.location
            }
        });
    }

    addRating() {}

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
