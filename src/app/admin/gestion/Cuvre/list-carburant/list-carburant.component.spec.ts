import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarburantComponent } from './list-carburant.component';

describe('ListCarburantComponent', () => {
  let component: ListCarburantComponent;
  let fixture: ComponentFixture<ListCarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCarburantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
