import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableaudebordComponent } from './tableaudebord.component';

describe('TableaudebordComponent', () => {
  let component: TableaudebordComponent;
  let fixture: ComponentFixture<TableaudebordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableaudebordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableaudebordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
