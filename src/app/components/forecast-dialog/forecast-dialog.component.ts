import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Forecast } from '../../interfaces/forecast';
import { ZipCodeService } from '../../services/zip-code.service';

@Component({
    selector: 'app-forecast-dialog',
    templateUrl: './forecast-dialog.component.html',
    styleUrls: ['./forecast-dialog.component.scss']
})
export class ForecastDialogComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            weather: Forecast,
            date: Date,
            location: string
        },
        public dialogRef: MatDialogRef<ForecastDialogComponent>,
        private zipCodeService: ZipCodeService
    ) { }

    ngOnInit() {
        console.log(this.data);
    }

    getTemp(temp: number) {
        const remainder = temp % 1;
        const addedNum = remainder <= .49 ? 0 : 1;
        return Math.floor(temp) + addedNum;
    }
}
