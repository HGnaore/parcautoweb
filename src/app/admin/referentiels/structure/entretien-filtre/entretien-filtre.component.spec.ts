import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienFiltreComponent } from './entretien-filtre.component';

describe('EntretienFiltreComponent', () => {
  let component: EntretienFiltreComponent;
  let fixture: ComponentFixture<EntretienFiltreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntretienFiltreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretienFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
