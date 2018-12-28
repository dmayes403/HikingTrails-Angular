import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { TrailStatus } from '../interfaces/trail-status';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserTrailStatusService {

    constructor(
        private afs: AngularFirestore
    ) { }

    getTrailStatusByUserId(userId: string): Observable<TrailStatus> {
        return from(this.afs.collection('user-trail-status', ref => ref.where('uid', '==', userId)).get()).pipe(
            map(documents => {
                let userTrailStatus;
                documents.forEach(trailStatus => {
                    console.log(trailStatus);
                    userTrailStatus = trailStatus.data();
                });

                return userTrailStatus;
            })
        );
    }

    createStatusRecord(trailStatus: TrailStatus) {
        console.log('creating record');
        console.log(trailStatus.uid);
        this.afs.collection('user-trail-status').add(trailStatus);
    }
}
