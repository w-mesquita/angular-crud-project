import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductCreateComponent } from './components/product/modal-product-create/product-create.component'
import { ProductListComponent } from './views/product/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'products',
    component: ProductListComponent
  }, {
    path: 'products/create',
    component: ProductCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
