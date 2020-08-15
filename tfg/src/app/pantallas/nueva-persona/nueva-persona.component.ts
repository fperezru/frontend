import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from 'src/app/core/clases/clases';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';
import { InterfazPersonasService } from 'src/app/core/services/interfaz-personas/interfaz-personas.service';
import { UploadService } from 'src/app/core/services/uploadService/upload.service';


@Component({
  selector: 'app-nueva-persona',
  templateUrl: './nueva-persona.component.html',
  styleUrls: ['./nueva-persona.component.scss']
})
export class NuevaPersonaComponent implements OnInit {
  persona: Persona;
  personas: Persona[] = [];
  idUser: Number;
  private archvioSeleccionado: File;

  constructor(public dialogoRef: MatDialogRef<NuevaPersonaComponent>, @Inject(MAT_DIALOG_DATA) public data:Number, public snackService: SnackService, private personaService: PersonaService, private tokenService: TokenService, private interfazPersona: InterfazPersonasService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.persona = new Persona();
    if(this.data !== null){
      this.idUser = this.data;
      console.log(this.idUser);
    }
  }

  public onFileChanged(event) {
    this.archvioSeleccionado = event.target.files[0];
  }

  public onUpload() {
    //this.persona.imagen1 = this.archvioSeleccionado.name;
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

  public validaciones(persona: Persona) {

    let save: boolean = true;

    if (persona.nombre === undefined || persona.nombre.trim().length === 0 || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(persona.nombre)) {
      this.snackService.errorSnackbar('El nombre de la persona no debe estar vacío ni contener números');
      save = false;
    }
    else if (persona.apellido1 === undefined || persona.apellido1.trim().length === 0 || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(persona.apellido1)) {
      this.snackService.errorSnackbar('El apellido de la persona no debe estar vacío ni contener números');
      save = false;
    }
    else if (persona.apellido2 === undefined || persona.apellido2 === null || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(persona.apellido2)) {
      this.snackService.errorSnackbar('El apellido de la persona no debe estar vacío ni contener números');
      save = false;
    }
    else if (persona.relacion === undefined || persona.relacion.trim().length === 0 || !/^[a-zA-Z\u00C0-\u00FF]*$/.test(persona.relacion)) {
      this.snackService.errorSnackbar('La relación con la persona introducida no debe estar vacía ni contener números');
      save = false;
    }
    else if (persona.descripcion === undefined || persona.descripcion.trim().length === 0 || !/^[a-zA-Z0-9\u00C0-\u00FF]*$/.test(persona.descripcion)) {
      this.snackService.errorSnackbar('La descripción no debe estar vacía');
      save = false;
    }

    console.log(save);
    return save;
  }

  public addPersona(persona: Persona) {

    this.idUser = this.tokenService.getId();

    let save = this.validaciones(persona);
    if (save) {
      this.personaService.crearPersona(persona, this.idUser).subscribe(data => {
        console.log("guardado persona ok");
        this.interfazPersona.addRecuerdo(this.personas[this.personas.length-1]);
      },
        (error: any) => {
          console.log(error)
        }
      );
      this.dialogoRef.close();
      this.interfazPersona.back();
    }
  }

  public close() {
    this.dialogoRef.close();
    this.interfazPersona.back();
  }
  
}
