import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class CarService {
  
	public headers: Headers;
	httpOptions: any;
  constructor(private httpClient: HttpClient) {}
      getCars() {
      return  this.httpClient.get('http://3.135.212.39:8000/api/v1/cars/');
    }
    getCar(id: string){
      return this.httpClient.get('http://3.135.212.39:8000/api/v1/cars/' +  id)
      .pipe(
        catchError(this.handleError)
      )
  }
  save(car: Car){
    
      console.log("Carro a enviar");
      console.log(car);
      this.httpOptions = {
        headers: new HttpHeaders({
        'Accept':  'application/json',
        'Content-Type': 'application/json',
        })
      };
      return this.httpClient.post('http://3.135.212.39:8000/api/v1/cars/', car, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
   }

  updateCar(car: Car){
      console.log("Carro a editar");
      console.log(car._id);
      this.httpOptions = {
        headers: new HttpHeaders({
        'Accept':  'application/json',
        'Content-Type': 'application/json',
        })
      };
      return this.httpClient.put('http://3.135.212.39:8000/api/v1/cars/' +  car._id, car, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteCar(id){
    console.log("id a enviar", id);
    return  this.httpClient.delete('http://3.135.212.39:8000/api/v1/cars/' + id)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
