import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerieListComponent } from './ferie-list.component';

describe('FerieListComponent', () => {
  let component: FerieListComponent;
  let fixture: ComponentFixture<FerieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FerieListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FerieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
