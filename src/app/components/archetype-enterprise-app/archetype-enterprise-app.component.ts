import {Component, OnInit} from '@angular/core';
import {Hyperparameters} from "../../shared/interface/hyperparameters";
import {ArchetypeService} from "../../core/services/archetype.service";

@Component({
  selector: 'archetype-enterprise-app',
  standalone: true,
  imports: [],
  templateUrl: './archetype-enterprise-app.component.html',
  styleUrl: './archetype-enterprise-app.component.css'
})
export class ArchetypeEnterpriseAppComponent implements OnInit  {
    private readonly _basePath: string = 'http://localhost:3000/api/v1/';
    private readonly _enterprise: string = 'enterprise';
    public readonly enterprise: Hyperparameters = {data: ''};

    constructor(private archetypeService: ArchetypeService) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.seEnterprise();
    }

    private async seEnterprise(): Promise<void> {
        this.enterprise.data = await this.archetypeService.getData(`${this._basePath}${this._enterprise}`);
    }
}