import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergiListeComponent } from './energi-liste.component';

describe('EnergiListeComponent', () => {
  let component: EnergiListeComponent;
  let fixture: ComponentFixture<EnergiListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergiListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergiListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
