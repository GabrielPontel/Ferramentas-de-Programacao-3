import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonLabel,
  IonButton,
  IonAlert,
  IonInput,
  IonGrid,
  IonCol,
  IonRow,
  IonToast,
  ToastController,
} from "@ionic/angular";
import { BrandsService } from "../api/brands.service";
import { Produto } from "../modelos/produto.modelo";
import { Marca } from "../modelos/marca.modelo";

@Component({
  selector: "app-produto-listagem",
  templateUrl: "./produto-listagem.page.html",
  styleUrls: ["./produto-listagem.page.scss"],
  imports: [
    IonAlert,
    IonButton,
    IonLabel,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    IonToast,
  ],
})
export class ProdutoListagemPage implements OnInit {
  private brandsService = inject(BrandsService);

  private produtosDaMarca = signal<Produto[]>([]);

  protected marcas = signal<Marca[]>([]);

  protected idMarcaRole: number = -1;

  protected marcaBuscada = "";

  protected openAlert = false;

  private toastController: ToastController = inject(ToastController);

  public alertButtons = [
    {
      text: "Não",
      role: "cancel",
      handler: () => {
        console.log("Alert canceled");
      },
    },
    {
      text: "Sim",
      role: "confirm",
      handler: () => {
        this.marcas.update((marcas) => {
          marcas.splice(this.idMarcaRole, 1);
          return marcas;
        });
        this.exibirMensagem(`A marca ${this.marcaBuscada} foi removida.`);
      },
    },
  ];
  constructor() {}

  ngOnInit() {}

  private montarMarca() {
    const produtos = this.produtosDaMarca();
    const marca = new Marca();
    let indiceProdutoMaisCaro = 0;

    produtos.forEach((produto, index) => {
      if (produto.price > produtos[indiceProdutoMaisCaro].price) {
        indiceProdutoMaisCaro = index;
      }
    });

    marca.brand = produtos[0].brand;
    marca.quantity = produtos.length;
    marca.nameProduct = produtos[indiceProdutoMaisCaro].name;
    marca.biggestPrice = produtos[indiceProdutoMaisCaro].price;

    this.marcas.update((marcas) => {
      return [...marcas, marca];
    });
  }

  private async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem, //Mensagem que quer imprimir
      duration: 1500, //Quantidade de tempo que deseja que essa mensagem fique na tela
      position: "bottom", //Posicao de onde que que apareca ('top' | 'middle' | 'bottom')
    });

    await toast.present();
  }

  protected buscarMarca() {
    this.brandsService.obterPelaMarca(this.marcaBuscada).subscribe({
      next: (resposta: Produto[]) => {
        this.produtosDaMarca.set(resposta);
        if (resposta.length === 0) {
          this.exibirMensagem(
            `Não tem produto(s) com essa marca ${this.marcaBuscada}`,
          );
        } else {
          this.montarMarca();
        }
      },
      error: (e) => {
        console.log(`no products found with the brand ${this.marcaBuscada}`);
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

  protected valorTotal() {
    const marcas = this.marcas();
    return marcas.reduce((anterior, atual) => {
      return anterior + Number(atual.biggestPrice);
    }, 0);
  }
}
