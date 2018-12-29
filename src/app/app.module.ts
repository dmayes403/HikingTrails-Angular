import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { APIKeys } from '../api-keys';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app.material';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ForecastDialogComponent } from './components/forecast-dialog/forecast-dialog.component';
import { RatingDialogComponent } from './components/rating-dialog/rating-dialog.component';
import { TrailDetailsComponent } from './components/trail-details/trail-details.component';
import { TrailsListComponent } from './components/trails-list/trails-list.component';
import { HomeComponent } from './components/home/home.component';
import { RootComponent } from './components/root/root.component';
import { AppComponent } from './app.component';
import { UserResolver } from './guards/user.resolver';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const firebaseConfig = APIKeys.firebaseConfig;

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TrailsListComponent,
        RootComponent,
        TrailDetailsComponent,
        ForecastDialogComponent,
        RatingDialogComponent,
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        ScrollingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        // AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    providers: [
        UserResolver
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ForecastDialogComponent,
        RatingDialogComponent
    ]
})
export class AppModule { }
