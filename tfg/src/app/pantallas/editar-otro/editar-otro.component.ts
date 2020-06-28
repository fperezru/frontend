import { Component, OnInit, Inject } from '@angular/core';
import { OtrosRecuerdos } from 'src/app/core/clases/clases';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { OtroService } from 'src/app/core/services/otro/otro.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadService } from 'src/app/core/services/uploadService/upload.service';
import { InterfazOtrosService } from 'src/app/core/services/interfaz-otros/interfaz-otros.service';

@Component({
  selector: 'app-editar-otro',
  templateUrl: './editar-otro.component.html',
  styleUrls: ['./editar-otro.component.scss']
})
export class EditarOtroComponent implements OnInit {

  otro: OtrosRecuerdos;
  private tipoActual: string;
  private descripcionActual: string;
  private archvioSeleccionado: File;
  modo: number;
  imageObject: Array<object>;

  constructor(public dialogoRef: MatDialogRef<EditarOtroComponent>, @Inject(MAT_DIALOG_DATA) public data: OtrosRecuerdos, public snackService: SnackService, private otroService: OtroService, private uploadService: UploadService, private interfaceOtros: InterfazOtrosService) { }

  ngOnInit(): void {
    this.modo = 0;

    if(this.data !== null) {
      this.otro = this.data;
    }
    else 
      this.otro= this.otro;

    this.tipoActual = this.otro.tipo;
    this.descripcionActual = this.otro.descripcion;

    this.imageObject = [
      {
        image: 'https://www.lavanguardia.com/r/GODO/LV/p6/WebSite/2019/09/06/Recortada/0540f2ee4fe94715aed6aeb98b07927f-kldB-U47200221465F0-992x558@LaVanguardia-Web.jpg',
        thumbImage: 'https://www.lavanguardia.com/r/GODO/LV/p6/WebSite/2019/09/06/Recortada/0540f2ee4fe94715aed6aeb98b07927f-kldB-U47200221465F0-992x558@LaVanguardia-Web.jpg',
      }, 
      {
        image: 'https://cdn.themedizine.com/2020/06/Nicki-Minaj-trollz-6ix9ine6-620x337-1.jpg', // Support base64 image
        thumbImage: 'https://cdn.themedizine.com/2020/06/Nicki-Minaj-trollz-6ix9ine6-620x337-1.jpg', // Support base64 image
      },
      {
        image: 'https://scontent-sin6-2.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/104054052_673632796819634_5586574187980184573_n.jpg?_nc_ht=scontent-sin6-2.cdninstagram.com&_nc_cat=102&_nc_ohc=UkGuKBynRhUAX8ED_vl&oh=b9d56a7451c693aaa9bacd8fcf5d3915&oe=5F159568', // Support base64 image
        thumbImage: 'https://scontent-sin6-2.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/104054052_673632796819634_5586574187980184573_n.jpg?_nc_ht=scontent-sin6-2.cdninstagram.com&_nc_cat=102&_nc_ohc=UkGuKBynRhUAX8ED_vl&oh=b9d56a7451c693aaa9bacd8fcf5d3915&oe=5F159568', // Support base64 image
      },
      {
        image: 'https://www.the-sun.com/wp-content/uploads/sites/6/2020/06/NINTCHDBPICT000588889724.jpg', // Support base64 image
        thumbImage: 'https://www.the-sun.com/wp-content/uploads/sites/6/2020/06/NINTCHDBPICT000588889724.jpg', // Support base64 image
      },
      {
        video: 'https://www.youtube.com/watch?v=M8GX0cZ-xtw', // Support base64 image
      },
    ];
  }

  public validaciones(recuerdo: OtrosRecuerdos) {

    let save: boolean = true;

    if (recuerdo.tipo === undefined || recuerdo.tipo.trim().length === 0 || !/[a-zA-Z\u00C0-\u017F\s]+/.test(recuerdo.tipo)) {
      this.snackService.errorSnackbar('El tipo de recuerdo no debe estar vacío ni contener números');
      save = false;
    }
    else if (recuerdo.descripcion === undefined || recuerdo.descripcion === null || !/[a-zA-Z\u00C0-\u017F\s]+/.test(recuerdo.descripcion)) {
      this.snackService.errorSnackbar('La descripción del recuerdo no debe estar vacía');
      save = false;
    }

    console.log(save);
    return save;
  }

  public onFileChanged(event) {
    this.archvioSeleccionado = event.target.files[0];
  }

  public onUpload() {
    this.otro.imagen1 = this.archvioSeleccionado.name;
    console.log(this.archvioSeleccionado);

    const uploadImageData = new FormData();
    uploadImageData.append('file', this.archvioSeleccionado, this.archvioSeleccionado.name)

    this.uploadService.uploadFile(uploadImageData).subscribe(data => {
      console.log("subida archivo ok");
    },
      (error: any) => {
        console.log(error)
      }
    );

  }

  public editarRecuerdo(recuerdo: OtrosRecuerdos) {
    this.otro.tipo = recuerdo.tipo;
    this.otro.descripcion = recuerdo.descripcion;

    let save = this.validaciones(recuerdo);

    if (save) {
      this.otroService.editarRecuerdo(recuerdo, recuerdo.id).subscribe(data => {
        console.log("actualizado recuerdo ok");
        this.onUpload();
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
    this.modo = 0;
  }

  public noEditar() {
    this.otro.tipo = this.tipoActual;
    this.otro.descripcion = this.descripcionActual;
    this.modo = 0;
  }

  public eliminarRecuerdo(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.otroService.borrar(id).subscribe(data => {
        this.interfaceOtros.deleteRecuerdo(id);
        this.dialogoRef.close();
        this.interfaceOtros.back();
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }

}
