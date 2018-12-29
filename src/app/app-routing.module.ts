import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TrailDetailsComponent } from './components/trail-details/trail-details.component';
import { TrailsListComponent } from './components/trails-list/trails-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UserResolver } from './guards/user.resolver';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        // resolve: {user: UserResolver}
    },
    {
        path: 'trails',
        component: TrailsListComponent,
        // resolve: {user: UserResolver}
    },
    {
        path: 'trail-details',
        component: TrailDetailsComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
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
