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
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { EditarMascotaComponent } from './editar-mascota/editar-mascota.component';
import { NuevaMascotaComponent } from './nueva-mascota/nueva-mascota.component';
import { NuevoViajeComponent } from './nuevo-viaje/nuevo-viaje.component';
import { EditarViajeComponent } from './editar-viaje/editar-viaje.component';
import { EditarOtroComponent } from './editar-otro/editar-otro.component';
import { NuevoOtroComponent } from './nuevo-otro/nuevo-otro.component';
import { ViewMascotaComponent } from './view-mascota/view-mascota.component';
import { ViewPersonaComponent } from './view-persona/view-persona.component';
import { ViewOtroComponent } from './view-otro/view-otro.component';
import { ViewViajeComponent } from './view-viaje/view-viaje.component';
import { NgImageSliderModule } from 'ng-image-slider';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    LoginComponent, 
    HomeComponent, 
    PersonasComponent, 
    MascotasComponent, 
    ViajesComponent, 
    OtrosComponent, 
    RegistroComponent, 
    NuevaPersonaComponent, 
    EditarPersonaComponent, 
    EditarMascotaComponent, 
    NuevaMascotaComponent, 
    NuevaMascotaComponent, 
    EditarMascotaComponent, 
    NuevoViajeComponent, 
    EditarViajeComponent, 
    EditarOtroComponent, 
    NuevoOtroComponent, 
    ViewMascotaComponent, 
    ViewPersonaComponent, 
    ViewOtroComponent, 
    ViewViajeComponent
  ],
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
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgImageSliderModule
  ],
  providers: [
    DatePipe,
    MatDatepickerModule,
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  entryComponents: [NuevaPersonaComponent, EditarPersonaComponent, NuevaMascotaComponent, EditarMascotaComponent, NuevoViajeComponent, EditarViajeComponent, EditarOtroComponent, NuevoOtroComponent, ViewMascotaComponent, ViewPersonaComponent, ViewOtroComponent, ViewViajeComponent ],
})
export class PantallasModule { }
