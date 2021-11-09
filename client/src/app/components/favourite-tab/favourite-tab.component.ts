import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Favourite } from 'src/app/interface/Favourite';
import { SwitchService } from 'src/app/services/switch.service';
import { UiService } from 'src/app/services/ui.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-favourite-tab',
  templateUrl: './favourite-tab.component.html',
  styleUrls: ['./favourite-tab.component.css']
})
export class FavouriteTabComponent implements OnInit {
  @Input() favourites: Favourite[] = []
  subscription: Subscription;

  constructor(private switchService: SwitchService, private uiService: UiService, private weatherService: WeatherService) { 
    this.subscription = this.switchService
        .onGetFavourite()
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

  deleteFav(index:number):void{
    let newFav = this.favourites.filter((fav,i) => i != index)
    this.switchService.newFavourites(newFav)
  }

  fetchFavResults(data:string,city:string,state:string):void{
    this.uiService.showViewResults()
    this.uiService.onHideFavTab();
    this.uiService.isLoading()
    this.weatherService.bindLocation(city,state,data)
    this.weatherService.getWeatherReport(data)
      .subscribe((data)=>{
        this.uiService.isLoading()
        if(data.length == 0){
          this.switchService.onError(true)
        }else{
          this.uiService.bindDialyReport(data.formattedResults)
          this.uiService.bindWeatherData(data.rawResults)
        }
        
      })
  }

}
