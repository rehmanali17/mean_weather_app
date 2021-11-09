import { Component, OnInit, Input } from '@angular/core';
import { DailyReport } from 'src/app/interface/DailyReport';
import { DetailWeather } from 'src/app/interface/DetailWeather';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {
 @Input() data:any;
 @Input() center: google.maps.LatLngLiteral = {lat:0,lng:0}
 @Input() location:{city:string,state:string,lat_lng:string} = { city:'', state:'',lat_lng:''};

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
//  hashTag:string = '#CSCI571WeatherForecast'
//  @Input() dailyReport: DailyReport[] = []
//  @Input() weatherData: DetailWeather[] = []

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  hideDetail():void{
    this.uiService.toggleShow(-1)
  }

}
