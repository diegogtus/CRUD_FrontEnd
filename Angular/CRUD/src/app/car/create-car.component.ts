import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarService } from './car.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {
panelTitle: string;
car: Car;
  constructor(private _carService: CarService, private _router: Router,
    private _route: ActivatedRoute) {

   }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getCar(id);
    });
  }
private getCar(id: number){
  if(id === 0){
    this.car = {
      id : null,
      brand : null,
      model : null,
      year : 0,
      displacement : 0,
      description : null,
      photoPath : null
  
    };
    this.panelTitle = 'Create';
  } else{
    this.panelTitle = 'Edit';
    //this.car =  this._carService.getCar(id);
  }
}

  saveCar() : void {
    const newCar: Car = Object.assign({}, this.car);
    this._carService.save(newCar).subscribe(data=> {
      console.log("Create");
      console.log(data);
      this._router.navigate(['list']);
    }, err => {
      alert(err);
    });
  }
}
