import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PrivadoComponent } from './privado/privado.component';
import { PublicoComponent } from './publico/publico.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [HeaderComponent, PrivadoComponent, PublicoComponent, MenuComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [HeaderComponent, MenuComponent]
})
export class LayoutModule { }
