import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../models/car.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CarService } from './car.service';


@Component({
  selector: 'app-display-car',
  templateUrl: './display-car.component.html',
  styleUrls: ['./display-car.component.css']
})
export class DisplayCarComponent implements OnInit { private selectedEmployeeId: number;
  @Input() car: Car;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;

  constructor(private _route: ActivatedRoute, private _router: Router,
    private _carService: CarService) { 
      // override the route reuse strategy
		this._router.routeReuseStrategy.shouldReuseRoute = function(){
			return false;
		}
	
		this._router.events.subscribe((evt) => {
			if (evt instanceof NavigationEnd) {
			   // trick the Router into believing it's last link wasn't previously loaded
			   this._router.navigated = false;
			   // if you need to scroll back to top, here is the right place
			   window.scrollTo(0, 0);
			}
		});
    }
 
  ngOnInit() {
    console.log("Entramos al componente display car");
    console.log(this.car);
  }
  editCar(){
    this._router.navigate(['/edit', this.car.id]);
  }
  deleteCar(id){
    this._carService.deleteCar(id).subscribe(data =>{
      console.log(data);
      this._router.navigate(["list"]);
    }, err => {
      console.log(err);
    });
    this.notifyDelete.emit(id);
  }
}
