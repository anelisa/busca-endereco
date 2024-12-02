import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailAddressComponent } from './detail-address.component';

const routes: Routes = [{ path: '', component: DetailAddressComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailAddressRoutingModule { }
