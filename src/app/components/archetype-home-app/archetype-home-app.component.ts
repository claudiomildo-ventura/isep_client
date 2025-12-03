import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MetadataValidation} from 'src/app/shared/validator/metadatavalidation';
import {Hyperparameters} from "../../shared/interface/hyperparameters";
import {ArchetypeService} from "../../core/services/archetype.service";
import {CommonModule} from "@angular/common";
import {environment} from 'src/environments/environment';

@Component({
    selector: 'archetype-home-app',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './archetype-home-app.component.html',
    styleUrls: ['./archetype-home-app.component.css'],
})
export class ArchetypeHomeAppComponent implements OnInit {

    btnCreate: string = '';
    detailIsDefault: boolean = true;
    private ID_DEFAULT_ITEM: number = 0;
    private LABEL_DEFAULT_ITEM: string = 'Items';

    public detail: Hyperparameters = {data: ''};

    public archetypeFrm!: FormGroup;
    public fileContent: string | ArrayBuffer | null = '';
    public startValidation: boolean = false;

    constructor(private formBuilder: FormBuilder,
                private changeDetector: ChangeDetectorRef,
                private archetypeService: ArchetypeService
    ) {
    }

    ngOnInit(): void {
        this.btnCreate = environment.btnCreate;
        this.setDetail();
        this.archetypeFormCreate();
    }

    private async setDetail(): Promise<void> {
        this.detail.data = await this.archetypeService.getData(`${environment.basePath}${environment.endpoints.detail}`);
    }

    public archetypeFormCreate(): void {

        this.archetypeFrm = this.formBuilder.group({
            archetypeFrmGroupOne: this.formBuilder.group({
                archetypeDetail: new FormControl('', [Validators.required, Validators.minLength(2), MetadataValidation.notOnlyWhitespace, MetadataValidation.textContainsInicialValue]),
            }),
        });
    }

    get getArchetypeDetail() {
        return this.archetypeFrm.get('archetypeFrmGroupOne.archetypeDetail');
    }

    public archetypeSubmit(): void {

        if (this.archetypeFrm.invalid) {
            this.startValidation = true;
            this.archetypeFrm.markAllAsTouched();
        } else {
            const groupValue = this.archetypeFrm.get('archetypeFrmGroupOne')?.value;
            console.log(groupValue);
        }
    }

    public onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result as string;
            this.fileContent = content;
            this.detailIsDefault = false;

            this.archetypeFrm.patchValue({archetypeFrmGroupOne: {archetypeDetail: content}});
            this.archetypeFrm.get('archetypeFrmGroupOne.archetypeDetail')?.updateValueAndValidity();
        };

        reader.readAsText(file);
    }

    private encodeBase64(text: string): string {
        return window.btoa(new TextEncoder().encode(text).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    }
}