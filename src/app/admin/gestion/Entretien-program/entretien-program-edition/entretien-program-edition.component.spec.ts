import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienProgramEditionComponent } from './entretien-program-edition.component';

describe('EntretienProgramEditionComponent', () => {
  let component: EntretienProgramEditionComponent;
  let fixture: ComponentFixture<EntretienProgramEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntretienProgramEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretienProgramEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
