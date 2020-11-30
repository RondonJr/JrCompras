import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
  editForm: FormGroup;
  id: any;
  constructor(    
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.db.getProduto(this.id).then(res => {
      this.editForm.setValue({
        produto_name: res['produto_name'],
        unidadeId: res['unidadeId'],
        categoriaId: res['categoriaId'],
        quantidade: res['quantidade']

      })
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      produto_name: [''],
      unidadeId: [''],
      categoriaId: [''],
      quantidade: ['']
  })
}
saveForm(){
    this.db.updateProduto(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.router.navigate(['/produtos']);
    })
  }

}
