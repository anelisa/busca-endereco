import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailAddressComponent } from './detail-address.component';
import { AddressDetailsService } from 'src/app/services/address-details/address-details.service';
import { Location } from '@angular/common';
import { Address } from '../shared/address-form/address.interface';

describe('DetailAddressComponent', () => {
  let component: DetailAddressComponent;
  let fixture: ComponentFixture<DetailAddressComponent>;
  let mockAddressDetailsService: jest.Mocked<AddressDetailsService>;
  let mockLocation: jest.Mocked<Location>;

  beforeEach(async () => {
    mockAddressDetailsService = {
      getDetails: jest.fn(),
      setDetails: jest.fn(),
    } as unknown as jest.Mocked<AddressDetailsService>;

    mockLocation = {
      back: jest.fn(),
    } as unknown as jest.Mocked<Location>;

    await TestBed.configureTestingModule({
      declarations: [DetailAddressComponent],
      providers: [
        { provide: AddressDetailsService, useValue: mockAddressDetailsService },
        { provide: Location, useValue: mockLocation },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAddressComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the address details in ngOnInit', () => {
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
    mockAddressDetailsService.getDetails.mockReturnValue(mockAddress);
    component.ngOnInit();
    expect(mockAddressDetailsService.getDetails).toHaveBeenCalled();
    expect(component.details).toEqual(mockAddress);
  });

  it('should call the back method of the Location service when executing goBack', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
