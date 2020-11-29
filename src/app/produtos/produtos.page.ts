import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  mainForm: FormGroup;
  Data: any[] = []


  constructor( private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router) 
    {    
   }

  ngOnInit() { this.db.dbState().subscribe((res) => {
    if(res){
      this.db.fetchProdutos().subscribe(item => {
        this.Data = item
      })
    }
  });

  this.mainForm = this.formBuilder.group({
    produto: [''],
    unidade: [''],
    categoria: [''],
    quantidade: ['']
    
  })
}

storeData() {
  this.db.addProduto(
    this.mainForm.value.produto,
    this.mainForm.value.unidade,
    this.mainForm.value.categoria,
    this.mainForm.value.quantidade

  ).then((res) => {
    this.mainForm.reset();
  })
}

deleteProduto(id){
  this.db.deleteProduto(id).then(async(res) => {
    let toast = await this.toast.create({
      message: 'Produto apagado!',
      duration: 2500
    });
    toast.present();      
  })
}
 
}