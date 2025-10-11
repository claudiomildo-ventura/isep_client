import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroDefaultComponent } from './erro-default.component';

describe('ErroDefaultComponent', () => {
  let component: ErroDefaultComponent;
  let fixture: ComponentFixture<ErroDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErroDefaultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErroDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
