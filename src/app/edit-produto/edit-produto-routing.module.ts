import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProdutoPage } from './edit-produto.page';

const routes: Routes = [
  {
    path: '',
    component: EditProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProdutoPageRoutingModule {}
