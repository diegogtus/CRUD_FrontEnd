import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarService } from './car.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
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
    this.panelTitle = 'Edit';
    this._carService.getCar(id).subscribe(data=> {
      console.log("Edit response - data:");
      console.log(data);
      this.car = <any>data;
    }, err => {
      alert(err);
    });
}
cancel():void{
    this._router.navigate(['list']);
}
  saveCar() : void {
   
      const newCar: Car = Object.assign({}, this.car);
      this._carService.updateCar(newCar).subscribe( () => {
        console.log("Update");
        this._router.navigate(['list']);
      }, err => {
      alert(err);
    });
    
    
  }
}
