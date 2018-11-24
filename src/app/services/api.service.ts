import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    loadingData = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    get(url: string, params: any): Observable<any> {
        this.loadingData.next(this.loadingData.getValue() + 1);
        return this.http.get<any>(url).pipe(
            map(data => {
                this.loadingData.next(this.loadingData.getValue() - 1);
                return data;
            }),
            catchError(error => {
                this.loadingData.next(this.loadingData.getValue() - 1);
                return of(error);
            })
        );
    }
}
