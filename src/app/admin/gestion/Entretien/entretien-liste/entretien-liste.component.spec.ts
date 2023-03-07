import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienListeComponent } from './entretien-liste.component';

describe('EntretienListeComponent', () => {
  let component: EntretienListeComponent;
  let fixture: ComponentFixture<EntretienListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntretienListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretienListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
