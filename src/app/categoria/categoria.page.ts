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
  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.db.getCategoria(this.id).then(res => {
      this.editForm.setValue({
        categoria_name: res['categoria_name']
      })
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      categoria_name: [''],
    })
  }

  saveForm(){
    this.db.updateCategoria(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.router.navigate(['/home']);
    })
  }

}
