import {Routes} from '@angular/router';
import {ErroDefaultComponent} from "./erro-default/erro-default.component";
import {NotFoundComponent} from "./not-found/not-found.component";

export const ERROR_ROUTES: Routes = [
    {
        title: 'Error',
        path: '',
        component: ErroDefaultComponent
    },
    {
        title: 'Not Found',
        path: '404',
        component: NotFoundComponent,
    }
];
