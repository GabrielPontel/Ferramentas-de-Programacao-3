import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonAlert,
} from '@ionic/angular';
import { BrandsService } from '../api/brands.service';
import { Produto } from '../modelos/produto.modelo';
import { Marca } from '../modelos/marca.modelo';

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.page.html',
  styleUrls: ['./produto-listagem.page.scss'],
  imports: [
    IonAlert,
    IonButton,
    IonLabel,
    IonList,
    IonSearchbar,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ProdutoListagemPage implements OnInit {
  private brandsService = inject(BrandsService);

  private produtosDaMarca: Produto[] = [];

  protected marcas: Marca[] = [];

  protected idMarcaRole: number=-1;

  protected openAlert = false;

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        this.marcas.splice(this.idMarcaRole,1);
      },
    },
  ];
  constructor() {}

  ngOnInit() {}

  private montarMarca() {
    let indiceProdutoMaisCaro = 0;
    this.produtosDaMarca.forEach((produto, index) => {
      if (produto.price > this.produtosDaMarca[indiceProdutoMaisCaro].price)
        indiceProdutoMaisCaro = index;
    });
    let marca = new Marca();
    marca.nameProduct = this.produtosDaMarca[0].brand;
    marca.quantity = this.produtosDaMarca.length;
    marca.nameProduct = this.produtosDaMarca[indiceProdutoMaisCaro].name;
    marca.biggestPrice = this.produtosDaMarca[indiceProdutoMaisCaro].price;
    this.marcas.push(marca);
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.brandsService.obterPelaMarca(query).subscribe({
      next: (resposta: Produto[]) => {
        this.produtosDaMarca = resposta;
        this.montarMarca();
      },
      error: (e) => {
        console.log(`no products found with the brand ${query}`);
      },
    });
  }

  protected setOpen(value: boolean) {
    this.openAlert = value;
  }

  protected remover(id: number) {
    this.setOpen(true);
    this.idMarcaRole = id;
  }
}
