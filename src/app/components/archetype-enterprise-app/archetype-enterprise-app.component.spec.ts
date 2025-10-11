import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchetypeEnterpriseAppComponent } from './archetype-enterprise-app.component';

describe('ArchetypeEnterpriseAppComponent', () => {
  let component: ArchetypeEnterpriseAppComponent;
  let fixture: ComponentFixture<ArchetypeEnterpriseAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchetypeEnterpriseAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchetypeEnterpriseAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
