import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { TrailsService } from '../../services/trails.service';
import { Trail } from '../../interfaces/trail';

@Component({
    selector: 'app-trails-list',
    templateUrl: './trails-list.component.html',
    styleUrls: ['./trails-list.component.scss']
})
export class TrailsListComponent implements OnInit {
    zip: string;
    distance: string;
    trails: Trail[];

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
                console.log(response);
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
}
