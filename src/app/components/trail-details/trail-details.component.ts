import { Component, OnInit } from '@angular/core';
import { TrailsService } from '../../services/trails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-trail-details',
    templateUrl: './trail-details.component.html',
    styleUrls: ['./trail-details.component.scss']
})
export class TrailDetailsComponent implements OnInit {

    constructor(
        private trailsService: TrailsService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.trailsService.getTrailById(this.route.snapshot.params['id']).subscribe(data => console.log(data));
    }

}
