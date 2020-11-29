import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaPage } from './categoria.page';

import { CategoriaPageRoutingModule } from './categoria-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CategoriaPageRoutingModule
  ],
  declarations: [CategoriaPage]
})
export class CategoriaPageModule {}
