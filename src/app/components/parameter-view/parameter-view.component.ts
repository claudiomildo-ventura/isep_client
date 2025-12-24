import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../material.module";
import {IndexedDbService} from "../../core/services/indexed-db.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ENVIRONMENT} from "../../../environments/environment";
import {ParameterListResponse} from "../../shared/interface/parameter-list-response";
import {ArchetypeService} from "../../core/services/archetype.service";
import {NUMBER_CONSTANT} from "../../shared/NumberConstant";
import {PARAMETERS_LABEL} from "../../shared/constant/form-label";
import {StringFunc} from "../../shared/string-utils/StringFunc";

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
    public databaseTitle: string = StringFunc.STRING_EMPTY;
    public databaseEngineerTitle: string = StringFunc.STRING_EMPTY;
    public environmentTitle: string = StringFunc.STRING_EMPTY;
    public templateTitle: string = StringFunc.STRING_EMPTY;
    public scaffoldTitle: string = StringFunc.STRING_EMPTY;

    public architectureList: ParameterListResponse[] = [];
    public databaseList: ParameterListResponse[] = [];
    public databaseEngineerList: ParameterListResponse[] = [];
    public environmentList: ParameterListResponse[] = [];
    public templateList: ParameterListResponse[] = [];
    public scaffoldList: ParameterListResponse[] = [];

    @ViewChild('lblArchitecture') lblArchitecture!: ElementRef<HTMLElement>;
    @ViewChild('lblDatabase') lblDatabase!: ElementRef<HTMLElement>;
    @ViewChild('lblDatabaseEngineer') lblDatabaseEngineer!: ElementRef<HTMLElement>;
    @ViewChild('lblEnvironment') lblEnvironment!: ElementRef<HTMLElement>;
    @ViewChild('lblTemplate') lblTemplate!: ElementRef<HTMLElement>;
    @ViewChild('lblScaffold') lblScaffold!: ElementRef<HTMLElement>;

    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly indexedDbService: IndexedDbService = inject(IndexedDbService);
    private readonly archetypeService: ArchetypeService = inject(ArchetypeService);

    public frm: FormGroup = this.fb.group({
        architecture: [0],
        database: [0],
        databaseEngineer: [0],
        environment: [0],
        template: [0],
        scaffold: [0]
    });

    ngOnInit(): void {
        void this.architecturesInitialize();
        void this.databasesInitialize();
        void this.databasesEngineerInitialize();
        void this.environmentsInitialize();
        void this.templatesInitialize();
        void this.scaffoldsInitialize();
    }

    public submit(): void {
        if (this.frm.invalid) {
            console.warn('Form inválido!');
            return;
        }
        console.log('Selecionado:', this.frm.value.architecture);
    }

    private async architecturesInitialize(): Promise<void> {
        this.architectureTitle = PARAMETERS_LABEL.ARCHITECTURE;
        this.architectureList = await this.archetypeService.getMappingList<ParameterListResponse[]>(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.architectures}`);
        this.frm.patchValue({architecture: NUMBER_CONSTANT.INITIALIZE_WITH_0});
    }

    private async databasesInitialize(): Promise<void> {
        this.databaseTitle = PARAMETERS_LABEL.DATABASE;
        this.databaseList = await this.archetypeService.getMappingList<ParameterListResponse[]>(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.databases}`);
        this.frm.patchValue({database: NUMBER_CONSTANT.INITIALIZE_WITH_0});
    }

    private async databasesEngineerInitialize(): Promise<void> {
        this.databaseEngineerTitle = PARAMETERS_LABEL.DATABASE_ENGINEER;
        this.databaseEngineerList = await this.archetypeService.getMappingList<ParameterListResponse[]>(`${ENVIRONMENT.basePath}${ENVIRONMENT.endpoints.databases_engineer}`);
        this.frm.patchValue({databaseEngineer: NUMBER_CONSTANT.INITIALIZE_WITH_0});
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

    private async load(): Promise<void> {
        try {
            await this.indexedDbService.getColumns();
        } catch (err) {
            console.error('Error saving/loading columns:', err);
        }
    }
}