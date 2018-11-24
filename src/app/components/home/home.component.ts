import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    loadingData = this.apiService.loadingData;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit() {
    }

}
