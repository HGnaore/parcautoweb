import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssureurListeComponent } from './assureur-liste.component';

describe('AssureurListeComponent', () => {
  let component: AssureurListeComponent;
  let fixture: ComponentFixture<AssureurListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssureurListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssureurListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
