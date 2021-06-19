import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client/client.model';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients!: Client[];

  displayedColumns = [
    'acoes',
    'id',
    'nome',
    'email',
    'salario',
    'estado',
    'empresa',
    'idade',
    'sexo',
    'cpf'
  ]


constructor(
  private clientService: ClientService,
  public dialog: MatDialog
) { }

ngOnInit(): void {
  this.listarClientes()
}

listarClientes() {
  this.clientService.read().subscribe(
    (clientes: Client[]) => {
      this.clients = clientes;
      console.log(clientes)
    },
    (error: HttpErrorResponse) => {
      console.error(error);
    });
}
}
