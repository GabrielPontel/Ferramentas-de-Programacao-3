import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, FormsModule],
})
export class HomePage {
  
  public nome: string = "Gabriel";
  protected salario: number = 1000;
  private telefone: string = "4545424"; //Uso dentro da classe
  protected fonte:string ="text-align: center;";

  constructor(){
    console.log(this.telefone);
    this.exibir();
  }

  protected exibir(){
    console.log("aaaaaaaaaaaaa");
  }

  public getTelefone(){
    return this.telefone;
  }

  protected alterarEstilo(){
    this.fonte = "text-align: end;"
  }
}
