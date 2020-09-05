import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    DeviceDetectorModule
  ]
})
export class SharedModule { }
