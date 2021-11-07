import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DailyReport } from '../interface/DailyReport';
import { DetailWeather } from '../interface/DetailWeather';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showResult:boolean = false;
  private loading:boolean = false
  private dialyReport:DailyReport[] = [];
  private weatherData: DetailWeather[] = []
  private showDetail:number = -1
  
  private subjectLoading = new Subject<any>();
  private subjectResult = new Subject<any>();
  private subjectReport = new Subject<any>();
  private subjectDetail = new Subject<any>();
  private subjectDetailWeather = new Subject<any>();

  constructor() { }

  // toggleViewResults():void{
  //   this.showResult = !this.showResult;
  //   this.subject.next(this.showResult)
  // }

  showViewResults():void{
    this.showResult = true;
    this.subjectResult.next(this.showResult)
  }

  hideViewResults():void{
    this.showResult = false;
    this.subjectResult.next(this.showResult)
  }

  bindDialyReport(data: DailyReport[]):void{
    this.dialyReport = data
    this.subjectReport.next(this.dialyReport)
  }

  bindWeatherData(data: DetailWeather[]):void{
    this.weatherData = data
    this.subjectDetail.next(this.weatherData)
  }

  isLoading():void{
    this.loading = !this.loading
    this.subjectLoading.next(this.loading)
  }

  toggleShow(index:number):void{
    this.showDetail = index;
    this.subjectDetailWeather.next(this.showDetail)
  }


  // isFinished():void{
  //   this.loading = false
  //   this.subject.next(this.loading)
  // }

  // onObservable():Observable<any>{
  //   return this.subject.asObservable();
  // }
  onToggle():Observable<any>{
    return this.subjectResult.asObservable();
  }

  onSuccess():Observable<any>{
    return this.subjectReport.asObservable();
  }

  onData():Observable<any>{
    return this.subjectDetail.asObservable();
  }

  onDetail():Observable<any>{
    return this.subjectDetailWeather.asObservable();
  }

  onLoading():Observable<any>{
    return this.subjectLoading.asObservable();
  }
}
