import { Injectable } from '@angular/core';
import { AddressDetails } from '../via-cep/via-cep.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressDetailsService {

  details?: AddressDetails

  constructor() { }

  setDetails(details: AddressDetails): void {
    this.details = details
  }

  getDetails(): AddressDetails | undefined {
    return this.details;
  }
}
