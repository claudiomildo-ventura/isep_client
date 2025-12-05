import {Routes} from '@angular/router';
import {PageHomeComponent} from "./components/dashboard-view/page-home/page-home.component";

export const ROUTES: Routes = [
    {
        title: 'Home',
        path: 'page-home',
        loadComponent: () => import('./components/dashboard-view/page-home/page-home.component')
            .then(view => view.PageHomeComponent)
    },

    {
        title: 'Structure',
        path: 'page-structure',
        loadComponent: () =>
            import('./components/structure-view/page-structure/page-structure.component')
                .then(view => view.PageStructureComponent),
    },

    /*{
        title: 'Error page',
        path: 'erro',
        loadChildren: () =>
            import('./core/error/error.route')
                .then(view => view.ERROR_ROUTES),
    },*/

    {
        path: '**',
        redirectTo: 'erro',
        pathMatch: 'full'
    }
];