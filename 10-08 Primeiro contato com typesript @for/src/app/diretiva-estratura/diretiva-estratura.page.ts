import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonTab, IonCol, IonButton, IonGrid } from '@ionic/angular/standalone';


@Component({
  selector: 'app-diretiva-estratura',
  templateUrl: './diretiva-estratura.page.html',
  styleUrls: ['./diretiva-estratura.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonTab, IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule, IonButton],
})
export class DiretivaEstraturaPage implements OnInit {
  protected vetor = [1, 2, 3, 4, 5, 6];
  protected sorte = false;
  constructor() {}

  ngOnInit() {}
  protected alterarSorte() {
    this.sorte = !this.sorte;
  }

  objeto = {
    funcionarios: [
      {
        id: 1,
        nome: 'ana',
        salario: 1000,
        dependentes: [
          { id: 1, nome: 'pedro' },
          { id: 2, nome: 'lucas' },
        ],
      },
      {
        id: 2,
        nome: 'maria',
        salario: 2000,
        dependentes: [{ id: 3, nome: 'sofia' }],
      },
      {
        id: 3,
        nome: 'joao',
        salario: 3000,
        dependentes: [
          { id: 4, nome: 'gabriel' },
          { id: 5, nome: 'beatriz' },
          { id: 6, nome: 'helena' },
        ],
      },
    ],
  };

  protected funcionarios = this.objeto.funcionarios;
  protected removerFuncionario(index:number){
    this.funcionarios.splice(index, 1)
  }
}
