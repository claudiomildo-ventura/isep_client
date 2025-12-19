import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ArchetypeService} from "../../../core/services/archetype.service";
import {ApiResponse} from "../../../shared/interface/ApiResponse";
import {ENVIRONMENT} from "../../../../environments/environment";
import {TableResponse} from "../../../shared/interface/TablesResponse";
import {CommonModule} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {Table} from "../../../shared/interface/Table";
import {Field} from "../../../shared/interface/Field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import {StringFunc} from "../../../shared/string-utils/StringFunc";
import {NUMBER_CONSTANT} from "../../../shared/NumberConstant";
import {Validator} from "../../../shared/validator/validator";

@Component({
    selector: 'page-structure',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    templateUrl: './page-structure.component.html',
    styleUrl: './archetype-structure-app.component.css'
})
export class PageStructureComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSort) sort!: MatSort;

    public frmStructurePage!: FormGroup;
    private detailContent: unknown;
    public readonly obj: ApiResponse<any> = {data: ''};
    private readonly formBuilder: FormBuilder = inject(FormBuilder);
    private readonly archetypeService: ArchetypeService = inject(ArchetypeService);
    public selectionModel: SelectionModel<Field> = new SelectionModel<Field>(true, []);

    public tables: any[] = [];
    public dtsTablesCols: string[] = ['fields'];
    public dtsTables: MatTableDataSource<any> = new MatTableDataSource<any>();

    public isPageLoading: boolean = true;

    ngOnInit(): void {
        const {detailContent} = history.state ?? {};
        this.getDetail(detailContent);
        this.formActive();
    }

    ngAfterViewInit(): void {
        this.initializeProgressBar();
    }

    public toggleRow(row: any): void {
        this.selectionModel.toggle(row);
    }

    public isAllSelected(table: any): boolean {
        const numSelected: number = this.selectionModel.selected.filter(f => table.fields.includes(f)).length;
        const numRows: any = table.fields.length;
        return numSelected === numRows;
    }

    public masterToggle(table: Table): void {
        this.isAllSelected(table)
            ? table.fields.forEach((f: Field) => this.selectionModel.deselect(f))
            : table.fields.forEach((f: Field) => this.selectionModel.select(f));
    }

    public getDetail(detail: unknown): string {
        return this.detailContent = detail as string;
    }

    public submit(): void {
        const selectedFields: Field[] = this.getSelectedFields();
        console.log('Selected Field objects:', selectedFields);
    }

    private initializeProgressBar(): void {
        setTimeout((): void => {
            this.dataPost();
            this.isPageLoading = false;
        }, 1000);
    }

    private formShow(tablesResponse: TableResponse): void {
        this.tables = tablesResponse.tables;
        this.dtsTables = new MatTableDataSource<Table>(this.tables);
        this.dataSourceSort();
        this.selectingAllCheckboxesOnLoad();
    }

    private dataSourceSort(): void {
        this.dtsTables.sort = this.sort;
    }

    private selectingAllCheckboxesOnLoad(): void {
        this.selectionModel.select(...this.tables.flatMap(t => t.fields));
    }

    private getSelectedFields(): Field[] {
        return this.selectionModel.selected;
    }



    numSelectedInTable(table: Table): number {
        const selectedSet = new Set(
            this.selectionModel.selected.map(f => f.id) // supondo que Field tem id
        );
        return (table.fields ?? []).filter(f => selectedSet.has(f.id)).length;
    }




    private formActive(): void {
        this.frmStructurePage = this.formBuilder.group({
            group1: this.formBuilder.group({})
        });
    }

    private async dataPost(): Promise<void> {
        const url: string = `${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.structure}`;
        const response: TableResponse = await this.archetypeService.postMapping<TableResponse>(url, {data: this.detailContent});
        this.formShow(response);
    }
}