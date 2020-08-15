import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';

@Component({
  selector: 'app-view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.scss']
})
export class ViewConfigComponent implements OnInit {

  usuario: Usuario;
  
  constructor(public dialogoRef: MatDialogRef<ViewConfigComponent>, @Inject(MAT_DIALOG_DATA) public data: Usuario, public snackService: SnackService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if(this.data !== null) {
      this.usuario = this.data;
    }
    else 
      this.usuario = this.usuario;
  }

}
