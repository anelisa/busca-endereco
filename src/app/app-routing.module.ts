import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  { path: '*', redirectTo: '' },
  { path: 'detail-address', loadChildren: () => import('./components/detail-address/detail-address.module').then(m => m.DetailAddressModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
