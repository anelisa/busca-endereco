import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressListComponent } from './address-list.component';
import { ViaCepService } from 'src/app/services/via-cep/via-cep.service';
import { AddressDetailsService } from 'src/app/services/address-details/address-details.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Address } from '../address-form/address.interface';
import { AddressDetails } from 'src/app/services/via-cep/via-cep.interface';

describe('AddressListComponent', () => {
  let component: AddressListComponent;
  let fixture: ComponentFixture<AddressListComponent>;
  let mockViaCepService: jest.Mocked<ViaCepService>;
  let mockAddressDetailsService: jest.Mocked<AddressDetailsService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockViaCepService = {
      getAddressDetails: jest.fn(),
    } as unknown as jest.Mocked<ViaCepService>;

    mockAddressDetailsService = {
      setDetails: jest.fn(),
    } as unknown as jest.Mocked<AddressDetailsService>;

    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [AddressListComponent],
      providers: [
        { provide: ViaCepService, useValue: mockViaCepService },
        { provide: AddressDetailsService, useValue: mockAddressDetailsService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the ViaCepService service and navigate to the details page when selecting an address', () => {
    const mockAddress: Address = {
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

    mockViaCepService.getAddressDetails.mockReturnValue(of(mockDetails));

    component.selectAddress(mockAddress);

    expect(mockViaCepService.getAddressDetails).toHaveBeenCalledWith(mockAddress.cep);

    expect(mockAddressDetailsService.setDetails).toHaveBeenCalledWith(mockDetails);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detail-address']);
  });
});
