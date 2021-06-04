import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductCreateComponent } from './components/product/modal-product-create/product-create.component'
import { ProductReadComponent } from './views/product/product-read.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'products',
    component: ProductReadComponent
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
