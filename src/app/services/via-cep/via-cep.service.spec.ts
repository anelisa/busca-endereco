import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViaCepService } from './via-cep.service';
import { Address, AddressDetails, AddressParams } from './via-cep.interface';
import { API_ENDPOINTS } from 'src/environments/api-endpoints';

describe('ViaCepService', () => {
  let service: ViaCepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViaCepService],
    });

    service = TestBed.inject(ViaCepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getAddress', () => {
    it('deve retornar uma lista de endereços', () => {
      const mockParams: AddressParams = {
        estado: 'SP',
        cidade: 'São Paulo',
        rua: 'Rua Exemplo',
      };

      const mockResponse: Address[] = [
        {
          cep: "12345-678",
          logradouro: "Rua Exemplo",
          complemento: "Apto 101",
          unidade: "Unidade 1",
          bairro: "Centro",
          localidade: "São Paulo",
          uf: "SP",
          estado: "São Paulo",
          regiao: "Sudeste",
          ibge: "1234567",
          gia: "1234",
          ddd: "11",
          siafi: "5678",
        }
      ];

      service.getAddress(mockParams).subscribe((addresses) => {
        expect(addresses).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${API_ENDPOINTS.VIA_CEP}/${mockParams.estado}/${mockParams.cidade}/${mockParams.rua}/json/`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
  });

  describe('getAddressDetails', () => {
    it('deve retornar os detalhes de um endereço', () => {
      const mockCep = '12345-678';
      const mockResponse: AddressDetails = {
        cep: "12345-678",
        logradouro: "Avenida Central",
        complemento: "Bloco B, Apto 202",
        unidade: "Unidade 2",
        bairro: "Jardim das Flores",
        localidade: "Rio de Janeiro",
        uf: "RJ",
        estado: "Rio de Janeiro",
        regiao: "Sudeste",
        ibge: "3304557",
        gia: "5678",
        ddd: "21",
        siafi: "6001",
      };

      service.getAddressDetails(mockCep).subscribe((details) => {
        expect(details).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${API_ENDPOINTS.VIA_CEP}/${mockCep}/json`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse); 
    });
  });
});
