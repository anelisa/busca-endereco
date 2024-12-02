import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { City, State } from 'src/app/services/ibge/ibge.interface';
import { IbgeService } from 'src/app/services/ibge/ibge.service';
import { AddressParams } from 'src/app/services/via-cep/via-cep.interface';
import { ViaCepService } from 'src/app/services/via-cep/via-cep.service';
import { Address } from './address.interface';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Output() loading = new EventEmitter<boolean>()

  states: State[] = []
  selectedState: string = '';
  selectedStateName: string = '';

  cities: City[] = []
  selectedCitie: string = ''

  street: string = ''

  addresses: Address[] = []


  constructor(
    private ibgeService: IbgeService,
    private viaCepService: ViaCepService,
  ) {}

  ngOnInit(): void {
    this.ibgeService.getStates().subscribe(
      {
        next: (data) => {
          this.states = data
        },
        error: (error) => {
          console.error('Ocorreu um erro', error)
        }
      }
    )
  }

  onStateChange(): void {

    const selected = this.states.find(state => state.id.toString() === this.selectedState)

    if(selected) {
      this.selectedStateName = selected.sigla
    }

    this.ibgeService.getTows(this.selectedState).subscribe({
      next: (data) => {
        this.cities = data
      },
      error: (error) => {
        console.error('Erro ao buscar cidades: ', error)
      }
    })
  }

  search(): void {
    this.loading.emit(true)

    const params: AddressParams = {
      estado: this.selectedStateName,
      cidade: this.selectedCitie,
      rua: this.street
    }
    this.viaCepService.getAddress(params).subscribe({
      next: (response) => {
        this.addresses = response
        this.loading.emit(false);
      },
      error: (err) => {
        console.error('Erro ao buscar endereço:', err);
        this.loading.emit(false);
      }
    })
  }

}
