import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Favourite } from '../interface/Favourite';
@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  private favourites: Favourite[] = []
  private isError:boolean = false;

  constructor() { 
    // this.onMount()
  }

  // onMount():void{
  //   let results = JSON.parse(localStorage.getItem('favourites') || '{}')
  //   if(results.length){
  //     this.favourites = results
  //   }else{
  //     this.favourites = []
  //   }
  // }

  private subjectFavouriteSet = new Subject<any>();
  private subjectFavouriteGet = new Subject<any>();
  private subjectError = new Subject<any>();

  onError(data:boolean):void{
    this.isError = data;
    this.subjectError.next(this.isError)
  }

  setFavourites(data: Favourite):void{
    this.favourites = [...this.favourites,data];
    localStorage.setItem('favourites',JSON.stringify(this.favourites))
    this.subjectFavouriteSet.next(this.favourites)
  }

  getFavourites():void{
      let results = JSON.parse(localStorage.getItem('favourites') || '{}')
      if(results.length){
        this.favourites = results
      }else{
        this.favourites = []
      }
      this.subjectFavouriteGet.next(this.favourites)
  }

  newFavourites(data: Favourite[]):void{
    this.favourites = data
    localStorage.setItem('favourites',JSON.stringify(this.favourites))
    this.subjectFavouriteSet.next(this.favourites)
  }

  onAddFavourite():Observable<any>{
    return this.subjectFavouriteSet.asObservable();
  }

  onGetFavourite():Observable<any>{
    return this.subjectFavouriteGet.asObservable();
  }

  handleError():Observable<any>{
    return this.subjectError.asObservable();
  }

}
