import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasPage } from './categorias.page';

import { CategoriasPageRoutingModule } from './categorias-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CategoriasPageRoutingModule
  ],
  declarations: [CategoriasPage]
})
export class CategoriasPageModule {}
