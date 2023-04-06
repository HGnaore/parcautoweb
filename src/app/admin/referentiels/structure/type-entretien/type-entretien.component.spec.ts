import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEntretienComponent } from './type-entretien.component';

describe('TypeEntretienComponent', () => {
  let component: TypeEntretienComponent;
  let fixture: ComponentFixture<TypeEntretienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEntretienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
