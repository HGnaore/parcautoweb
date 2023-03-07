import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartegriseEditionComponent } from './cartegrise-edition.component';

describe('CartegriseEditionComponent', () => {
  let component: CartegriseEditionComponent;
  let fixture: ComponentFixture<CartegriseEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartegriseEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartegriseEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
