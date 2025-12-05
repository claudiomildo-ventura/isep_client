import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppModule
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppModule);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render page-title', () => {
    const fixture = TestBed.createComponent(AppModule);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-ecommerce app is running!');
  });
});
