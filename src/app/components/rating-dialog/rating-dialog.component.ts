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
    userRating = 0;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            trail: Trail,
        },
        public dialogRef: MatDialogRef<RatingDialogComponent>,
    ) { }

    ngOnInit() {
    }

    getFullStars(trail: Trail | number) {
        const starVal = typeof trail === 'number' ? trail : trail.stars;
        if (starVal !== undefined) {
            return new Array(Math.floor(starVal));
        }
    }

    getHalfStars(trail: Trail | number) {
        const starVal = typeof trail === 'number' ? trail : trail.stars;

        if (starVal) {
            if (starVal % 1 > .3) {
                return [1];
            } else {
                return [];
            }
        }
    }

    getEmptyStars(trail: Trail | number) {
        const starVal = typeof trail === 'number' ? trail : trail.stars;

        if (starVal !== undefined) {
            const empty = 5 - starVal;
            const emptyArr = new Array(Math.floor(empty));
            const remainder = empty % 1;
            const finalArr = remainder >= .7 ? [...emptyArr, 6] : [...emptyArr];
            return finalArr;
        }
    }

    setUserRating(userRating: number, index: number) {
        console.log(userRating);
        console.log(index);
        // this.userRating = index;

        if (index > userRating) {
            this.userRating = userRating + index;
        } else {
            this.userRating = index;
        }
    }

}
