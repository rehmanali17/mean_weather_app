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

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
    // this.print()
  }

  weatherDetail(index: number):void{
    this.uiService.toggleShow(index)
  }

  // print():void{
  //   console.log(this.dailyReport)
  // }

}
