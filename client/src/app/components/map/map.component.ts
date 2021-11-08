import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() center: google.maps.LatLngLiteral = {lat:0,lng:0}

  // subscription:Subscription;

  constructor(private weatherService: WeatherService) {
      // this.subscription = this.weatherService.onLatLng().subscribe(value => {
      //   console.log(value)
      //   this.center = {
      //     lat: value.lat,
      //     lng: value.lng,
      //   }
      // })
   }

  ngOnInit(): void {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   }
    // })
  }

}
