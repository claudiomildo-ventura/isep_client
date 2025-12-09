import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ArchetypeService} from "../../../core/services/archetype.service";
import {ApiResponse} from "../../../shared/interface/ApiResponse";
import {ENVIRONMENT} from 'src/environments/environment';
import {UpperCasePipe} from "@angular/common";

@Component({
    selector: 'page-title',
    standalone: true,
    imports: [UpperCasePipe],
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

    @ViewChild('txtTitle') txtTitle!: ElementRef<HTMLSpanElement>;

    public readonly title: ApiResponse<any> = {data: ''};
    private readonly archetypeService: ArchetypeService = inject(ArchetypeService);

    ngOnInit(): void {
        this.txtTitleInitialize();
    }

    private async setTitle(): Promise<void> {
        const url: string = `${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.title}`;
        this.title.data = await this.archetypeService.getData(url);
    }

    private txtTitleInitialize(): void {
        this.setTitle();
    }
}