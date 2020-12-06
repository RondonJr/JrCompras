import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { ProdutoPageModule } from '../produto/produto.module';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
 

  Data: any[] = []
  Categorias: any[] = []

  constructor( private db: DbService,
    private toast: ToastController,
    private router: Router) 
    {    

      
   }

  ngOnInit() {
     
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchProdutos().subscribe(item => {
          this.Data = item;
        })
        this.db.fetchCategorias().subscribe(item => {
          this.Categorias = item
          })
       }
       console.log('oninit',this.Data);
  })
  }
  
  filtraDados(categoriaId){
    return this.Data.filter(i=>i.categoriaId===categoriaId)
  }
  
  limpaLista(){
    this.Data.forEach(produto=>{
      produto.marcado=false
    })
    console.log(this.Data);
  
  }

  change(idProduto){
    this.Data.forEach(produto =>{
      if (produto.id == idProduto ) {
      produto.marcado = !produto.marcado
      }
    })
   }
   

}
