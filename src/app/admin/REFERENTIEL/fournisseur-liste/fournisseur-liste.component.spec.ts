import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurListeComponent } from './fournisseur-liste.component';

describe('FournisseurListeComponent', () => {
  let component: FournisseurListeComponent;
  let fixture: ComponentFixture<FournisseurListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisseurListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
