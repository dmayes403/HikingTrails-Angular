import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { TrailsService } from '../../services/trails.service';

import { Trail } from '../../interfaces/trail';
import { Subject } from 'rxjs';

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
    completionRate = 90;

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
        private trailsService: TrailsService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => {
                this.zip = params['zip'];
                this.distance = params['distance'];

                return this.trailsService.getTrailsByZip(this.zip, this.distance);
            }),
            tap(trails => {
                this.trails = trails.filter((trail: Trail) => trail.imgSqSmall);
                this.currentTrails = this.trails;
                this.filteredTrails = this.currentTrails.slice(0, 50);
                for (let i = 1; i <= Math.ceil(this.currentTrails.length / 50); i++) {
                    this.pageArr.push(i);
                }
            })
        ).subscribe();

        this.filterType.valueChanges.pipe(
            takeUntil(this.unsubscribe),
            tap(filterType => {
                console.log(filterType);
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
                    case 'rating':
                        const tempTrails = _.orderBy(this.trails, 'stars', filterOption.value);
                        this.currentTrails = tempTrails;
                        this.filteredTrails = this.currentTrails.slice(0, 50);
                        this.activePage = 1;
                        break;
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
                    case 'completion':
                        console.log('sorting completion incomplete');
                        break;
                    case 'interested':
                        console.log('sorting interested incomplete');
                        break;
                }
            })
        ).subscribe();
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

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}

// ***** Next Step Is to create filters, i.e. for difficulty, rating etc. ******
