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
  Categorias: any[] = [];
  title:String;
  button:String;

  constructor(    
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get('id');
    
    if (this.id != 0){
    this.db.getProduto(this.id).then(res => {
         this.editForm.setValue({
        produto_name: res['produto_name'],
        unidadeId: res['unidadeId'],
        categoriaId: res['categoriaId'],
        quantidade: res['quantidade'],
      })   

    })
     this.title='Editar Produto'
    this.button='Atualizar'
    }else{
       this.title='Inserir Produto'
      this.button='Inserir'
    }
  
  }


  ngOnInit() {
    this.editForm = this.formBuilder.group({
      produto_name: [''],
      unidadeId: [''],
      categoriaId: [''],
      quantidade: ['']
    })
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchCategorias().subscribe(item => {
          this.Categorias = item
          })
        }
    })   

}


saveForm(){
  if (this.id != 0) {
    this.db.updateProduto(this.id, this.editForm.value)
    .then( (res) => {this.router.navigate(['/produtos']);})
  }else{
    this.db.addProduto(
      this.editForm.value.produto_name,
      this.editForm.value.unidadeId,
      this.editForm.value.categoriaId,
      this.editForm.value.quantidade
  
    ).then( (res) => {this.router.navigate(['/produtos']);})
  }

}
}
