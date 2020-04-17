import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PersonasComponent } from './personas/personas.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { ViajesComponent } from './viajes/viajes.component';
import { OtrosComponent } from './otros/otros.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [LoginComponent, HomeComponent, PersonasComponent, MascotasComponent, ViajesComponent, OtrosComponent, RegistroComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    FormsModule
  ]
})
export class PantallasModule { }
