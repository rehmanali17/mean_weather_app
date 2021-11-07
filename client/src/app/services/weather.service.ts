import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentLocation } from '../interface/CurrentLocation';
import { GeoLocation } from '../interface/GeoLocation';

const httpCurrentLocationOptions = {
  params: {
    token: '29655b12b54a7f'
  }
}



@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private getCurrentLocationUrl:string = 'https://ipinfo.io/';
  private getGeoLocationUrl:string = 'https://maps.googleapis.com/maps/api/geocode/json';
  private getWeatherReportUrl:string = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }
  
  getCurrentLocation():Observable<CurrentLocation>{
    return this.http.get<CurrentLocation>(this.getCurrentLocationUrl,httpCurrentLocationOptions)
  }

  getGeoLocation(location:string):Observable<GeoLocation>{
    const httpGeoLocationOptions = {
      params: {
        address: location,
        key: "AIzaSyA5pp2iqK_3WXxINlwCyErdTNwxHXTkXcM",
      }
    }
    return this.http.get<GeoLocation>(this.getGeoLocationUrl,httpGeoLocationOptions)
  }

  getWeatherReport(location:string):Observable<any>{
    return this.http.get<any>(this.getWeatherReportUrl + location)
  }
}
