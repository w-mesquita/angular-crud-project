import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductCreateComponent } from 'src/app/views/product/modal-product-create/product-create.component';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductListDataSource } from './product-list-datasource';
import { ModalConfirmacaoComponent } from 'src/app/components/shared/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['acoes', 'id', 'name', 'price'];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {
    this.dataSource = new ProductListDataSource();
    this.listarProdutos()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openModalProduct(product?: Product) {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: '540px',
      data: { product }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarProdutos();
    });
  }

  openModalDeleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      width: '540px',
      data: {
        textoCancelar: 'Não',
        textoOk: 'Sim',
        texto: `Confirma exclusão do produto: <b>${product!.name}</b>?`,
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response === 1) {
        this.deleteProduct(product!);
        this.listarProdutos();
      }
    });
  }

  deleteProduct(product: Product){
    const obj = {
      id: product.id
    };
    this.productService.delete(obj).subscribe(
      (response: boolean) => {
        if (response) {
          this.productService.showMessage(
            `Produto ${product.name} removido com sucesso.`,
            'OK',
            5000,
            'success-snackbar'
          );
          this.listarProdutos();
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.productService.showMessage(
          `Erro ao remover produto.`,
          'OK',
          5000,
          'danger-snackbar'
        )
      })
  }

  listarProdutos() {
    this.productService.read().subscribe(
      (produtos: Product[]) => {
        this.dataSource.data = produtos;
        this.paginator._changePageSize(this.paginator.pageSize);// Rack para fazer a tabela ser renderizada atualizando o paginador
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      });
  }
}