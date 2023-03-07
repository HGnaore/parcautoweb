import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PannereparationEditionComponent } from './pannereparation-edition.component';

describe('PannereparationEditionComponent', () => {
  let component: PannereparationEditionComponent;
  let fixture: ComponentFixture<PannereparationEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PannereparationEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PannereparationEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
