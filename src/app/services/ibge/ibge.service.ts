import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from 'src/environments/api-endpoints';
import { State, City } from './ibge.interface';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  constructor( private http: HttpClient) { }

  getStates():  Observable<State[]> {
    return this.http.get<State[]>(`${API_ENDPOINTS.IBGE}/estados`)
  }

  getTows(uf: string): Observable<City[]> {
    return this.http.get<City[]>(`${API_ENDPOINTS.IBGE}/estados/${uf}/municipios`)
  }
}
