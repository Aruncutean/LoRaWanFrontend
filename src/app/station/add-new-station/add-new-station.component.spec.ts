import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStationComponent } from './add-new-station.component';

describe('AddNewStationComponent', () => {
  let component: AddNewStationComponent;
  let fixture: ComponentFixture<AddNewStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
