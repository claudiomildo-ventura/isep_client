import {Component, OnInit} from '@angular/core';
import {Hyperparameters} from "../../shared/interface/hyperparameters";
import {ArchetypeService} from "../../core/services/archetype.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'archetype-enterprise-app',
  standalone: true,
  imports: [],
  templateUrl: './archetype-enterprise-app.component.html',
  styleUrl: './archetype-enterprise-app.component.css'
})
export class ArchetypeEnterpriseAppComponent implements OnInit  {
    public readonly enterprise: Hyperparameters = {data: ''};

    constructor(private archetypeService: ArchetypeService) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.setEnterprise();
    }

    private async setEnterprise(): Promise<void> {
        this.enterprise.data = await this.archetypeService.getData(`${environment.basePath}${environment.endpoints.enterprise}`);
    }
}