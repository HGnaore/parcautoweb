import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienProgramListeComponent } from './entretien-program-liste.component';

describe('EntretienProgramListeComponent', () => {
  let component: EntretienProgramListeComponent;
  let fixture: ComponentFixture<EntretienProgramListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntretienProgramListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretienProgramListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
