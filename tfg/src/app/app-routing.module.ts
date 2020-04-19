import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pantallas/home/home.component';
import { PersonasComponent } from './pantallas/personas/personas.component';
import { MascotasComponent } from './pantallas/mascotas/mascotas.component';
import { ViajesComponent } from './pantallas/viajes/viajes.component';
import { OtrosComponent } from './pantallas/otros/otros.component';
import { LoginComponent } from './pantallas/login/login.component';
import { RegistroComponent } from './pantallas/registro/registro.component';

import { GuardService as guard} from 'src/app/core/services/guardService/guard-service.service';
import { PublicoComponent } from './shared/layout/publico/publico.component';
import { PrivadoComponent } from './shared/layout/privado/privado.component';

const routes: Routes = [
  {
    path: 'login', 
    component: PublicoComponent,
    children : [{path:'', component: LoginComponent}],
  },
  {
    path: 'registro', 
    component: RegistroComponent,
  },
  {
    path: '', 
    component: PrivadoComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'personas',
        component: PersonasComponent,
      },
      {
        path: 'mascotas',
        component: MascotasComponent,
      },
      {
        path: 'viajes',
        component: ViajesComponent,
      },
      {
        path: 'otros',
        component: OtrosComponent,
      },

    ],
    canActivate: [guard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash:true,
      enableTracing:true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
