import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfovehiculeEditionComponent } from './infovehicule-edition.component';

describe('InfovehiculeEditionComponent', () => {
  let component: InfovehiculeEditionComponent;
  let fixture: ComponentFixture<InfovehiculeEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfovehiculeEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfovehiculeEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
