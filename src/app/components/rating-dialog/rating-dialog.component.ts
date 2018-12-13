import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Trail } from '../../interfaces/trail';

@Component({
    selector: 'app-rating-dialog',
    templateUrl: './rating-dialog.component.html',
    styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {
    starOptions = [1, 2, 3, 4, 5];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            trail: Trail,
        },
        public dialogRef: MatDialogRef<RatingDialogComponent>,
    ) { }

    ngOnInit() {
    }

    getFullStars(trail: Trail) {
        if (trail) {
            return new Array(Math.floor(trail.stars));
        }
    }

    getHalfStars(trail: Trail) {
        if (trail) {
            if (trail.stars % 1 > .3) {
                return [1];
            } else {
                return [];
            }
        }
    }

    getEmptyStars(trail: Trail) {
        if (trail) {
            const empty = 5 - trail.stars;
            const emptyArr = new Array(Math.floor(empty));
            const remainder = empty % 1;
            const finalArr = remainder >= .7 ? [...emptyArr, 6] : [...emptyArr];
            return finalArr;
        }
    }

}
