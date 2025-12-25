import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ArchetypeGenerate} from "src/app/shared/interface/archetype-generate";
import {TableResponse} from "src/app/shared/interface/TablesResponse";
import {MaterialModule} from "../../material.module";
import {IndexedDbService} from "../../core/services/indexed-db.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ENVIRONMENT} from "../../../environments/environment";
import {ParameterListResponse} from "../../shared/interface/parameter-list-response";
import {ArchetypeService} from "../../core/services/archetype.service";
import {NUMBER_CONSTANT} from "../../shared/NumberConstant";
import {PARAMETERS_LABEL} from "../../shared/constant/form-label";
import {StringFunc} from "../../shared/string-utils/StringFunc";
import {Table} from "../../shared/interface/Table";
import {Field} from "../../shared/interface/Field";
import {DialogService} from "../../core/services/dialog.service";

@Component({
    selector: 'parameter-view',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    templateUrl: './parameter-view.component.html',
    styleUrl: './parameter-view.component.css'
})
export class ParameterViewComponent implements OnInit {
    public architectureTitle: string = StringFunc.STRING_EMPTY;
    public dbPlatformTitle: string = StringFunc.STRING_EMPTY;
    public dbEngineerTitle: string = StringFunc.STRING_EMPTY;
    public environmentTitle: string = StringFunc.STRING_EMPTY;
    public templateTitle: string = StringFunc.STRING_EMPTY;
    public scaffoldTitle: string = StringFunc.STRING_EMPTY;

    public architectureList: ParameterListResponse[] = [];
    public dbPlatformList: ParameterListResponse[] = [];
    public dbEngineerList: ParameterListResponse[] = [];
    public environmentList: ParameterListResponse[] = [];
    public templateList: ParameterListResponse[] = [];
    public scaffoldList: ParameterListResponse[] = [];

    @ViewChild('lblArchitecture') lblArchitecture!: ElementRef<HTMLElement>;
    @ViewChild('lblDbPlatform') lblDbPlatform!: ElementRef<HTMLElement>;
    @ViewChild('lblDbEngineer') lblDbEngineer!: ElementRef<HTMLElement>;
    @ViewChild('lblEnvironment') lblEnvironment!: ElementRef<HTMLElement>;
    @ViewChild('lblTemplate') lblTemplate!: ElementRef<HTMLElement>;
    @ViewChild('lblScaffold') lblScaffold!: ElementRef<HTMLElement>;

    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly dialogService: DialogService = inject(DialogService);
    private readonly indexedDbService: IndexedDbService = inject(IndexedDbService);
    private readonly archetypeService: ArchetypeService = inject(ArchetypeService);

    public frm: FormGroup = this.fb.group({
        architecture: [0],
        dbPlatform: [0],
        dbEngineer: [0],
        environment: [0],
        template: [0],
        scaffold: [0]
    });

    ngOnInit(): void {
        void this.architecturesInitialize();
        void this.dbPlatformInitialize();
        void this.dbEngineerInitialize();
        void this.environmentsInitialize();
        void this.templatesInitialize();
        void this.scaffoldsInitialize();
        void this.loadDataFromIndexedDb();
    }

    public async submit(): Promise<void> {
        if (this.frm.invalid) {
            void this.dialogService.alert('Form inválido!');
            return;
        }

        const tablesData: any[] = await this.indexedDbService.getColumns();

        const tables: Table[] = [];

        for (const element of tablesData) {
            const t = element;

            const table: Table = {
                id: t.id,
                name: t.name,
                type: t.type,
                isAutoCreated: t.isAutoCreated,
                fields: []
            };

            for (const element of t.fields) {
                const column = element;

                const field: Field = {
                    id: column.id,
                    tableRelationId: column.tableRelationId,
                    columnName: column.columnName,
                    type: column.type,
                    index: column.index,
                    length: column.length,
                    sequence: column.sequence,
                    isAutoCreated: column.isAutoCreated,
                    isPrimaryKey: column.isPrimaryKey,
                    isForeignKey: column.isForeignKey,
                    isIndex: column.isIndex,
                    isNotNull: column.isNotNull
                };

                table.fields.push(field);
            }
            tables.push(table);
        }

        const archetypeGenerate: ArchetypeGenerate = {
            architecture: this.frm.value.architecture,
            dbPlatform: this.frm.value.dbPlatform,
            dbEngineer: this.frm.value.dbEngineer,
            environment: this.frm.value.environment,
            template: this.frm.value.template,
            scaffold: this.frm.value.scaffold,
            table: tables
        };

        try {
            await this.archetypeService.postMapping<void>(
                `${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.generateSolution}`,
                archetypeGenerate
            );
            console.log('Solution generated successfully');
        } catch (ex) {
            console.error('Error generating solution:', ex);
        }
    }

