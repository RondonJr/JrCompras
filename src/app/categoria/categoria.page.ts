import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-categoria',
  templateUrl: 'categoria.page.html',
  styleUrls: ['categoria.page.scss'],
})

export class CategoriaPage implements OnInit {
  mainForm: FormGroup;
  Data: any[] = []

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }


  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchCategorias().subscribe(item => {
          this.Data = item
        })
      }
    });

    this.mainForm = this.formBuilder.group({
      categoria: ['']
    })
  }

  storeData() {
    this.db.addCategoria(
      this.mainForm.value.categoria
    ).then((res) => {
      this.mainForm.reset();
    })
  }

  deleteCategoria(id){
    this.db.deleteCategoria(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Categoria apagada!',
        duration: 2500
      });
      toast.present();      
    })
  }
   
}