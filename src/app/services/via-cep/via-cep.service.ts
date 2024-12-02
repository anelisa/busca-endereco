import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, AddressDetails, AddressParams } from './via-cep.interface';
import { API_ENDPOINTS } from 'src/environments/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor( private http: HttpClient) { }

  getAddress(params: AddressParams): Observable<Address[]> {
    const { estado, cidade, rua } = params;
    return this.http.get<Address[]>(`${API_ENDPOINTS.VIA_CEP}/${estado}/${cidade}/${rua}/json/`)
  }

  getAddressDetails(cep: string): Observable<AddressDetails> {
    return this.http.get<AddressDetails>(`${API_ENDPOINTS.VIA_CEP}/${cep}/json`)
  }
}
