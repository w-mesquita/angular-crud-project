import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../../models/product/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product!: Product;
  productForm!: FormGroup;

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductCreateComponent>,
    private productService: ProductService
  ) {
    data && data.product ? this.product = data.product : null;
   }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      price: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.loadProduct()
  }

  loadProduct() {
    if (this.product) {
      this.productForm.get('name')!.setValue(this.product.name);
      this.productForm.get('price')!.setValue(this.product.price);
      this.productForm.get('name')!.updateValueAndValidity();
      this.productForm.get('price')!.updateValueAndValidity();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  createProduct(): void {
    this.product = Object.assign({}, this.product, this.productForm.value);
    if (!this.product.name || !this.product.price ) return // validação de campo vazio
    this.productService.create(this.product).subscribe(
      (response) => {
        if (response) {
          this.dialogRef.close('ok');
          return this.productService.showMessage('Produto criado com sucesso!', 'OK', 5000, 'success-snackbar')
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.productService.showMessage('Erro ao cadastrar produto!', 'OK', 5000, 'danger-snackbar')
      }
    )}

 editProduct(): void {
    this.product = Object.assign({}, this.product, this.productForm.value);
    if (!this.product.name || !this.product.price ) return // validação de campo vazio
    this.productService.update(this.product).subscribe(
      (response) => {
        if (response) {
          this.dialogRef.close('ok');
          return this.productService.showMessage('Produto editado com sucesso!', 'OK', 5000, 'success-snackbar')
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.productService.showMessage('Erro ao editar produto!', 'OK', 5000, 'danger-snackbar')
      }
    )}

  saveProduct() {
    if (this.product && this.product.id) {
      this.editProduct();
    } else {
      this.createProduct();
    }
  }
}