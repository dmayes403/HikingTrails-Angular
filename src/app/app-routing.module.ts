import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TrailsListComponent } from './components/trails-list/trails-list.component';
import { HomeComponent } from './components/home/home.component';
import { TrailDetailsComponent } from './components/trail-details/trail-details.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'trails',
        component: TrailsListComponent
    },
    {
        path: 'trail-details',
        component: TrailDetailsComponent
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
