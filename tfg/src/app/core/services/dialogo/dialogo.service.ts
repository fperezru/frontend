import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { dialogoComponentes } from './dialogos';

@Injectable({
  providedIn: 'root'
})
export class DialogoService {

  componentsForDialog: any;

  constructor(private dialog: MatDialog) {
    this.componentsForDialog = dialogoComponentes;
  }

  abrirDialogo(nombreDialogo: any, data?: any, config?: any): MatDialogRef<unknown, any> {
    const componente = this.getComponente(nombreDialogo);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.autoFocus = false;
    if (config) {
      dialogConfig.width = config.width;
      dialogConfig.minWidth = config.minWidth;
      dialogConfig.height = config.height;
      dialogConfig.maxHeight = config.maxHeight;
    }
    return this.dialog.open(componente, dialogConfig);
  }

  cerrarDialogo() {
    this.dialog.closeAll();
  }

  getComponente(nombreDialogo: string) {
    return this.componentsForDialog.find(
      componente => componente.nombre === nombreDialogo
    ).componente;
  }
}