    private async architecturesInitialize(): Promise<void> {
        this.architectureTitle = PARAMETERS_LABEL.ARCHITECTURE;
        this.architectureList = await this.archetypeService.getMappingList<ParameterListResponse[]>(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.architectures}`);
        this.frm.patchValue({architecture: NUMBER_CONSTANT.INITIALIZE_WITH_0});
    }

    private async dbPlatformInitialize(): Promise<void> {
        this.dbPlatformTitle = PARAMETERS_LABEL.DB_PLATFORM;
        this.dbPlatformList = await this.archetypeService.getMappingList<ParameterListResponse[]>(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.db_platform}`);
        this.frm.patchValue({dbPlatform: NUMBER_CONSTANT.INITIALIZE_WITH_0});
    }

    private async dbEngineerInitialize(): Promise<void> {
        this.dbEngineerTitle = PARAMETERS_LABEL.DB_ENGINEER;
        this.dbEngineerList = await this.archetypeService.getMappingList<ParameterListResponse[]>(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.db_engineer}`);
        this.frm.patchValue({dbEngineer: NUMBER_CONSTANT.INITIALIZE_WITH_0});
    }

    private async environmentsInitialize(): Promise<void> {
        this.environmentTitle = PARAMETERS_LABEL.ENVIRONMENT;
        this.environmentList = await this.archetypeService.getMappingList<ParameterListResponse[]>(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.environments}`);
        this.frm.patchValue({environment: NUMBER_CONSTANT.INITIALIZE_WITH_0});
    }

    private async templatesInitialize(): Promise<void> {
        this.templateTitle = PARAMETERS_LABEL.TEMPLATE;
        this.templateList = await this.archetypeService.getMappingList<ParameterListResponse[]>(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.templates}`);
        this.frm.patchValue({template: NUMBER_CONSTANT.INITIALIZE_WITH_0});
    }

    private async scaffoldsInitialize(): Promise<void> {
        this.scaffoldTitle = PARAMETERS_LABEL.SCAFFOLD;
        this.scaffoldList = await this.archetypeService.getMappingList<ParameterListResponse[]>(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.scaffolds}`);
        this.frm.patchValue({scaffold: NUMBER_CONSTANT.INITIALIZE_WITH_0});
    }

    private async loadDataFromIndexedDb(): Promise<void> {
        try {
            const tablesData: any[] = await this.indexedDbService.getColumns();

            const tables: Table[] = [];

            for (const element of tablesData) {
                const t = element;

                const table: Table = {
                    id: t.id,
                    name: t.name,
                    type: t.type,
                    isAutoCreated: t.isAutoCreated,
                    fields: []
                };

                for (const element of t.fields) {
                    const column = element;

                    const field: Field = {
                        id: column.id,
                        tableRelationId: column.tableRelationId,
                        columnName: column.columnName,
                        type: column.type,
                        index: column.index,
                        length: column.length,
                        sequence: column.sequence,
                        isAutoCreated: column.isAutoCreated,
                        isPrimaryKey: column.isPrimaryKey,
                        isForeignKey: column.isForeignKey,
                        isIndex: column.isIndex,
                        isNotNull: column.isNotNull
                    };

                    table.fields.push(field);
                }
                tables.push(table);
            }
        } catch (err) {
            console.error('Error saving/loading columns:', err);
        }
    }
}