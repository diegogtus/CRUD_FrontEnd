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
    private listCar: Car[] = [
        {
          id: "1",
          brand: 'Chevrolet',
          model: 'Camaro',
          year: 2019,
          displacement: 4,
          description: 'The main character of transformers.',
          photoPath: '../../assets/images/camaro.jpg',
    
        },
        {
          id: "2",
          brand: 'Ford',
          model: 'Mustang',
          year: 2019,
          displacement: 4,
          description: 'The bad guy of Transformers.',
          photoPath: '../../assets/images/mustang.jpg',
    
        },
        {
          id: "3",
          brand: 'Subaru',
          model: 'BRZ',
          year: 2019,
          displacement: 4,
          description: 'The new super cheap car.',
          photoPath: '../../assets/images/brz.jpg',
    
        },
      ];
    getCars():  Observable<Car[]> {
      return  this.httpClient.get<Car[]>('http://localhost:8000/api/v1/cars/');
      
    }
    getCar(id: string):  Observable<Car[]> {
      return  this.httpClient.get<Car[]>('http://localhost:8000/api/v1/cars/:id');
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
    return this.httpClient.post('http://localhost:8000/api/v1/cars/', car, this.httpOptions)
		.pipe(
			catchError(this.handleError)
		)
    /* if("brand": car.id === null){
      const maxid = this.listCar.reduce(function(e1, e2){
        return (e1.id > e2.id) ? e1 : e2;
      }).id;
      car.id = maxid + 1 ;
      this.listCar.push(car);
    } else {
      const foundIndex = this.listCar.findIndex(e => e.id === car.id);
      this.listCar[foundIndex] = car;
    } */
  }

  deleteCar(id){
    console.log("id a enviar", id);
    return  this.httpClient.delete('http://localhost:8000/api/v1/cars/' + id)
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