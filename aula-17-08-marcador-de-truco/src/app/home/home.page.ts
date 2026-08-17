import { Component, inject } from "@angular/core";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  ToastController, IonRow, IonGrid, IonCol, IonIcon, IonButton } from "@ionic/angular/standalone";

interface Jogador {
  pontos: number;
  partidas: number;
}

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  imports: [IonButton, IonIcon, IonCol, IonGrid, IonRow, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  protected nos: Jogador;
  protected eles: Jogador;
  protected quantidade: number = 1;
  private toastController: ToastController = inject(ToastController);

  constructor() {
    this.nos = {
      pontos: 0,
      partidas: 0,
    };
    this.eles = {
      pontos: 0,
      partidas: 0,
    };
  }

  private async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem, //Mensagem que quer imprimir
      duration: 1500, //Quantidade de tempo que deseja que essa mensagem fique na tela
      position: "bottom", //Posicao de onde que que apareca ('top' | 'middle' | 'bottom')
    });

    await toast.present();
  }

  protected valerMaisPontos(){
    if(this.quantidade == 1){
      this.quantidade=3;
    }
    else if(this.quantidade<12){
      this.quantidade+=3;
    }
    else{
      this.exibirMensagem("Não é possivel valer mais de 12 pontos")
    }
  }

  protected incrementar(jogador: Jogador) {
    if (jogador.pontos + this.quantidade >= 12) {
      jogador.pontos = 12;
      this.fecharPartida();
    } else jogador.pontos += this.quantidade;
    this.quantidade = 1;
  }

  protected desincrementar(jogador: Jogador) {
    if (jogador.pontos > 0) jogador.pontos--;
    else this.exibirMensagem("Não é possivel decrementar 0 pontos.");
  }

  protected fecharPartida() {
    if (this.nos.pontos == 12) {
      this.exibirMensagem("Nós ganhamos a partida");
      this.nos.partidas += 1;
      this.nos.pontos = 0;
    } else {
      this.exibirMensagem("Eles ganharam a partida");
      this.eles.partidas += 1;
      this.eles.pontos = 0;
    }
  }

  protected zerarPontos(){
    this.nos.pontos=0;
    this.eles.pontos=0;
  }

  protected zerarVitorias(){
    this.nos.partidas=0;
    this.eles.partidas=0;
  }
}
