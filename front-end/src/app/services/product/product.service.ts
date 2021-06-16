import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product, ProductDeleteRequest } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products'

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
    ) { }

  showMessage(
    message: string,
    action: string,
    duration: number,
    panelClass = 'default-snackbar'
  ): any {
    this.snackBar.open(message, action, {
      duration,
      panelClass
    })
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product)
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }

  // readById(id: string): Observable<Product>{
  //   return this.http.get<Product>(`${this.baseUrl}/${id}`)
  // }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product)
  }

  delete(obj: ProductDeleteRequest): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/${obj.id}`)
  }
}

