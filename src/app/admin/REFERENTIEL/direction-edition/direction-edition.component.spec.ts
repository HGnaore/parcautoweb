import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionEditionComponent } from './direction-edition.component';

describe('DirectionEditionComponent', () => {
  let component: DirectionEditionComponent;
  let fixture: ComponentFixture<DirectionEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
