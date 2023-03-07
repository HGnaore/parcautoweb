import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueModeleEditionComponent } from './marque-modele-edition.component';

describe('MarqueModeleEditionComponent', () => {
  let component: MarqueModeleEditionComponent;
  let fixture: ComponentFixture<MarqueModeleEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarqueModeleEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueModeleEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
