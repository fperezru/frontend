import { Component, OnInit, Inject } from '@angular/core';
import { Persona } from 'src/app/core/clases/clases';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/services/snack/snack.service';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { TokenService } from 'src/app/core/services/tokenService/token-service.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.scss']
})
export class EditarPersonaComponent implements OnInit {
  persona: Persona;
  private nombreActual: string;
  private apellido1Actual: string;
  private apellido2Actual: string;
  private relacionActual: string;
  private descripcionActual: string;
  private nacimientoActual: Date;
  private defuncionActual: Date;

  constructor(public dialogoRef: MatDialogRef<EditarPersonaComponent>, @Inject(MAT_DIALOG_DATA) public data:Persona, public snackService: SnackService, private personaService: PersonaService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if(this.data !== null) {
      this.persona = this.data;
    }
    else 
      this.persona = this.persona;

    this.nombreActual = this.persona.nombre;
    this.apellido1Actual = this.persona.apellido1;
    this.apellido2Actual = this.persona.apellido2;
    this.relacionActual = this.persona.relacion;
    this.descripcionActual = this.persona.descripcion;
    this.nacimientoActual = this.persona.fechaNacimiento;
    this.defuncionActual = this.persona.fechaDefuncion;

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

  public editarPersona(persona: Persona) {
    this.persona.nombre = persona.nombre;
    this.persona.apellido1 = persona.apellido1;
    this.persona.apellido2 = persona.apellido2;
    this.persona.relacion = persona.relacion;
    this.persona.descripcion = persona.descripcion;
    this.persona.fechaNacimiento = persona.fechaNacimiento;
    this.persona.fechaDefuncion = persona.fechaDefuncion;

    let save = this.validaciones(persona);
    if (save) {
      this.personaService.editarPersona(persona, persona.id).subscribe(data => {
        console.log("actualizado persona ok");
      },
        (error: any) => {
          console.log(error)
        }
      );
      this.dialogoRef.close();
    }
  }

  public noEditar() {
    this.persona.nombre = this.nombreActual;
    this.persona.apellido1 = this.apellido1Actual;
    this.persona.apellido2 = this.apellido2Actual;
    this.persona.relacion = this.relacionActual;
    this.persona.descripcion = this.descripcionActual;
    this.persona.fechaNacimiento = this.nacimientoActual;
    this.persona.fechaDefuncion = this.defuncionActual;
    this.dialogoRef.close();
  }

}
