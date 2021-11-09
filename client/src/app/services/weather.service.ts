import { Injectable } from '@angular/core';
import { Observable, Subject,of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

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
  private autoCompleteUrl:string = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBzTk-tyj9744DGGF_InEfksRlAyhSkHtk&input=';
  private location:{city:string,state:string,lat_lng:string} = {city:'',state:'',lat_lng:''}
  private latlng:{lat:number,lng:number} = {lat:0,lng:0}

  private subjectLoc = new Subject<any>()
  private subjectLatLng = new Subject<any>()

  constructor(private http: HttpClient) { }
  
  getCurrentLocation():Observable<any>{
    return this.http.get<any>(this.getCurrentLocationUrl,httpCurrentLocationOptions)
  }

  getGeoLocation(location:string):Observable<any>{
    const httpGeoLocationOptions = {
      params: {
        address: location,
        key: "AIzaSyA5pp2iqK_3WXxINlwCyErdTNwxHXTkXcM",
      }
    }
    return this.http.get<any>(this.getGeoLocationUrl,httpGeoLocationOptions)
  }

  getAutoComplete(input:string):Observable<any>{
    return this.http.get<any>(this.autoCompleteUrl + input)
  }

  getWeatherReport(location:string):Observable<any>{
    return this.http.get<any>(this.getWeatherReportUrl + location).pipe(
      catchError(error => {
          // if (error.error instanceof ErrorEvent) {
          //   console.log(error.error.message)
          //     // this.errorMsg = `Error: ${error.error.message}`;
          // } else {
            
          //   console.log(error.error.message)
          //     // this.errorMsg = `Error: ${error.message}`;
          // }
          // return of;
          return of([]);
      })
  );
  }


  bindLocation(city:string,state:string,lat_lng:string):void{
    this.location.city = city
    this.location.state = state
    this.location.lat_lng = lat_lng
    this.subjectLoc.next(this.location)
  }

  bindLatLng(lat:number,lng:number):void{
    this.latlng.lat = lat
    this.latlng.lng = lng
    this.subjectLatLng.next(this.latlng)
  }

  onLocation():Observable<any>{
    return this.subjectLoc.asObservable();
  }

  onLatLng():Observable<any>{
    return this.subjectLatLng.asObservable();
  }

}
