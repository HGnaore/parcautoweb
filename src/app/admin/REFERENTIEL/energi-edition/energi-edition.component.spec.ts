import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergiEditionComponent } from './energi-edition.component';

describe('EnergiEditionComponent', () => {
  let component: EnergiEditionComponent;
  let fixture: ComponentFixture<EnergiEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergiEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergiEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
