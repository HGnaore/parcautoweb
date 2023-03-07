import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageListeComponent } from './usage-liste.component';

describe('UsageListeComponent', () => {
  let component: UsageListeComponent;
  let fixture: ComponentFixture<UsageListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
