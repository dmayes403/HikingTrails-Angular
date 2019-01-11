// https://medium.com/codingthesmartway-com-blog/firebase-cloud-storage-with-angular-394566fd529
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog} from '@angular/material';
import { Subject } from 'rxjs';
// import { storage } from 'firebase/app';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import { WeatherService } from '../../services/weather.service';
import { TrailsService } from '../../services/trails.service';

import { Forecast } from '../../interfaces/forecast';
import { Weather } from '../../interfaces/weather';
import { Trail } from '../../interfaces/trail';

import { ForecastDialogComponent } from '../forecast-dialog/forecast-dialog.component';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

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

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    constructor(
        private weatherService: WeatherService,
        private afStorage: AngularFireStorage,
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
                this.trail = trail[0];
                return this.weatherService.getFiveDayForecast(this.trail.latitude, this.trail.longitude);
            }),
            tap((weather: Weather) => {
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
            },
            minWidth: '275px'
        });
    }

    viewRatings(showAll: boolean) {
        const dialogRef = this.dialog.open(RatingDialogComponent, {
            data: {
                trail: this.trail,
                showAll
            }
        });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    upload(event) { // upload an image
        const id = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(event.target.files[0]);
    }
}
