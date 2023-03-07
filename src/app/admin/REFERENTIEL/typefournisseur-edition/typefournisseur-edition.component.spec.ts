import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefournisseurEditionComponent } from './typefournisseur-edition.component';

describe('TypefournisseurEditionComponent', () => {
  let component: TypefournisseurEditionComponent;
  let fixture: ComponentFixture<TypefournisseurEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypefournisseurEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefournisseurEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
