import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TrailsListComponent,
        RootComponent,
        TrailDetailsComponent,
        ForecastDialogComponent,
        RatingDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        ScrollingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        ForecastDialogComponent
    ]
})
export class AppModule { }
