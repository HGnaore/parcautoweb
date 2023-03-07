import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefournisseurListeComponent } from './typefournisseur-liste.component';

describe('TypefournisseurListeComponent', () => {
  let component: TypefournisseurListeComponent;
  let fixture: ComponentFixture<TypefournisseurListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypefournisseurListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefournisseurListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
