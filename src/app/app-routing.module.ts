import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TrailsListComponent } from './components/trails-list/trails-list.component';
import { HomeComponent } from './components/home/home.component';
import { RootComponent } from './components/root/root.component';

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
        path: '**',
        redirectTo: '/home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }