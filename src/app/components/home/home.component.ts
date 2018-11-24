import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { ZipCodeService } from '../../services/zip-code.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    loadingData = this.apiService.loadingData;
    zip: any;

    constructor(
        private apiService: ApiService,
        private zipCodeService: ZipCodeService
    ) { }

    ngOnInit() {
    }

    getLocationDetails() {
        console.log(this.zip);
        if (+this.zip && this.zip.length > 0) {
            this.zipCodeService.getLocationDetails(this.zip).subscribe(data => console.log(data));
        } else {
            console.log('not a number');
        }
    }

}
