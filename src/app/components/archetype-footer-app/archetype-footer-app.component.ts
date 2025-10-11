import {Component, OnInit} from '@angular/core';
import {Hyperparameters} from "../../shared/interface/hyperparameters";
import {ArchetypeService} from "../../core/services/archetype.service";
import {ArchetypeEnterpriseAppComponent} from "../archetype-enterprise-app/archetype-enterprise-app.component";
import {environment} from 'src/environments/environment';

@Component({
    selector: 'archetype-footer-app',
    standalone: true,
    imports: [ArchetypeEnterpriseAppComponent],
    templateUrl: './archetype-footer-app.component.html',
    styleUrl: './archetype-footer-app.component.css'
})
export class ArchetypeFooterAppComponent implements OnInit {
    public readonly footer: Hyperparameters = {data: ''};

    constructor(private archetypeService: ArchetypeService) {
    }

    ngOnInit(): void {
        this.setFooter();
    }

    private async setFooter(): Promise<void> {
        this.footer.data = await this.archetypeService.getData(`${environment.basePath}${environment.endpoints.footer}`);
    }
}