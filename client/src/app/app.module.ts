import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
// import { HighchartsChartModule } from 'highcharts-angular';
// import * as Highcharts from 'highcharts-angular';
import { ChartModule, HIGHCHARTS_MODULES  } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'

import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ParentResultComponent } from './components/parent-result/parent-result.component';
import { WeatherDailyViewComponent } from './components/weather-daily-view/weather-daily-view.component';
import { DailyTemperatureChartComponent } from './components/daily-temperature-chart/daily-temperature-chart.component';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';
import { SwitchResultsComponent } from './components/switch-results/switch-results.component';
import { FavouriteTabComponent } from './components/favourite-tab/favourite-tab.component';
import { MapComponent } from './components/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ParentResultComponent,
    WeatherDailyViewComponent,
    DailyTemperatureChartComponent,
    WeatherDetailComponent,
    SwitchResultsComponent,
    FavouriteTabComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    GoogleMapsModule,
    GooglePlaceModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
