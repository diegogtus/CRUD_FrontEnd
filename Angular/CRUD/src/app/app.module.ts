import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { CarService } from './car/car.service';


import { AppComponent } from './app.component';
import { CarlistComponent } from './car/carlist.component';
import { CreateCarComponent } from './car/create-car.component';
import { from } from 'rxjs';
import { DisplayCarComponent } from './car/display-car.component';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  { path : 'list', component: CarlistComponent },
  { path : 'edit/:id', component: CreateCarComponent },
  { path : '', redirectTo : '/list', pathMatch : 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CarlistComponent,
    CreateCarComponent,
    DisplayCarComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    }), 
    FormsModule,
    HttpClientModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
