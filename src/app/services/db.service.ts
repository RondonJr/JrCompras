import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Produto } from './produto';
import { Categoria } from './categoria';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  categoriasList = new BehaviorSubject([]);
  produtosList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'jrcompras_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchCategorias(): Observable<Categoria[]> {
    return this.categoriasList.asObservable();
  }

  fetchProdutos(): Observable<Produto[]> {
    return this.produtosList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/banco.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getProdutos();
            this.getCategorias();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getCategorias(){
    return this.storage.executeSql('SELECT * FROM categoria', []).then(res => {
      let items: Categoria[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            categoria_name: res.rows.item(i).categoria_name,
           });
        }
      }
      this.categoriasList.next(items);
    });
  }

  // Add
  addCategoria(categoria_name) {
    let data = [categoria_name];
    return this.storage.executeSql('INSERT INTO categoria (categoria_name) VALUES (?)', data)
    .then(res => {
      this.getCategorias();
    });
  }
 
  // Get single object
  getCategoria(id): Promise<Categoria> {
    return this.storage.executeSql('SELECT * FROM categoria WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        categoria_name: res.rows.item(0).categoria_name
  }
    });
  }

  // Update
  updateCategoria(id, categoria: Categoria) {
    let data = [categoria.categoria_name];
    return this.storage.executeSql(`UPDATE categoria SET categoria_name = ?  WHERE id = ${id}`, data)
    .then(data => {
      this.getCategorias();
    })
  }

  // Delete
  deleteCategoria(id) {
    return this.storage.executeSql('DELETE FROM categoria WHERE id = ?', [id])
    .then(_ => {
      this.getCategorias();
    });
  }

  // Serviços para produto..

  //obter lista de produtos
  getProdutos(){
    return this.storage.executeSql('SELECT * FROM produto', []).then(res => {
      let items: Produto[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            produto_name: res.rows.item(i).produto_name,
            unidadeId: res.rows.item(i).unidadeId,
            categoriaId: res.rows.item(i).categoriaId,
            quantidade: res.rows.item(i).quantidade
           });
        }
      }
      this.produtosList.next(items);
    });
  }

  // Adicionar produto
  addProduto(produto_name,unidadeId,categoriaId,quantidade) {
    let data = [produto_name,unidadeId,categoriaId,quantidade];
    return this.storage.executeSql('INSERT INTO produto (produto_name,unidadeId,categoriaId,quantidade) VALUES (?,?,?,?)', data)
    .then(res => {
      this.getProdutos();
    });
  }
 
  // ObterProduto
  getProduto(id): Promise<Produto> {
    return this.storage.executeSql('SELECT * FROM produto WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        produto_name: res.rows.item(0).produto_name,
        unidadeId: res.rows.item(0).unidadeId,
        categoriaId: res.rows.item(0).categoriaId,
        quantidade: res.rows.item(0).quantidade
  }
    });
  }

   // Update
   updateProduto(id, produto: Produto) {
    let data = [produto.produto_name,produto.unidadeId,produto.categoriaId,produto.quantidade];
    return this.storage.executeSql(`UPDATE produto SET produto_name = ?, unidadeId = ?, categoriaId = ?, quantidade = ?  WHERE id = ${id}`, data)
    .then(data => {
      this.getCategorias();
    })
  }

  // Deletar produto
  deleteProduto(id) {
    return this.storage.executeSql('DELETE FROM produto WHERE id = ?', [id])
    .then(_ => {
      this.getProdutos();
    });
  }

}