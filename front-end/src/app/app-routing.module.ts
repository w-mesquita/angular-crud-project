import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './views/client/client.component';

import { HomeComponent } from './views/home/home.component';
import { ProductCreateComponent } from './views/product/modal-product-create/product-create.component'
import { ProductListComponent } from './views/product/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'products',
    component: ProductListComponent
  }, {
    path: 'clients',
    component: ClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
