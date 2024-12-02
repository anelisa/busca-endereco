import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailAddressRoutingModule } from './detail-address-routing.module';
import { DetailAddressComponent } from './detail-address.component';


@NgModule({
  declarations: [
    DetailAddressComponent
  ],
  imports: [
    CommonModule,
    DetailAddressRoutingModule
  ]
})
export class DetailAddressModule { }
