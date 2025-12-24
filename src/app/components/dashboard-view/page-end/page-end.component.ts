import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ApiResponse} from "../../../shared/interface/ApiResponse";
import {ArchetypeService} from "../../../core/services/archetype.service";
import {PageEnterpriseComponent} from "../page-enterprise/page-enterprise.component";
import {ENVIRONMENT} from 'src/environments/environment';
import {MaterialModule} from "../../../material.module";

@Component({
    selector: 'page-end',
    standalone: true,
    imports: [
        PageEnterpriseComponent,
        MaterialModule
    ],
    templateUrl: './page-end.component.html',
    styleUrl: './page-end.component.css'
})
export class PageEndComponent implements OnInit {
    @ViewChild('lblFooter') lblFooter!: ElementRef<HTMLParagraphElement>;

    public readonly footer: ApiResponse<any> = {data: ''};
    private readonly archetypeService: ArchetypeService = inject(ArchetypeService);

    ngOnInit(): void {
        this.txtEnterpriseInitialize();
    }

    private async setFooter(): Promise<void> {
        const url: string = `${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.footer}`;
        this.footer.data = await this.archetypeService.getMapping(url);
    }

    private txtEnterpriseInitialize(): void {
        void this.setFooter();
    }
}