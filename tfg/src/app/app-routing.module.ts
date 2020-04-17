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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'personas', component: PersonasComponent},
  
  {path: 'detalle/:id', component: MascotasComponent,
    canActivate: [guard], data: { expectedRol: ['admin', 'user']}},

  {path: 'editar/:id', component: ViajesComponent,
    canActivate: [guard], data: { expectedRol: ['admin']}},

  {path: 'nuevo', component: OtrosComponent,
    canActivate: [guard], data: { expectedRol: ['admin']}},

  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
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
