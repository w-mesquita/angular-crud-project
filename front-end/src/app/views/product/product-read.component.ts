import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductReadDataSource } from './product-read-datasource';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductCreateComponent } from 'src/app/components/product/modal-product-create/product-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductReadDataSource = new ProductReadDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['acoes', 'id', 'name', 'price'];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listarProdutos()
  }

  openModalProduct() {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: '520px',
    });
    dialogRef.afterClosed().subscribe(product => {
      this.createProduct(product);
      this.listarProdutos();
    });
  }

  createProduct(product: Product): void {
    this.productService.create(product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!');
    });
  }

  listarProdutos() {
    this.productService.read().subscribe(
      (produtos: Product[]) => {
        this.dataSource.data = produtos;
        this.table.dataSource = this.dataSource.data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      })
  }
}
