import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriePontiComponent } from './ferie-ponti.component';

describe('FeriePontiComponent', () => {
  let component: FeriePontiComponent;
  let fixture: ComponentFixture<FeriePontiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeriePontiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeriePontiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
