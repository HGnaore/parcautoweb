import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeutilisateursComponent } from './listeutilisateurs.component';

describe('ListeutilisateursComponent', () => {
  let component: ListeutilisateursComponent;
  let fixture: ComponentFixture<ListeutilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeutilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeutilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
