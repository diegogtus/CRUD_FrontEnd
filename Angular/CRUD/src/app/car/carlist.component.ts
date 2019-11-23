import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from './car.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit{
  cars : Car[];

  
  constructor(private _carService: CarService, private _router: Router) { 

  }

  ngOnInit() {
    return this._carService.getCars().subscribe(data => {
      console.log(data["status"]);
      console.log(data["response"]);
      this.cars = data["response"];  

    }, error => {
      console.log(error["status"]);
      console.log(error["error"]);
    });
  }
 

}
