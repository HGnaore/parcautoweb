import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienEditionComponent } from './entretien-edition.component';

describe('EntretienEditionComponent', () => {
  let component: EntretienEditionComponent;
  let fixture: ComponentFixture<EntretienEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntretienEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretienEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
