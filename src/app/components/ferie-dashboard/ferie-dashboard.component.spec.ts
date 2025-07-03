import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerieDashboardComponent } from './ferie-dashboard.component';

describe('FerieDashboardComponent', () => {
  let component: FerieDashboardComponent;
  let fixture: ComponentFixture<FerieDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FerieDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FerieDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
