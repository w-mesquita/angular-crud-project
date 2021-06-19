import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = 'http://localhost:3001/client'

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

  read(): Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl)
  }
}
