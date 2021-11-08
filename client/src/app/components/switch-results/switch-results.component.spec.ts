import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchResultsComponent } from './switch-results.component';

describe('SwitchResultsComponent', () => {
  let component: SwitchResultsComponent;
  let fixture: ComponentFixture<SwitchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
