
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressFormComponent } from './address-form.component';
import { IbgeService } from 'src/app/services/ibge/ibge.service';
import { ViaCepService } from 'src/app/services/via-cep/via-cep.service';
import { of, throwError } from 'rxjs';
import { State, City } from 'src/app/services/ibge/ibge.interface';
import { AddressParams } from 'src/app/services/via-cep/via-cep.interface';
import { Address } from './address.interface';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let mockIbgeService: jest.Mocked<IbgeService>;
  let mockViaCepService: jest.Mocked<ViaCepService>;

  beforeEach(async () => {
    mockIbgeService = {
      getStates: jest.fn(),
      getTows: jest.fn(),
    } as unknown as jest.Mocked<IbgeService>;

    mockViaCepService = {
      getAddress: jest.fn(),
    } as unknown as jest.Mocked<ViaCepService>;

    await TestBed.configureTestingModule({
      declarations: [AddressFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: IbgeService, useValue: mockIbgeService },
        { provide: ViaCepService, useValue: mockViaCepService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);

    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the cities select field when no state is selected',async  () => {
    mockIbgeService.getStates.mockReturnValue(of([]));
    component.selectedState = '';

    fixture.detectChanges();
    await fixture.whenStable();

    const citiesSelect = fixture.debugElement.query(By.css('select[name="cities"]')).nativeElement;

    expect(citiesSelect.disabled).toBeTruthy();
  });

  it('should enable the cities select field when a state is selected', () => {

    component.selectedState = 'SP';

    const citiesSelect = fixture.debugElement.query(By.css('select[name="cities"]')).nativeElement;

    expect(citiesSelect.disabled).toBeFalsy();
  });

  it('should disable the search button when no fields are filled',async () => {
    mockIbgeService.getStates.mockReturnValue(of([]));
    component.selectedState = '';
    component.selectedCitie = '';
    component.street = '';
    fixture.detectChanges();

    await fixture.whenStable();

    const searchButton = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(searchButton.disabled).toBe(true);
  });

  it('should disable the search button when only the state is selected', async () => {
    mockIbgeService.getStates.mockReturnValue(of([]));
    component.selectedState = '1';
    component.selectedCitie = '';
    component.street = '';
    fixture.detectChanges();
    await fixture.whenStable();


    const searchButton = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(searchButton.disabled).toBe(true);
  });

  it('should disable the search button when state and city are selected but street is empty',async () => {
    mockIbgeService.getStates.mockReturnValue(of([]));

    component.selectedState = '1';
    component.selectedCitie = 'São Paulo';
    component.street = '';
    fixture.detectChanges();

    await fixture.whenStable();

    const searchButton = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(searchButton.disabled).toBe(true);
  });

  it('should enable the search button when all fields are filled',async () => {
    mockIbgeService.getStates.mockReturnValue(of([]));

    component.selectedState = '1';
    component.selectedCitie = 'São Paulo';
    component.street = 'Rua A';
    fixture.detectChanges();

    await fixture.whenStable();

    const searchButton = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(searchButton.disabled).toBe(false);
  });

  describe('ngOnInit', () => {
    it('should load the states successfully', () => {
      const mockStates: State[] = [
        { id: 1, sigla: 'SP', nome: 'São Paulo', regiao: { id: 1, sigla: 'SE', nome: 'Sudeste' } },
        { id: 2, sigla: 'RJ', nome: 'Rio de Janeiro', regiao: { id: 1, sigla: 'SE', nome: 'Sudeste' } },
      ];
      mockIbgeService.getStates.mockReturnValue(of(mockStates));

      component.ngOnInit();

      expect(mockIbgeService.getStates).toHaveBeenCalled();
      expect(component.states).toEqual(mockStates);
    });

    it('should handle error when loading states', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockIbgeService.getStates.mockReturnValue(throwError(() => new Error('Erro ao buscar estados')));

      component.ngOnInit();

      expect(mockIbgeService.getStates).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();

      const [message, error] = consoleSpy.mock.calls[0];

      expect(message).toBe('Ocorreu um erro');

      expect(error).toBeInstanceOf(Error);

      expect(error.message).toBe('Erro ao buscar estados');

      consoleSpy.mockRestore();
  });
  });

  describe('onStateChange', () => {
    it('should load cities successfully when changing state', () => {
      const mockCities: City[] = [
        { id: 1, nome: 'São Paulo', microrregiao: { id: 1, nome: 'Microrregião', mesorregiao: { id: 1, nome: 'Mesorregião', UF: { id: 1, sigla: 'SP', nome: 'São Paulo', regiao: { id: 1, sigla: 'SE', nome: 'Sudeste' } } } } },
        { id: 2, nome: 'Campinas', microrregiao: { id: 2, nome: 'Microrregião', mesorregiao: { id: 2, nome: 'Mesorregião', UF: { id: 1, sigla: 'SP', nome: 'São Paulo', regiao: { id: 1, sigla: 'SE', nome: 'Sudeste' } } } } },
      ];
      component.states = [{ id: 1, sigla: 'SP', nome: 'São Paulo', regiao: { id: 1, sigla: 'SE', nome: 'Sudeste' } }];
      component.selectedState = '1';
      mockIbgeService.getTows.mockReturnValue(of(mockCities));

      component.onStateChange();

      expect(mockIbgeService.getTows).toHaveBeenCalledWith('1');
      expect(component.cities).toEqual(mockCities);
      expect(component.selectedStateName).toBe('SP');
    });

    it('should handle error when loading cities', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      component.states = [{ id: 1, sigla: 'SP', nome: 'São Paulo', regiao: { id: 1, sigla: 'SE', nome: 'Sudeste' } }];
      component.selectedState = '1';
      mockIbgeService.getTows.mockReturnValue(throwError(() => new Error('Erro ao buscar cidades')));

      component.onStateChange();

      expect(mockIbgeService.getTows).toHaveBeenCalledWith('1');
      expect(consoleSpy).toHaveBeenCalled();

      const [message, error] = consoleSpy.mock.calls[0];
      expect(message).toBe('Erro ao buscar cidades: ');
      expect(error).toBeInstanceOf(Error);

      consoleSpy.mockRestore();
    });
  });

  describe('search', () => {
    it('should fetch the addresses successfully', () => {
      const mockAddresses: Address[] = [
        {
          bairro: "Maria Eugênia",
          cep: "38441-141",
          complemento: "até 749/750",
          ddd: "34",
          estado: "Minas Gerais",
          gia: "",
          ibge: "3103504",
          localidade: "Araguari",
          logradouro: "Rua Tocantins",
          regiao: "Sudeste",
          siafi: "4069",
          uf: "MG",
          unidade: ""
        }
      ];
      component.selectedStateName = 'SP';
      component.selectedCitie = 'São Paulo';
      component.street = 'Rua Exemplo';
      const loadingSpy = jest.spyOn(component.loading, 'emit');
      mockViaCepService.getAddress.mockReturnValue(of(mockAddresses));

      component.search();

      expect(loadingSpy).toHaveBeenCalledWith(true);
      expect(mockViaCepService.getAddress).toHaveBeenCalledWith({
        estado: 'SP',
        cidade: 'São Paulo',
        rua: 'Rua Exemplo',
      } as AddressParams);
      expect(component.addresses).toEqual(mockAddresses);
      expect(loadingSpy).toHaveBeenCalledWith(false);
    });

    it('should handle error when searching for addresses', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const loadingSpy = jest.spyOn(component.loading, 'emit');
      component.selectedStateName = 'SP';
      component.selectedCitie = 'São Paulo';
      component.street = 'Rua Exemplo';
      mockViaCepService.getAddress.mockReturnValue(throwError(() => new Error('Erro ao buscar endereço')));

      component.search();

      expect(loadingSpy).toHaveBeenCalledWith(true);
      expect(mockViaCepService.getAddress).toHaveBeenCalledWith({
        estado: 'SP',
        cidade: 'São Paulo',
        rua: 'Rua Exemplo',
      } as AddressParams);

      expect(consoleSpy).toHaveBeenCalled();
      const [message, error] = consoleSpy.mock.calls[0];

      expect(message).toBe('Erro ao buscar endereço:');
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Erro ao buscar endereço');

      expect(loadingSpy).toHaveBeenCalledWith(false);

      consoleSpy.mockRestore();
    });
  });
});
