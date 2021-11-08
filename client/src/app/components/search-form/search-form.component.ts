import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { UiService } from 'src/app/services/ui.service';
import { DailyReport } from 'src/app/interface/DailyReport';
import { DetailWeather } from 'src/app/interface/DetailWeather';
import { Subscription } from 'rxjs';
import { SwitchService } from 'src/app/services/switch.service';

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
  initial_check:boolean = true;
  current:boolean = false;
  currentLocation:any;
  // isError:boolean = false
  dailyReport: DailyReport[] = [];
  weatherData: DetailWeather[] = [];
  AutoComplete: {city:string,state:string}[] = []
  // options:any = {
  //   types: ['(cities)'],
  //   componentRestrictions: { country: 'USA' }
  // }
  // options="{
  //   types: [],
  //   componentRestrictions: { country: 'UA' }
  //   }"
  // subscription:Subscription; 

  constructor(private weatherService: WeatherService, private uiService: UiService, private switchService: SwitchService) {
    // this.subscription = this.uiService
    //   .onToggle()
    //   .subscribe(value => {
    //     console.log(value)
    //     this.showResult = value
    //   })
    // this.subscription = this.uiService
    //     .handleError()
    //     .subscribe(value => {
    //       this.isError = value
    //     })
  }

  ngOnInit(): void {
  }

  // toggleViewResults(){
    
  // }

  getLocation():void {
    if(this.current === true){
      this.uiService.showViewResults();
      this.uiService.isLoading()
      let tempLoc = this.currentLocation.loc
      tempLoc = tempLoc.split(",")
      this.weatherService.bindLatLng(Number(tempLoc[0]),Number(tempLoc[1]))
      this.weatherService.bindLocation(this.currentLocation.city,this.currentLocation.region)
      let currentLocation = this.currentLocation.loc
      this.weatherService.getWeatherReport(currentLocation)
        .subscribe((data)=>{
          this.uiService.isLoading()
          if(data.length == 0){
            this.switchService.onError(true)
          }else{
            this.dailyReport = data.formattedResults
            this.weatherData = data.rawResults
            this.uiService.bindDialyReport(this.dailyReport)
            this.uiService.bindWeatherData(this.weatherData)
          }
          
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
          // console.log(location)
          const city = location.results[0].address_components[3].long_name
          const state = location.results[0].address_components[5].long_name
          this.weatherService.bindLocation(city,state)
          const { lat, lng } = location.results[0].geometry.location
          this.weatherService.bindLatLng(lat,lng)
          let geoLocation = lat + "," + lng
          this.weatherService.getWeatherReport(geoLocation)
            .subscribe((data)=>{
              this.uiService.isLoading()
              if(data.length == 0){
                this.switchService.onError(true)
              }else{
                this.dailyReport = data.formattedResults
                this.weatherData = data.rawResults
                this.uiService.bindDialyReport(this.dailyReport)
                this.uiService.bindWeatherData(this.weatherData)
              }
              
            })
        })
    }
    
  }

  handleStreet():void{
    if(this.street == ''){
        this.street_check = true
    }else{
      this.street_check = false
      this.initial_check = false
    }
  }

  handleCity():void{
    if(this.city == ''){
        this.city_check = true
    }else{
      this.city_check = false
      this.initial_check = false
    }
  }

  onKey(event:any):void{
    console.log(event.target.value)
    this.weatherService.getAutoComplete(event.target.value)
      .subscribe(value => {
        this.AutoComplete = value.predictions.map((pred: { terms: { value: any; }[]; }) => {
          return {
            city: pred.terms[0].value,
            state: pred.terms[1].value
          }
        }) 
        console.log(this.AutoComplete)
      })

  }

  handleState():void{
    if(this.state == ''){
        this.state_check = true
    }else{
      this.state_check = false
      this.initial_check = false
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

  handleLocation():void{
    if(this.current == true){
      this.weatherService.getCurrentLocation()
        .subscribe((location) => {
          // let tempLoc = location.loc
          // tempLoc = tempLoc.split(",")
          // this.weatherService.bindLatLng(Number(tempLoc[0]),Number(tempLoc[1]))
          // this.weatherService.bindLocation(location.city,location.region)
          this.currentLocation = location
          this.initial_check = false;
          this.street_check = false;
          this.city_check = false;
          this.state_check = false
        })
    }else{
      this.initial_check = true
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
    this.switchService.onError(false)
    this.uiService.onClear(true)
    this.initial_check = true
  }

}
