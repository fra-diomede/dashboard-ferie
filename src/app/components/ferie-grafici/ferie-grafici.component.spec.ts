import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerieGraficiComponent } from './ferie-grafici.component';

describe('FerieGraficiComponent', () => {
  let component: FerieGraficiComponent;
  let fixture: ComponentFixture<FerieGraficiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FerieGraficiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FerieGraficiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
