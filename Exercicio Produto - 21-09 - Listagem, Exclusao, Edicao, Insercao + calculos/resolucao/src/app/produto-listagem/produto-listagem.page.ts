import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
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
  IonIcon,
  IonButtons,
  IonBadge,
} from "@ionic/angular";
import { ProdutosService } from "../api/produtos.service";
import { Produto } from "../modelos/produto.modelo";
import { RouterLink } from "@angular/router";
import { addIcons } from "ionicons";
import { addCircleOutline, pencilOutline, trashOutline } from "ionicons/icons";

@Component({
  selector: "app-produto-listagem",
  templateUrl: "./produto-listagem.page.html",
  styleUrls: ["./produto-listagem.page.scss"],
  imports: [
    IonIcon,
    IonButtons,
    RouterLink,
    IonAlert,
    IonAlert,
    IonAlert,
    IonAlert,
    IonButton,
    IonLabel,
    IonButton,
    IonLabel,
    IonItem,
    IonList,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    IonBadge,
    CurrencyPipe
  ],
})
export class ProdutoListagemPage implements OnInit {
  private produtosService = inject(ProdutosService);

  protected produtos = signal<Produto[]>([]);

  protected idProdutoRole: string = "";

  protected openAlert = false;

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
        this.produtosService.remover(this.idProdutoRole).subscribe({
          next: () => {
            this.obterProdutos();
          },
          error: (e) => {
            console.log("Não foi possivel remover " + e);
          },
        });
      },
    },
  ];

  constructor() {
    addIcons({ addCircleOutline, pencilOutline, trashOutline });
  }

  ngOnInit() {}

  //Esse metodo faz toda a vez que é referenciada a pagina, porque sem ele o router não chama o construtor ent fica desatualizada
  ionViewDidEnter() {
    this.obterProdutos();
    this.calcular_quantidade_total();
    this.calcular_valor_total();
    this.calcular_preco_medio();
  }

  protected obterProdutos() {
    this.produtosService.obterTodos().subscribe({
      next: (resposta: Produto[]) => {
        this.produtos.set(
          resposta.sort((a, b) => a.nome.localeCompare(b.nome)),
        );
        //this.produtos.set(resposta); sem ordenacao
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  handleInputNome(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || "";
    this.produtosService.obterPeloNome(query).subscribe({
      next: (resposta: Produto[]) => {
        this.produtos.set(resposta);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  handleInputCategoria(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || "";
    this.produtosService.obterPelaCategoria(query).subscribe({
      next: (resposta: Produto[]) => {
        this.produtos.set(resposta);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  protected setOpen(value: boolean) {
    this.openAlert = value;
  }

  protected remover(id: string) {
    this.setOpen(true);
    this.idProdutoRole = id;
  }

  protected calcular_quantidade_total() {
    const produtos: Produto[] = this.produtos();
    return produtos.reduce((ant, atual) => {
      return ant + atual.quantidade;
    }, 0);
  }

  protected calcular_valor_total() {
    const produtos: Produto[] = this.produtos();
    return produtos.reduce((ant, atual) => {
      return ant + atual.quantidade * atual.preco;
    }, 0);
  }

  protected calcular_preco_medio() {
    return this.calcular_valor_total() / this.calcular_quantidade_total();
  }
}
