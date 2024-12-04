
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IbgeService } from './ibge.service';
import { State, City } from './ibge.interface';
import { API_ENDPOINTS } from 'src/environments/api-endpoints';
import { HttpClient } from '@angular/common/http';

describe('IbgeService', () => {
  let service: IbgeService;
  let mockHttpClient: any;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        IbgeService,
        { provide: HttpClient, useValue: mockHttpClient },
      ],
    });

    service = TestBed.inject(IbgeService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getStates', () => {
    it('deve retornar uma lista de estados', (done) => {
      const mockStates: State[] = [
        { id: 1, sigla: 'SP', nome: 'São Paulo', regiao: { id: 1, sigla: 'SE', nome: 'Sudeste' } },
        { id: 2, sigla: 'RJ', nome: 'Rio de Janeiro', regiao: { id: 1, sigla: 'SE', nome: 'Sudeste' } },
      ];

      mockHttpClient.get.mockReturnValue(of(mockStates));

      service.getStates().subscribe((states) => {
        expect(states).toEqual(mockStates);
        expect(mockHttpClient.get).toHaveBeenCalledWith(`${API_ENDPOINTS.IBGE}/estados`);
        done();
      });
    });

    it('deve lidar com erros ao buscar estados', (done) => {
      const errorMessage = 'Erro ao buscar estados';

      mockHttpClient.get.mockReturnValue(throwError(() => ({ status: 500, statusText: errorMessage })));

      service.getStates().subscribe({
        next: () => {
          fail('A chamada deve falhar');
        },
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe(errorMessage);
          expect(mockHttpClient.get).toHaveBeenCalledWith(`${API_ENDPOINTS.IBGE}/estados`);
          done();
        }
      }

      );
    });
  });

  describe('getTows', () => {
    it('deve retornar uma lista de municípios', (done) => {
      const uf = 'SP';
      const mockCities: City[] = [
        {
          id: 1,
          nome: 'São Paulo',
          microrregiao: {
            id: 101,
            nome: 'Microrregião de São Paulo',
            mesorregiao: {
              id: 1001,
              nome: 'Mesorregião Metropolitana de São Paulo',
              UF: {
                id: 35,
                sigla: 'SP',
                nome: 'São Paulo',
                regiao: {
                  id: 3,
                  sigla: 'SE',
                  nome: 'Sudeste',
                },
              },
            },
          },
        },
        {
          id: 2,
          nome: 'Campinas',
          microrregiao: {
            id: 102,
            nome: 'Microrregião de Campinas',
            mesorregiao: {
              id: 1002,
              nome: 'Mesorregião de Campinas',
              UF: {
                id: 35,
                sigla: 'SP',
                nome: 'São Paulo',
                regiao: {
                  id: 3,
                  sigla: 'SE',
                  nome: 'Sudeste',
                },
              },
            },
          },
        },
      ];

      mockHttpClient.get.mockReturnValue(of(mockCities));

      service.getTows(uf).subscribe((cities) => {
        expect(cities).toEqual(mockCities);
        expect(mockHttpClient.get).toHaveBeenCalledWith(`${API_ENDPOINTS.IBGE}/estados/${uf}/municipios`);
        done();
      });
    });

    it('deve lidar com erros ao buscar municípios', (done) => {
      const uf = 'SP';
      const errorMessage = 'Erro ao buscar municípios';

      mockHttpClient.get.mockReturnValue(throwError(() =>({ status: 404, statusText: errorMessage })));

      service.getTows(uf).subscribe({
        next: () => {
          fail('A chamada deve falhar');
        },
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe(errorMessage);
          expect(mockHttpClient.get).toHaveBeenCalledWith(`${API_ENDPOINTS.IBGE}/estados/${uf}/municipios`);
          done();
        },
      });
    });
  });
});
