import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { DailyReport } from 'src/app/interface/DailyReport';
import { DetailWeather } from 'src/app/interface/DetailWeather';
import { WeatherService } from 'src/app/services/weather.service';
import { Favourite } from 'src/app/interface/Favourite';
import { SwitchService } from 'src/app/services/switch.service';

@Component({
  selector: 'app-switch-results',
  templateUrl: './switch-results.component.html',
  styleUrls: ['./switch-results.component.css']
})
export class SwitchResultsComponent implements OnInit {
  showResult:boolean = false;
  showResultTab:boolean = true
  isResultTab:boolean = true
  loading:boolean = false;
  dailyReport: DailyReport[] = []
  weatherData: DetailWeather[] = [];
  favourites: Favourite[] = []
  location:{city:string,state:string} = {city:'',state:''}
  isError:boolean = false
  center: google.maps.LatLngLiteral = {lat:0,lng:0}
  
  subscription:Subscription;

  constructor(private uiService: UiService, private weatherService: WeatherService, private switchService: SwitchService) {
    this.subscription = this.uiService
        .onSuccess() 
        .subscribe(value => 
          this.dailyReport = value
      )

      this.subscription = this.switchService
        .handleError()
        .subscribe(value => {
          this.isError = value
        })

    this.subscription = this.uiService
      .onData()
      .subscribe(value => {
        this.weatherData = value 
    })

    this.subscription = this.uiService
      .onLoading()
      .subscribe(value => {
        this.loading = value
    })

    this.subscription = this.weatherService
      .onLocation()
      .subscribe(value => {
        this.location = value
      })

      this.subscription = this.uiService
      .onToggle()
      .subscribe(value => {
        this.showResult = value
      })

      this.subscription = this.switchService
        .onAddFavourite()
        .subscribe(value => {
          this.favourites = value
        })

        this.subscription = this.uiService.handleClear()
          .subscribe(value => {
            this.showResultTab = value
            this.isResultTab = value
          })

          this.subscription = this.weatherService.onLatLng().subscribe(value => {
            console.log(value)
            this.center = {
              lat: value.lat,
              lng: value.lng,
            }
          })

        
    // this.showResultTab = true
    // this.isResultTab = true

   }

  ngOnInit(): void {
    // this.showResultTab = true
    // this.isResultTab = true
  }

  showResults():void{
    this.showResultTab = true
    this.isResultTab = true
  }

  showFavourites():void{
    this.showResultTab = false
    this.isResultTab = false
  }

}
