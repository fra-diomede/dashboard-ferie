import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerieFormComponent } from './ferie-form.component';

describe('FerieFormComponent', () => {
  let component: FerieFormComponent;
  let fixture: ComponentFixture<FerieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FerieFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FerieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
