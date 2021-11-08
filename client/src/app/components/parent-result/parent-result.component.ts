import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { DailyReport } from 'src/app/interface/DailyReport';
import { DetailWeather } from 'src/app/interface/DetailWeather';
import { WeatherService } from 'src/app/services/weather.service';
import { SwitchService } from 'src/app/services/switch.service';
import { Favourite } from 'src/app/interface/Favourite';

@Component({
  selector: 'app-parent-result',
  templateUrl: './parent-result.component.html',
  styleUrls: ['./parent-result.component.css']
})
export class ParentResultComponent implements OnInit {
  
  @Input() dailyReport: DailyReport[] = [];
  @Input() weatherData: DetailWeather[] = [];
  @Input() location:{city:string,state:string} = { city:'', state:''};
  @Input() center: google.maps.LatLngLiteral = {lat:0,lng:0}
  showDetail:boolean = false;
  detailData:any;
  detailBtnIndex:number = -1;
  subscription: Subscription;
  favourites: Favourite[] = []
  isFavourite:boolean = false

  constructor(private uiService: UiService, private switchService: SwitchService) {

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

      

      // console.log(this.favourites)
      // console.log(this.location)
      

      this.subscription = this.switchService
        .onGetFavourite()
        .subscribe(value => {
          this.favourites = value
          this.favourites.forEach(fav => {
            if(fav.city == this.location.city && fav.state == this.location.state){
              this.isFavourite = true
            }
          })
        })

      // this.subscription = this.switchService
      //   .onGetFavourite()
      //   .subscribe(value => {
      //     this.favourites = value
      //   })
      
        

      this.subscription = this.switchService
        .onAddFavourite()
        .subscribe(value => {
          this.favourites = value
        })
        

  }

  ngOnInit(): void {
    this.switchService.getFavourites()
  }

  // onMount():void{
  //   let results = JSON.parse(localStorage.getItem('favourites') || '{}')
  //   if(results.length){
  //     this.favourites = results
  //   }else{
  //     this.favourites = []
  //   }
  //   console.log(this.favourites)
  // }

  showDailyDetail():void{
    if(this.detailBtnIndex == -1){
      return;
    }
    this.showDetail = true
    this.detailData = this.weatherData[this.detailBtnIndex]
  }

  markFavourite():void{
    this.isFavourite = true
    this.favourites = [...this.favourites,this.location];
    this.switchService.setFavourites(this.location)
  }

}
