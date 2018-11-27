import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app.material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TrailsListComponent } from './components/trails-list/trails-list.component';
import { RootComponent } from './components/root/root.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TrailsListComponent,
        RootComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }