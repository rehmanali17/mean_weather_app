import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { DailyReport } from 'src/app/interface/DailyReport';
import { DetailWeather } from 'src/app/interface/DetailWeather';

@Component({
  selector: 'app-parent-result',
  templateUrl: './parent-result.component.html',
  styleUrls: ['./parent-result.component.css']
})
export class ParentResultComponent implements OnInit {
  
  showResult:boolean = false;
  loading:boolean = false;
  dailyReport: DailyReport[] = [];
  weatherData: DetailWeather[] = [];
  showDetail:boolean = false;
  detailData:any;
  detailBtnIndex:number = -1;
  subscription:Subscription; 

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => {
        this.showResult = value
      })

    this.subscription = this.uiService
      .onLoading()
      .subscribe(value => {
        this.loading = value
    })

    this.subscription = this.uiService
      .onSuccess()
      .subscribe(value => {
        this.dailyReport = value 
      })

      this.subscription = this.uiService
      .onData()
      .subscribe(value => {
        this.weatherData = value 
      })

      this.subscription = this.uiService
      .onDetail()
      .subscribe(value => {
        if(value > -1){
          this.showDetail = true
          this.detailBtnIndex = value
          this.detailData = this.weatherData[value]
        }else{
          this.showDetail = false
        }
        
      })


  }

  ngOnInit(): void {
  }

  // print():void{
  //   console.log('yes')
  // }

  showDailyDetail():void{
    if(this.detailBtnIndex == -1){
      return;
    }
    this.showDetail = true
    this.detailData = this.weatherData[this.detailBtnIndex]
  }

}
