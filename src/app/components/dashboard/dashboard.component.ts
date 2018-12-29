import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';

import { UserTrailStatusService } from '../../services/user-trail-status.service';
import { AuthService } from '../../services/auth.service';
import { TrailStatus } from '../../interfaces/trail-status';
import { TrailsService } from '../../services/trails.service';
import { combineLatest } from 'rxjs';
import { Trail } from '../../interfaces/trail';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: any;
    completedTrails: Trail[] = [];
    interestedTrails: Trail[] = [];

    constructor(
        private userTrailStatusService: UserTrailStatusService,
        private trailService: TrailsService,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.authService.getAuthState().pipe(
            switchMap(authState => {
                this.user = authState;

                return this.userTrailStatusService.getTrailStatusByUserId(this.user.uid);
            }),
            switchMap((trailStatus: TrailStatus) => {
                console.log(trailStatus);
                const completedIds = [];
                const interestedIds = [];
                trailStatus.trails.forEach(trail => {
                    if (trail.status === 'completed') {
                        completedIds.push(trail.trailId);
                    } else {
                        interestedIds.push(trail.trailId);
                    }
                });

                return combineLatest(
                    this.trailService.getTrailsByIds(completedIds),
                    this.trailService.getTrailsByIds(interestedIds)
                );
            }),
            tap((data: [Trail[], Trail[]]) => {
                console.log(data);
                this.completedTrails = data[0];
                this.interestedTrails = data[1];
            })
        ).subscribe();
    }

}
