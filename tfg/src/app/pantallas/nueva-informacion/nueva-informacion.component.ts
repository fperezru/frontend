import { Component, OnInit, Inject } from '@angular/core';
import { Informacion, Tipo } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { InformacionService } from 'src/app/core/services/informacion/informacion.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { TipoService } from 'src/app/core/services/tipo/tipo.service';

@Component({
  selector: 'app-nueva-informacion',
  templateUrl: './nueva-informacion.component.html',
  styleUrls: ['./nueva-informacion.component.scss']
})
export class NuevaInformacionComponent implements OnInit {

  informacion: Informacion;
  admin: string;
  tipo: Tipo;
  idAdmin: number;
  tipoInformacion: Tipo[];

  constructor(public dialogoRef: MatDialogRef<NuevaInformacionComponent>, @Inject(MAT_DIALOG_DATA) public data:string, public snackService: SnackService, private informacionService: InformacionService, private tokenService: TokenService, public tipoService: TipoService) { }

  ngOnInit(): void {
    this.informacion = new Informacion();
    this.idAdmin = this.tokenService.getId();
    if (isNaN(this.idAdmin)) this.idAdmin = 1;
    console.log(this.idAdmin);
    if(this.data !== null){
      this.admin = this.data;
    }

    this.tipoService.getInformacion().subscribe(
      data => {
        this.tipoInformacion = data;
        console.log(this.tipoInformacion[0].tipoNombre);
      },
      error => {
        console.log(error);
      }
    );
  }

  public addInformacion(informacion: Informacion) {
    this.informacionService.crearInformacion(informacion, this.idAdmin).subscribe(
      data => {
      },
      error => {
        console.log(error);
      }
    );
    this.dialogoRef.close();
  }




}
