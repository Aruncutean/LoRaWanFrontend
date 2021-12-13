import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfostatinComponent } from './infostatin.component';

describe('InfostatibComponent', () => {
  let component: InfostatinComponent;
  let fixture: ComponentFixture<InfostatinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfostatinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfostatinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
