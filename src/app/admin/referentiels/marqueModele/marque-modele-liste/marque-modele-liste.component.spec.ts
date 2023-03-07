import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueModeleListeComponent } from './marque-modele-liste.component';

describe('MarqueModeleListeComponent', () => {
  let component: MarqueModeleListeComponent;
  let fixture: ComponentFixture<MarqueModeleListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarqueModeleListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueModeleListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
