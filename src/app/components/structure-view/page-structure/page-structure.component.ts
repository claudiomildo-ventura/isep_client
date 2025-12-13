import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ArchetypeService} from "../../../core/services/archetype.service";
import {ApiResponse} from "../../../shared/interface/ApiResponse";
import {ENVIRONMENT} from "../../../../environments/environment";
import {TableResponse} from "../../../shared/interface/TablesResponse";
import {CommonModule} from "@angular/common";
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {PageTitleComponent} from "../../dashboard-view/page-title/page-title.component";

@Component({
    selector: 'page-structure',
    standalone: true,
    imports: [CommonModule, MatTable, MatTableModule, PageTitleComponent],
    templateUrl: './page-structure.component.html',
    styleUrl: './archetype-structure-app.component.css'
})
export class PageStructureComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort!: MatSort;

    public readonly obj: ApiResponse<any> = {data: ''};
    private readonly router: Router = inject(Router);
    private readonly archetypeService: ArchetypeService = inject(ArchetypeService);
    private detailContent: unknown;
    public tableData: any[] = [];
    public dataSource = new MatTableDataSource<any>();
    displayedColumns: string[] = ['id', 'name', 'type', 'length'];
    ngOnInit(): void {
        const {detailContent} = history.state ?? {};
        this.detailContent = detailContent;
    }

    ngAfterViewInit(): void {
        this.dataPost(this.detailContent as string);
        //this.dataSource.sort = this.sort;
    }

    private async dataPost(data: string): Promise<void> {
        const metadata = {data: data};
        const url: string = `${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.structure}`;

        const tableResponse: TableResponse = await this.archetypeService.postMapping<TableResponse>(url, metadata);

        this.tableData = tableResponse.tables;
        this.dataSource.data = this.tableData[0].fields;
    }
}