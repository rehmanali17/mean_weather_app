import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDailyViewComponent } from './weather-daily-view.component';

describe('WeatherDailyViewComponent', () => {
  let component: WeatherDailyViewComponent;
  let fixture: ComponentFixture<WeatherDailyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDailyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDailyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
