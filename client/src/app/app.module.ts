import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
// import { HighchartsChartModule } from 'highcharts-angular';
// import * as Highcharts from 'highcharts-angular';
import { ChartModule, HIGHCHARTS_MODULES  } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ParentResultComponent } from './components/parent-result/parent-result.component';
import { WeatherDailyViewComponent } from './components/weather-daily-view/weather-daily-view.component';
import { DailyTemperatureChartComponent } from './components/daily-temperature-chart/daily-temperature-chart.component';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ParentResultComponent,
    WeatherDailyViewComponent,
    DailyTemperatureChartComponent,
    WeatherDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
