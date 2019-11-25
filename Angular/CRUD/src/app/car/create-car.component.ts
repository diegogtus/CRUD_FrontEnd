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
car: Car = new Car("", "", "", 0, 0, "", "");
  constructor(private _carService: CarService, private _router: Router,
    private _route: ActivatedRoute) {

   }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      //const id = "5dd957ccae650461ec45dcdd";
      console.log("este es el id recibido", id);
      this.getCar(id);
    });
  }
private getCar(id: string){
  if(id == "0"){
    this.car = {
      _id : null,
      brand : null,
      model : null,
      year : 0,
      displacement : 0,
      description : null,
      path : null
    };
    console.log("Carro Vacio");
    this.panelTitle = 'Create';
  } else{
    this.panelTitle = 'Edit';
    this._carService.getCar(id).subscribe(data=> {
      console.log("Edit response - data:");
      console.log(data);
      this.car = <any>data;
    }, err => {
      alert(err);
    });
  }
}

  saveCar() : void {
    if (this.car._id == null) {
      const newCar: Car = Object.assign({}, this.car);
      this._carService.save(newCar).subscribe(data=> {
        console.log("Create");
        console.log(data);
        this._router.navigate(['list']);
      }, err => {
        alert(err);
      });
    } else {
      const newCar: Car = Object.assign({}, this.car);
      this._carService.updateCar(newCar).subscribe( () => {
        console.log("Update");
        this._router.navigate(['list']);
      }, err => {
      alert(err);
    });
    }
    
  }
}
