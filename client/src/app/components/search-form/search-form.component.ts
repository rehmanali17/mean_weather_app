import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

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

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getLocation():void {
    if(this.current === true){
      this.weatherService.getCurrentLocation()
        .subscribe((location) => {
          let currentLocation = location.loc
          this.weatherService.getWeatherReport(currentLocation)
            .subscribe((data)=>{
              console.log(data)
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
      let location = this.street + " " + this.city + " " + this.state
      this.weatherService.getGeoLocation(location)
        .subscribe((location) => {
          const { lat, lng } = location.results[0].geometry.location
          let geoLocation = lat + "," + lng
          this.weatherService.getWeatherReport(geoLocation)
            .subscribe((data)=>{
              console.log(data)
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
    this.street = '';
    this.city = '';
    this.state = '';
    this.street_check = false;
    this.city_check = false;
    this.state_check = false;
    this.current = false;
  }

}
