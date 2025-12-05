import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {PageHomeComponent} from "./components/dashboard-view/page-home/page-home.component";
import {PageTitleComponent} from "./components/dashboard-view/page-title/page-title.component";
import {PageEndComponent} from "./components/dashboard-view/page-end/page-end.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        TranslateModule,
        PageTitleComponent,
        PageHomeComponent,
        PageEndComponent],
    templateUrl: './app.module.html',
    styleUrls: ['./app.module.css']
})
export class AppModule {

    /*constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    changeLanguage(language: string) {
        this.translate.use(language);  // Change the language dynamically
    }*/
}
