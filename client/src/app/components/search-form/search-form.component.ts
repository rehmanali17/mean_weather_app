import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { DailyReport } from 'src/app/interface/DailyReport';
import { DetailWeather } from 'src/app/interface/DetailWeather';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  street:string = "";
  city: string = "";
  state:string = "";
  street_check:boolean = false;
  city_check:boolean = false;
  state_check:boolean = false;
  current:boolean = false;
  // showResult:boolean = false;
  // loading:boolean = true;
  dailyReport: DailyReport[] = [];
  weatherData: DetailWeather[] = [];
  // subscription:Subscription; 

  constructor(private weatherService: WeatherService, private uiService: UiService) {
    // this.subscription = this.uiService
    //   .onToggle()
    //   .subscribe(value => {
    //     console.log(value)
    //     this.showResult = value
    //   })
  }

  ngOnInit(): void {
  }

  // toggleViewResults(){
    
  // }

  getLocation():void {
    if(this.current === true){
      this.uiService.showViewResults();
      this.uiService.isLoading()
      this.weatherService.getCurrentLocation()
        .subscribe((location) => {
          let currentLocation = location.loc
          this.weatherService.getWeatherReport(currentLocation)
            .subscribe((data)=>{
              this.uiService.isLoading()
              this.dailyReport = data.formattedResults
              this.weatherData = data.rawResults
              this.uiService.bindDialyReport(this.dailyReport)
              this.uiService.bindWeatherData(this.weatherData)
            })
        })
    }else{
      let tempCheck = false;
      this.street_check = false;
      this.city_check = false;
      this.state_check = false;
      if(this.street === ''){
        this.street_check = true
        tempCheck = true
      }
      if(this.city === ''){
        this.city_check = true
        tempCheck = true
      }
      if(this.state === ''){
        this.state_check = true
        tempCheck = true
      }
      if(tempCheck === true){
        return;
      }
      this.uiService.showViewResults();
      this.uiService.isLoading()
      let location = this.street + " " + this.city + " " + this.state
      this.weatherService.getGeoLocation(location)
        .subscribe((location) => {
          const { lat, lng } = location.results[0].geometry.location
          let geoLocation = lat + "," + lng
          this.weatherService.getWeatherReport(geoLocation)
            .subscribe((data)=>{
              this.uiService.isLoading();
              this.dailyReport = data.formattedResults
              this.weatherData = data.rawResults
              this.uiService.bindDialyReport(this.dailyReport)
              this.uiService.bindWeatherData(this.weatherData)
            })
        })
    }
    
  }

  isChecked():boolean {
    if(this.current == true){
      this.street_check = false;
      this.city_check = false;
      this.state_check = false;
      return true;
    }else{
      return false;
    }
  }

  clearForm():void{
    this.uiService.hideViewResults();
    this.uiService.toggleShow(-1);
    this.street = '';
    this.city = '';
    this.state = '';
    this.street_check = false;
    this.city_check = false;
    this.state_check = false;
    this.current = false;
  }

}
