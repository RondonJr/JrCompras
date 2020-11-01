import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProdutoPageRoutingModule } from './edit-produto-routing.module';

import { EditProdutoPage } from './edit-produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditProdutoPageRoutingModule
  ],
  declarations: [EditProdutoPage]
})
export class EditProdutoPageModule {}
