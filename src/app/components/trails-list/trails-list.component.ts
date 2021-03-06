import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { TrailsService } from '../../services/trails.service';

import { Trail } from '../../interfaces/trail';
import { Subject, combineLatest, of } from 'rxjs';
import { UserTrailStatusService } from '../../services/user-trail-status.service';
import { AuthService } from '../../services/auth.service';
import { TrailStatus } from '../../interfaces/trail-status';

@Component({
    selector: 'app-trails-list',
    templateUrl: './trails-list.component.html',
    styleUrls: ['./trails-list.component.scss']
})
export class TrailsListComponent implements OnInit, OnDestroy {
    unsubscribe = new Subject();

    zip: string;
    distance: string;
    trails: Trail[];
    currentTrails: Trail[];
    filteredTrails: Trail[];
    pageArr = [];
    activePage = 1;
    filterOptions = [];
    filterType = new FormControl('');
    filterOption = new FormControl('');
    completionRate = 0;
    completedCount = 0;
    interestedCount = 0;
    trailStatus: TrailStatus;
    user: any;

    ratingOptions = [
        {desc: 'Highest to Lowest', value: 'desc'},
        {desc: 'Lowest to Highest', value: 'asc'}
    ];

    difficultyOptions = [
        {desc: 'Hard to Easy', value: 'desc'},
        {desc: 'Easy to Hard', value: 'asc'},
    ];

    completionOptions = [
        {desc: 'Completed', value: 'desc'},
        {desc: 'Not Completed', value: 'asc'},
    ];

    InterestedOptions = [
        {desc: 'Interested', value: 'desc'},
        {desc: 'Not Interested', value: 'asc'},
    ];

