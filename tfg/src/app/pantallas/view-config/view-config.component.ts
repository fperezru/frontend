import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.scss']
})
export class ViewConfigComponent implements OnInit {

  usuario: Usuario;
  fecha: Date;
  fechaAux: string;
  
  constructor(public dialogoRef: MatDialogRef<ViewConfigComponent>, @Inject(MAT_DIALOG_DATA) public data: Usuario, public snackService: SnackService, private tokenService: TokenService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    if(this.data !== null) {
      this.usuario = this.data;
    }
    else 
      this.usuario = this.usuario;

      this.fecha = new Date(this.usuario.fechaNacimiento);
      this.fechaAux = this.datepipe.transform(this.fecha, 'dd/MM/yyyy', 'es-ES');
  }

}
