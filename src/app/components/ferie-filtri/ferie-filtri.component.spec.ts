import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerieFiltriComponent } from './ferie-filtri.component';

describe('FerieFiltriComponent', () => {
  let component: FerieFiltriComponent;
  let fixture: ComponentFixture<FerieFiltriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FerieFiltriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FerieFiltriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
