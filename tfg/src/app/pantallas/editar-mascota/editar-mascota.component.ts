import { Component, OnInit, Inject } from '@angular/core';
import { Mascota } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterfazService } from 'src/app/core/services/interfaz.service';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { MascotaService } from 'src/app/core/services/mascota/mascota.service';
import { UploadService } from 'src/app/core/services/uploadService/upload.service';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.scss']
})
export class EditarMascotaComponent implements OnInit {
  mascota: Mascota;
  private nombreActual: string;
  private especieActual: string;
  private descripcionActual: string;
  private archvioSeleccionado: File;
  modo: number;
  imageObject: Array<object>;
  

  constructor(public dialogoRef: MatDialogRef<EditarMascotaComponent>, @Inject(MAT_DIALOG_DATA) public data:Mascota, public snackService: SnackService, private mascotaService: MascotaService, private uploadService: UploadService, private interfaceService: InterfazService) { }

  ngOnInit(): void {
    this.modo = 0;

    if(this.data !== null) {
      this.mascota = this.data;
      console.log(this.mascota);
    }

    this.nombreActual = this.mascota.nombre;
    this.especieActual = this.mascota.especie;
    this.descripcionActual = this.mascota.descripcion;

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

  public validaciones(mascota: Mascota) {

    let save: boolean = true;

    if (mascota.nombre === undefined || mascota.nombre.trim().length === 0 || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(mascota.nombre)) {
      this.snackService.errorSnackbar('El nombre de la mascota no debe estar vacío ni contener números');
      save = false;
    }
    else if (mascota.especie === undefined || mascota.especie.trim().length === 0 || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(mascota.especie)) {
      this.snackService.errorSnackbar('La especie de la mascota no debe estar vacío ni contener números');
      save = false;
    }
    else if (mascota.descripcion === undefined || mascota.descripcion === null || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(mascota.descripcion)) {
      this.snackService.errorSnackbar('La descripción de la mascota no debe estar vacío ni contener números');
      save = false;
    }

    console.log(save);
    return save;
  }

  public onFileChanged(event) {
    this.archvioSeleccionado = event.target.files[0];
  }

  public onUpload() {
    this.mascota.imagen1 = this.archvioSeleccionado.name;
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

  public editarMascota(mascota: Mascota) {
    this.mascota.nombre = mascota.nombre;
    this.mascota.descripcion= mascota.descripcion;
    this.mascota.especie = mascota.especie;

    let save = this.validaciones(mascota);
    if (save) {
      this.mascotaService.editarMascota(mascota, mascota.id).subscribe(data => {
        console.log("actualizado mascota ok");
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
    this.mascota.nombre = this.nombreActual;
    this.mascota.descripcion= this.descripcionActual;
    this.mascota.especie = this.especieActual;
    this.modo = 0;
  }

  public eliminarMascota(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.mascotaService.borrar(id).subscribe(data => {
        this.interfaceService.deleteRecuerdo(id);
        this.dialogoRef.close();
        this.interfaceService.back();
      },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }
}
