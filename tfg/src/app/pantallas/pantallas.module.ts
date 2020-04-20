import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PersonasComponent } from './personas/personas.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { ViajesComponent } from './viajes/viajes.component';
import { OtrosComponent } from './otros/otros.component';
import { NuevaPersonaComponent } from './nueva-persona/nueva-persona.component';
import { EditarPersonaComponent } from './editar-persona/editar-persona.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [LoginComponent, HomeComponent, PersonasComponent, MascotasComponent, ViajesComponent, OtrosComponent, RegistroComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  entryComponents: [NuevaPersonaComponent, EditarPersonaComponent]
})
export class PantallasModule { }
