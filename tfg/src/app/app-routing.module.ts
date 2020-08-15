import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pantallas/home/home.component';
import { PersonasComponent } from './pantallas/personas/personas.component';
import { MascotasComponent } from './pantallas/mascotas/mascotas.component';
import { ViajesComponent } from './pantallas/viajes/viajes.component';
import { OtrosComponent } from './pantallas/otros/otros.component';
import { LoginComponent } from './pantallas/login/login.component';
import { RegistroComponent } from './pantallas/registro/registro.component';
import { RegistroFamiliarComponent } from './pantallas/registro-familiar/registro-familiar.component';
import { DiarioComponent } from './pantallas/diario/diario.component';
import { AdminHomeComponent } from './pantallas/admin-home/admin-home.component';
import { FamiliarHomeComponent } from './pantallas/familiar-home/familiar-home.component';
import { InformacionTipoComponent } from './pantallas/informacion-tipo/informacion-tipo.component';
import { InformacionContenidoComponent } from './pantallas/informacion-contenido/informacion-contenido.component';
import { AdminConfigComponent } from './pantallas/admin-config/admin-config.component';
import { AdminInfoComponent } from './pantallas/admin-info/admin-info.component';
import { FamiliarInfoComponent } from './pantallas/familiar-info/familiar-info.component';
import { FamiliarUserComponent } from './pantallas/familiar-user/familiar-user.component';
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
    path: 'registrofamiliar', 
    component: RegistroFamiliarComponent,
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
      {
        path: 'diario',
        component: DiarioComponent,
      },
      {
        path: 'adminhome',
        component: AdminHomeComponent,
      },
      {
        path: 'adminuser',
        component: AdminConfigComponent,
      },
      {
        path: 'admininfo',
        component: AdminInfoComponent,
      },
      {
        path: 'familiarhome',
        component: FamiliarHomeComponent,
      },
      {
        path: 'familiaruser',
        component: FamiliarUserComponent,
      },
      {
        path: 'familiarinfo',
        component: FamiliarInfoComponent,
      },
      {
        path: 'informaciontipo',
        component: InformacionTipoComponent,
      },
      {
        path: 'informacioncontenido',
        component: InformacionContenidoComponent,
      }
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
