import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service'
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  editForm: FormGroup;
  id: any;
  title:String;
  button:String;

  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) { 
    console.log('id',this.actRoute.snapshot.paramMap.get('id'));
    
    this.id = this.actRoute.snapshot.paramMap.get('id');
    if (this.id != 0){
      this.db.getCategoria(this.id).then(res => {
        this.editForm.setValue({
          categoria_name: res['categoria_name']
        })
      })
      this.title='Editar Categoria'
      this.button='Atualizar'
    }else{
      this.title='Inserir Categoria'
      this.button='Inserir'
    }

  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      categoria_name: [''],
    })
  }

  saveForm(){

    if (this.id != 0) {
      this.db.updateCategoria(this.id, this.editForm.value)
      .then( (res) => {this.router.navigate(['/categorias']);})
    } else {
      console.log(this.editForm.value);
      
      this.db.addCategoria(this.editForm.value.categoria_name)
      .then( (res) => {this.router.navigate(['/categorias']);})
    }
    
  }
  

}