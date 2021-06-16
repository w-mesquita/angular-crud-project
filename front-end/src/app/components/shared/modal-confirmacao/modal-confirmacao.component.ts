import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css']
})
export class ModalConfirmacaoComponent implements OnInit {
  textCancel = 'Cancelar';
  textOk = 'OK';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private dialogAvanco: MatDialogRef<any>
  ) {
    this.textCancel = data.textCancel || this.textCancel;
    this.textOk = data.textOk || this.textOk;
  }

  confirm() {
    this.dialogAvanco.close(1);
  }
  ngOnInit(): void {
  }

}
