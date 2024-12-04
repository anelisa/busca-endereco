
import { TestBed } from '@angular/core/testing';
import { AddressDetailsService } from './address-details.service';
import { AddressDetails } from '../via-cep/via-cep.interface';

describe('AddressDetailsService', () => {
  let service: AddressDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressDetailsService],
    });
    service = TestBed.inject(AddressDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the address details when calling setDetails', () => {
    const mockDetails: AddressDetails = {
      cep: '12345-678',
      logradouro: 'Rua Exemplo',
      complemento: 'Apto 101',
      unidade: '',
      bairro: 'Centro',
      localidade: 'Cidade Exemplo',
      uf: 'SP',
      estado: 'São Paulo',
      regiao: '',
      ibge: '',
      gia: '',
      ddd: '',
      siafi: '',
    };

    service.setDetails(mockDetails);

    expect(service.details).toEqual(mockDetails);
  });

  it('should return the address details when calling getDetails', () => {
    const mockDetails: AddressDetails = {
      cep: '12345-678',
      logradouro: 'Rua Exemplo',
      complemento: 'Apto 101',
      unidade: '',
      bairro: 'Centro',
      localidade: 'Cidade Exemplo',
      uf: 'SP',
      estado: 'São Paulo',
      regiao: '',
      ibge: '',
      gia: '',
      ddd: '',
      siafi: '',
    };

    service.setDetails(mockDetails);

    const result = service.getDetails();

    expect(result).toEqual(mockDetails);
  });

  it('should return undefined if getDetails is called before setDetails', () => {
    const result = service.getDetails();

    expect(result).toBeUndefined();
  });
});
