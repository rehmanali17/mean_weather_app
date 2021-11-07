import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentResultComponent } from './parent-result.component';

describe('ParentResultComponent', () => {
  let component: ParentResultComponent;
  let fixture: ComponentFixture<ParentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
