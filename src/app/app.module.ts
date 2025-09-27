import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {ArchetypeComponent} from './components/archetype/archetype.component';
import {TitleComponent} from './components/title/title.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpclientService} from './core/services/httpclient.service';

@NgModule({
    declarations: [
        AppComponent, ArchetypeComponent,
        TitleComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'always'})
    ],
    providers: [HttpclientService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
