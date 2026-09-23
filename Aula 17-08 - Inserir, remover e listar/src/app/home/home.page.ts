import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonInput, IonItem, IonList, IonGrid, IonRow, IonCol, ToastController } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart, trash } from 'ionicons/icons';

interface Pessoa{
  nome?: string;
  endereco?: string;
  salario?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule,IonCol, IonRow, IonGrid, IonList, IonItem, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class HomePage {
  protected pessoa: Pessoa = {}; 
  protected pessoas:Pessoa[] = [];
  private toastController: ToastController = inject(ToastController);

  constructor() {
    
    addIcons({ heart, trash });
  }

  private async exibirMensagem(mensagem:string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  protected exibir(){
    console.log("Método Exibir....");
  }

  protected adicionar(){
    this.pessoas.push(this.pessoa);
    console.log(this.pessoas);
    this.pessoa= {};
    this.exibirMensagem('Pessoa cadastrada.'); //Se quiser aparecer uma mensagem na tela
  }

  protected remover(index:number){
    this.pessoas.splice(index,1)
    this.exibirMensagem('Pessoa removida.'); //Se quiser aparecer uma mensagem na tela
  }
}
