import { Component, Input } from '@angular/core';
import { Address } from '../address-form/address.interface';
import { ViaCepService } from 'src/app/services/via-cep/via-cep.service';
import { AddressDetailsService } from 'src/app/services/address-details/address-details.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent {

  @Input() addresses: Address[] = [];

  constructor( private viaCepService: ViaCepService, private addressDetailsService: AddressDetailsService, private router: Router) {}

  selectAddress(address: Address): void {
    this.viaCepService.getAddressDetails(address.cep).subscribe({
      next: (details) => {
        this.addressDetailsService.setDetails(details)
        this.router.navigate(['/detail-address'])
      }
    })
  }
}
