import { Component, OnInit } from '@angular/core';
import { Address } from '../shared/address-form/address.interface';
import { AddressDetailsService } from 'src/app/services/address-details/address-details.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-address',
  templateUrl: './detail-address.component.html',
  styleUrls: ['./detail-address.component.scss']
})
export class DetailAddressComponent implements OnInit{

  details?: Address

  constructor(private addressDetailsService: AddressDetailsService, private location: Location) {}

  ngOnInit(): void {

    this.details = this.addressDetailsService.getDetails();
  }

  goBack() {
    this.location.back()
  }

}
