import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteFerComponent } from './carte-fer.component';

describe('CarteFerComponent', () => {
  let component: CarteFerComponent;
  let fixture: ComponentFixture<CarteFerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteFerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteFerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
