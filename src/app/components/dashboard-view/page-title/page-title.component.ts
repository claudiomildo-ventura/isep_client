import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ArchetypeService} from "../../../core/services/archetype.service";
import {ApiResponse} from "../../../shared/interface/ApiResponse";
import {ENVIRONMENT} from 'src/environments/environment';
import {UpperCasePipe} from "@angular/common";
import {SessionService} from "../../../core/services/session-storage.service";
import {SESSION_SERVICE} from "../../../../config/session-service";
import {MaterialModule} from "../../../material.module";

@Component({
    selector: 'page-title',
    standalone: true,
    imports: [
        UpperCasePipe,
        MaterialModule
    ],
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {
    @ViewChild('lblTitle') lblTitle!: ElementRef<HTMLSpanElement>;

    public readonly title: ApiResponse<any> = {data: ''};
    private readonly sessionService: SessionService = inject(SessionService);
    private readonly archetypeService: ArchetypeService = inject(ArchetypeService);

    ngOnInit(): void {
        this.titleInitialize();
    }

    private async setTitle(): Promise<void> {
        this.title.data = await this.archetypeService.getMapping(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.title}`);
        this.sessionService.setItem(SESSION_SERVICE.application_title, this.title.data);
    }

    private titleInitialize(): void {
        this.sessionService.clear();
        this.setTitle();
    }
}