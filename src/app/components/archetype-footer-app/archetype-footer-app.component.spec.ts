import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchetypeFooterAppComponent } from './archetype-footer-app.component';

describe('ArchetypeFooterAppComponent', () => {
  let component: ArchetypeFooterAppComponent;
  let fixture: ComponentFixture<ArchetypeFooterAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchetypeFooterAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchetypeFooterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
