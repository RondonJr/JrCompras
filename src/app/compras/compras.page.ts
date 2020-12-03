import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";


@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  mainForm: FormGroup;
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
          this.Data = item
        })
        this.db.fetchCategorias().subscribe(item => {
          this.Categorias = item
          })
          

     }
  });

  }
  filtraDados(categoriaId){
    return this.Data.filter(i=>i.categoriaId===categoriaId)
  
  }
removeProduto(produto){
  this.Data.pop(produto)
  return this.Data

}
}
