import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { TrailsService } from '../../services/trails.service';

@Component({
    selector: 'app-trails-list',
    templateUrl: './trails-list.component.html',
    styleUrls: ['./trails-list.component.scss']
})
export class TrailsListComponent implements OnInit {
    zip: string;
    distance: string;

    

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
            tap(trails => {
                console.log(trails);
            })
        ).subscribe();
    }

}
