import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurEditionComponent } from './fournisseur-edition.component';

describe('FournisseurEditionComponent', () => {
  let component: FournisseurEditionComponent;
  let fixture: ComponentFixture<FournisseurEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisseurEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
