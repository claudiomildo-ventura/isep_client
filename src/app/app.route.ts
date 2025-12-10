import {Routes} from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'page-home',
        pathMatch: 'full'
    },
    {
        title: 'udp - home page',
        path: 'page-home',
        loadComponent: ()=> import('./components/dashboard-view/page-home/page-home.component').then(m => m.PageHomeComponent)
    },
    {
        title: 'Structure',
        path: 'page-structure',
        loadComponent: () => import('./components/structure-view/page-structure/page-structure.component').then(m => m.PageStructureComponent)
    },
    {
        title: 'Error page',
        path: 'erro',
        loadChildren: () => import('./core/error/error.route').then(m => m.ERROR_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'erro',
        pathMatch: 'full'
    }
];