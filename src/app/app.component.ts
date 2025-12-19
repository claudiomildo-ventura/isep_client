import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {PageEndComponent} from "./components/dashboard-view/page-end/page-end.component";
import {PageTitleComponent} from "./components/dashboard-view/page-title/page-title.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        TranslateModule,
        PageEndComponent,
        PageTitleComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

}