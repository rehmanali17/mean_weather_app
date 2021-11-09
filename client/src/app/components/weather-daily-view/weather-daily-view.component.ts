import { Component, OnInit, Input } from '@angular/core';
import { DailyReport } from 'src/app/interface/DailyReport';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-weather-daily-view',
  templateUrl: './weather-daily-view.component.html',
  styleUrls: ['./weather-daily-view.component.css']
})
export class WeatherDailyViewComponent implements OnInit {
  @Input() dailyReport: DailyReport[] = []
  codes:any = {
    "0": "Unknown",
    "1000": "Clear",
    "1100": "Mostly Clear",
    "1101": "Partly Cloudy",
    "1102": "Mostly Cloudy",
    "1001": "Cloudy",
    "2000": "Fog",
    "2100": "Light Fog",
    "8000": "Thunderstorm",
    "5001": "Flurries",
    "5100": "Light Snow",
    "5000": "Snow",
    "5101": "Heavy Snow",
    "7102": "Light Ice Pellets",
    "7000": "Ice Pellets",
    "7101": "Heavy Ice Pellets",
    "4000": "Drizzle",
    "6000": "Freezing Drizzle",
    "6200": "Light Freezing Rain",
    "6001": "Freezing Rain",
    "6201": "Heavy Freezing Rain",
    "4200": "Light Rain",
    "4001": "Rain",
    "4201": "Heavy Rain",
    "3000": "Light Wind",
    "3001": "Wind",
    "3002": "Strong Wind",
  };

  imageCodes:any = {
    "1000": "clear_day.svg",
    "1100": "mostly_clear_day.svg",
    "1101": "partly_cloudy_day.svg",
    "1102": "mostly_cloudy.svg",
    "1001": "cloudy.svg",
    "2000": "fog.svg",
    "2100": "fog_light.svg",
    "8000": "tstorm.svg",
    "5001": "flurries.svg",
    "5100": "snow_light.svg",
    "5000": "snow.svg",
    "5101": "snow_heavy.svg",
    "7102": "ice_pellets_light.svg",
    "7000": "ice_pellets.svg",
    "7101": "ice_pellets_heavy.svg",
    "4000": "drizzle.svg",
    "6000": "freezing_drizzle.svg",
    "6200": "freezing_rain_light.svg",
    "6001": "freezing_rain.svg",
    "6201": "freezing_rain_heavy.svg",
    "4200": "rain_light.svg",
    "4001": "rain.svg",
    "4201": "rain_heavy.svg",
  };

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
    
  }

  weatherDetail(index: number):void{
    this.uiService.toggleShow(index)
  }


}
