import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ENVIRONMENT} from "../../../../environments/environment";
import {ArchetypeService} from "../../../core/services/archetype.service";
import {ApiResponse} from "../../../shared/interface/ApiResponse";

@Component({
    selector: 'page-structure',
    standalone: true,
    imports: [],
    templateUrl: './page-structure.component.html',
    styleUrl: './archetype-structure-app.component.css'
})
export class PageStructureComponent implements OnInit, AfterViewInit {

    public readonly obj: ApiResponse<any> = {data: ''};
    private readonly router: Router = inject(Router);
    private readonly archetypeService: ArchetypeService = inject(ArchetypeService);

    ngOnInit(): void {
        const nav = this.router.getCurrentNavigation();
        this.obj.data = nav?.extras.state?.['detailContent'] ?? history.state?.detailContent;
    }

    ngAfterViewInit(): void {
        this.sendData()
    }

    private async sendData(): Promise<void> {
        const url: string = `${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.structure}`;
        await this.archetypeService.postData(url, this.obj.data);
    }
}
