import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditProdutoPage } from './edit-produto.page';

describe('EditProdutoPage', () => {
  let component: EditProdutoPage;
  let fixture: ComponentFixture<EditProdutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProdutoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
