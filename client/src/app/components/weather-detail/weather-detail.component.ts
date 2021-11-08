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
//  @Input() dailyReport: DailyReport[] = []
//  @Input() weatherData: DetailWeather[] = []

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  hideDetail():void{
    this.uiService.toggleShow(-1)
  }

}
