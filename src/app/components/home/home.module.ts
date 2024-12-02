import { AddressFormComponent } from './../shared/address-form/address-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AddressListComponent } from '../shared/address-list/address-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddressFormComponent,
    AddressListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ],
})
export class HomeModule {}
