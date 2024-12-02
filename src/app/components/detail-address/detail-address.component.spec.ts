import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailAddressComponent } from './detail-address.component';
import { AddressDetailsService } from 'src/app/services/address-details/address-details.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { Address } from '../shared/address-form/address.interface';

describe('DetailAddressComponent', () => {
  let component: DetailAddressComponent;
  let fixture: ComponentFixture<DetailAddressComponent>;
  let mockAddressDetailsService: jasmine.SpyObj<AddressDetailsService>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    mockAddressDetailsService = jasmine.createSpyObj('AddressDetailsService', ['getDetails']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

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

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar os detalhes do endereço no ngOnInit', () => {
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

    mockAddressDetailsService.getDetails.and.returnValue(mockAddress);

    component.ngOnInit();

    expect(mockAddressDetailsService.getDetails).toHaveBeenCalled();
    expect(component.details).toEqual(mockAddress);
  });

  it('deve chamar o método back do serviço Location ao clicar no botão Voltar', () => {
    component.goBack();

    expect(mockLocation.back).toHaveBeenCalled();
  });
});
