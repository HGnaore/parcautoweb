import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifmotdepasseComponent } from './modifmotdepasse.component';

describe('ModifmotdepasseComponent', () => {
  let component: ModifmotdepasseComponent;
  let fixture: ComponentFixture<ModifmotdepasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifmotdepasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifmotdepasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
