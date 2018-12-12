import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Forecast } from '../../interfaces/forecast';

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
            longitutde: number,
            latitude: number
        },
        public dialogRef: MatDialogRef<ForecastDialogComponent>
    ) { }

    ngOnInit() {
        console.log(this.data);
    }

}