    constructor(
        private userTrailStatusService: UserTrailStatusService,
        private trailsService: TrailsService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => {
                this.zip = params['zip'];
                this.distance = params['distance'];
                return this.authService.getAuthState();
            }),
            switchMap(authState => {
                this.user = authState;
                return combineLatest(
                    this.trailsService.getTrailsByZip(this.zip, this.distance),
                    authState ? this.userTrailStatusService.getTrailStatusByUserId(authState.uid) :
                        of([])
                );
            }),
            tap((data: [Trail[], TrailStatus]) => {
                this.trails = data[0].filter((trail: Trail) => trail.imgSqSmall);
                this.trailStatus = data[1];

                // this.trails.forEach(trail => {
                //     delete trail._completed;
                //     delete trail._interested;

                //     this.trailStatus.trails.forEach(trailStatus => {
                //         if (trailStatus.trailId === trail.id) {
                //             if (trailStatus.status === 'completed') {
                //                 trail._completed = true;
                //             } else {
                //                 trail._interested = true;
                //             }
                //         }
                //     });
                // });

                this.currentTrails = this.trails;
                this.filteredTrails = this.currentTrails.slice(0, 50);
                for (let i = 1; i <= Math.ceil(this.currentTrails.length / 50); i++) {
                    this.pageArr.push(i);
                }
                this.countCompletedInRange(this.trails, this.trailStatus);
            })
        ).subscribe();

        this.filterType.valueChanges.pipe(
            takeUntil(this.unsubscribe),
            tap(filterType => {
                switch (filterType) {
                    case 'rating':
                        this.filterOptions = this.ratingOptions;
                        break;
                    case 'difficulty':
                        this.filterOptions = this.difficultyOptions;
                        break;
                    case 'completion':
                        this.filterOptions = this.completionOptions;
                        break;
                    case 'interested':
                        this.filterOptions = this.InterestedOptions;
                        break;
                    default:
                        this.filterOptions = [];
                }
            })
        ).subscribe();

        this.filterOption.valueChanges.pipe(
            takeUntil(this.unsubscribe),
            tap(filterOption => {
                switch (this.filterType.value) {
                    case 'rating': {
                        const tempTrails = _.orderBy(this.trails, 'stars', filterOption.value);
                        this.currentTrails = tempTrails;
                        this.filteredTrails = this.currentTrails.slice(0, 50);
                        this.activePage = 1;
                        break;
                    }
                    case 'difficulty':
                        const dblack = [];
                        const black = [];
                        const blueblack = [];
                        const blue = [];
                        const greenblue = [];
                        const green = [];
                        this.trails.forEach(trail => {
                            switch (trail.difficulty.toLowerCase()) {
                                case 'dblack':
                                    dblack.push(trail);
                                    break;
                                case 'black':
                                    black.push(trail);
                                    break;
                                case 'blueblack':
                                    blueblack.push(trail);
                                    break;
                                case 'blue':
                                    blue.push(trail);
                                    break;
                                case 'greenblue':
                                    greenblue.push(trail);
                                    break;
                                case 'green':
                                    green.push(trail);
                                    break;
                            }
                        });
                        if (filterOption.value === 'desc') {
                            this.currentTrails = [...dblack, ...black, ...blueblack, ...blue, ...greenblue, ...green];
                        } else {
                            this.currentTrails = [...green, ...greenblue, ...blue, ...blueblack, ...black, ...dblack];
                        }
                        this.filteredTrails = this.currentTrails.slice(0, 50);
                        this.activePage = 1;
                        break;
                    case 'completion': {
                        const tempTrails = _.orderBy(this.trails, trail => {
                            const foundStatus = _.find(this.trailStatus.trails, trailStatus => {
                                return trailStatus.trailId === trail.id;
                            });

                            if (foundStatus.status === 'completed') {
                                return true;
                            } else {
                                return false;
                            }
                        }, filterOption.value);
                        this.currentTrails = tempTrails;
                        this.filteredTrails = this.currentTrails.slice(0, 50);
                        this.activePage = 1;
                        break;
                    }
                    case 'interested': {
                        const tempTrails = _.orderBy(this.trails, trail => {
                            const foundStatus = _.find(this.trailStatus.trails, trailStatus => {
                                return trailStatus.trailId === trail.id;
                            });

                            if (foundStatus.status === 'interested') {
                                return true;
                            } else {
                                return false;
                            }
                        }, filterOption.value);
                        this.currentTrails = tempTrails;
                        this.filteredTrails = this.currentTrails.slice(0, 50);
                        this.activePage = 1;
                        break;
                    }
                }
            })
        ).subscribe();
    }

    addRecord() {
        this.userTrailStatusService.createStatusRecord({uid: this.user.uid, trails: []});
    }

    countCompletedInRange(searchedTrails: Trail[], trailsStatus: TrailStatus) {
        this.completedCount = 0;
        this.interestedCount = 0;

        searchedTrails.forEach(searchedTrail => {
            trailsStatus.trails.forEach(trailStatus => {
                if (trailStatus.trailId === searchedTrail.id) {
                    if (trailStatus.status === 'completed') {
                        this.completedCount += 1;
                    } else {
                        this.interestedCount += 1;
                    }
                }
            });
        });
        this.completionRate = +((this.completedCount / this.trails.length) * 100).toFixed(2);
    }

    getFullStars(trail: Trail) {
        return new Array(Math.floor(trail.stars));
    }

    getHalfStars(trail: Trail) {
        if (trail.stars % 1 > .3) {
            return [1];
        } else {
            return [];
        }
    }

    getEmptyStars(trail: Trail) {
        const empty = 5 - trail.stars;
        const emptyArr = new Array(Math.floor(empty));
        const remainder = empty % 1;
        const finalArr = remainder >= .7 ? [...emptyArr, 6] : [...emptyArr];
        return finalArr;
    }

    getPageByNum(pageNum: number) {
        const endPage = Math.ceil(this.currentTrails.length / 50);
        if (pageNum === -1) {
            this.filteredTrails = this.currentTrails.slice((endPage - 1) * 50, endPage * 50);
            this.activePage = endPage;
        } else if (pageNum < 1 || pageNum > endPage) {
            return;
        } else {
            this.filteredTrails = this.currentTrails.slice((pageNum - 1) * 50, pageNum * 50);
            this.activePage = pageNum;
        }
    }

    goToTrailDetails(trail: Trail) {
        this.router.navigate(['/trail-details', {id: trail.id}]);
    }

    changeStatus(event: MouseEvent, trailId: number, status: string) {
        event.stopPropagation();
        if (this.trailStatus) {
            let foundIndex;
            const foundTrailStatus = _.find(this.trailStatus.trails, (trail, index) => {
                if (trail.trailId === trailId) {
                    foundIndex = index;
                    return trail;
                }
            });

            if (foundTrailStatus) {
                if (foundTrailStatus.status === status) {
                    this.trailStatus.trails.splice(foundIndex, 1);
                } else {
                    foundTrailStatus.status = status;
                    foundTrailStatus.dateCompleted = new Date();
                    this.trailStatus.trails[foundIndex] = foundTrailStatus;
                }
            } else {
                const trail = {
                    trailId: trailId,
                    status: status,
                };

                if (status === 'completed') {
                    trail['dateCompleted'] = new Date();
                }

                this.trailStatus.trails.push(trail);
            }

            this.userTrailStatusService.updateRecord(this.trailStatus);
        } else {
            const trail = {
                trailId: trailId,
                status: status,
            };

            if (status === 'completed') {
                trail['dateCompleted'] = new Date();
            }
            this.userTrailStatusService.createStatusRecord({uid: this.user.uid, trails: [trail]});
        }

        this.countCompletedInRange(this.trails, this.trailStatus);
    }

    statusAndIdExists(trailId: number, status: string) {
        const foundTrailStatus = _.find(this.trailStatus.trails, (trail, index) => {
            if (trail.trailId === trailId && trail.status === status) {
                return trail;
            }
        });

        if (foundTrailStatus) {
            return true;
        } else {
            return false;
        }
    }

    CRDigits(CR: number) {
        if (CR === 0 || CR === 1 || CR === 2 || CR === 3 || CR === 4 ||
            CR === 5 || CR === 6 || CR === 7 || CR === 8 || CR === 9) {
                return true;
            } else {
                return false;
            }
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}

// ***** Next Step Is to create filters, i.e. for difficulty, rating etc. ******
