import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergieListeComponent } from './energie-liste.component';

describe('EnergieListeComponent', () => {
  let component: EnergieListeComponent;
  let fixture: ComponentFixture<EnergieListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergieListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergieListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
