import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

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
    filteredTrails: Trail[];
    pageArr = [];
    activePage = 1;
    filterOptions = [];
    filterType = new FormControl('');

    constructor(
        private route: ActivatedRoute,
        private trailsService: TrailsService,
    ) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => {
                this.zip = params['zip'];
                this.distance = params['distance'];

                return this.trailsService.getTrailsByZip(this.zip, this.distance);
            }),
            tap(response => {
                this.trails = response.trails.filter((trail: Trail) => trail.imgSqSmall);
                this.filteredTrails = this.trails.slice(0, 50);
                console.log(this.trails.length);
                console.log(Math.ceil(this.trails.length / 50));
                for (let i = 1; i <= Math.ceil(this.trails.length / 50); i++) {
                    this.pageArr.push(i);
                }
            })
        ).subscribe();

        this.filterType.valueChanges.pipe(
            takeUntil(this.unsubscribe),
            tap(filterType => {
                console.log(filterType);
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
        console.log(pageNum);
        const endPage = Math.ceil(this.trails.length / 50);
        if (pageNum === -1) {
            this.filteredTrails = this.trails.slice((endPage - 1) * 50, endPage * 50);
            this.activePage = endPage;
        } else if (pageNum < 1 || pageNum > endPage) {
            return;
        } else {
            this.filteredTrails = this.trails.slice((pageNum - 1) * 50, pageNum * 50);
            this.activePage = pageNum;
        }
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}

// ***** Next Step Is to create filters, i.e. for difficulty, rating etc. ******
