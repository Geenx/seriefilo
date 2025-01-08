import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SeriesComponent } from './series/series.component';
import { PopularComponent } from './popular/popular.component';
import { TrendingComponent } from './trending/trending.component';
import { MyListComponent } from './my-list/my-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'series', component: SeriesComponent },
    { path: 'popular', component: PopularComponent },
    { path: 'trending', component: TrendingComponent },
    { path: 'my-list', component: MyListComponent },
    
];
