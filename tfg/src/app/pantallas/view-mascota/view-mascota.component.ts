import { Component, OnInit, Inject } from '@angular/core';
import { Mascota } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { MascotaService } from 'src/app/core/services/mascota/mascota.service';
import { DialogoService } from 'src/app/core/services/dialogo/dialogo.service';

@Component({
  selector: 'app-view-mascota',
  templateUrl: './view-mascota.component.html',
  styleUrls: ['./view-mascota.component.scss']
})
export class ViewMascotaComponent implements OnInit {

  mascota: Mascota;
  imageObject: Array<object>;

  constructor(public dialogoRef: MatDialogRef<ViewMascotaComponent>, @Inject(MAT_DIALOG_DATA) public data:Mascota, public snackService: SnackService, public dialogoService: DialogoService) { }

  ngOnInit(): void {
    if(this.data !== null) {
      this.mascota = this.data;
      console.log(this.mascota);
    }

    this.imageObject = [
      {
        image: '../assets/a.png',
        thumbImage: '../assets/a.png',
      }, 
      {
        image: '../assets/b.png', // Support base64 image
        thumbImage: '../assets/b.png', // Support base64 image
      },
      {
        image: '../assets/c.png', // Support base64 image
        thumbImage: '../assets/c.png', // Support base64 image
      },
      {
        image: '../assets/d.png', // Support base64 image
        thumbImage: '../assets/d.png', // Support base64 image
      },
      {
        image: '../assets/e.png', // Support base64 image
        thumbImage: '../assets/e.png', // Support base64 image
      },
      {
        image: '../assets/f.png', // Support base64 image
        thumbImage: '../assets/f.png', // Support base64 image
      },
      {
        video: this.mascota.video2, // Support base64 image
        
      },
    ];
  }

  public openMenu(mascota: Mascota) {
    this.dialogoService.abrirDialogo('EditarMascotaComponent', mascota, {width: '1100px', height: 'auto'}).afterClosed().subscribe(data => {
      this.dialogoService.cerrarDialogo();
    },
    error => console.log(error)
    );
  }

}
