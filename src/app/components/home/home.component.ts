import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { TrailsService } from '../../services/trails.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    loadingData = this.apiService.loadingData;
    zip: string;
    distance: string;

    constructor(
        private apiService: ApiService,
        private trailsService: TrailsService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        console.log(this.authService.authState);
    }

    // getLocationDetails() {
    //     console.log(this.zip);
    //     if (+this.zip && this.zip.length > 0) {
    //         this.trailsService.getTrailsByZip(this.zip, this.distance ? this.distance : undefined).subscribe(data => console.log(data));
    //     } else {
    //         console.log('not a number');
    //     }
    // }

    goToTrailsList() {
        if ((+this.zip && this.zip.length > 0) && (+this.distance && this.distance.length > 0)) {
            this.router.navigate(['trails', {zip: this.zip, distance: this.distance}]);
        } else if (+this.zip && this.zip.length > 0) {
            this.router.navigate(['trails', {zip: this.zip}]);
        }
    }

}
