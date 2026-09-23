import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { UsersService } from '../api/users.service';
import { UserResponse } from '../modelos/user-response.modelo';
import { User } from '../modelos/user.modelo';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.page.html',
  styleUrls: ['./usuario-listagem.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonList, IonItem, IonAvatar, IonLabel, IonButton]
})
export class UsuarioListagemPage implements OnInit {

  //o atributo tem que ter o mesmo nome da classe mas com a primeira letra minuscula
  private usersService = inject(UsersService);
  protected users : User[] = [];
  //protected userResponse: UserResponse | undefined;
  //Quando coloca-se o ! significa que o valor pode se null, então é melhor colocar | undefined e isso pode dar erro ao tentar mostrar algo
  //E para solucionar isso na apresentacao pode colocar userResponse?.atrbuto
  //protected users!: User[];

  constructor() { 
    this.obterUsuarios();
  }

  ngOnInit() {
  }

  private obterUsuarios(){
    
    //sincrona
    //Enquanto o console.log nao terminar nao passa pro proximo
    console.log('1');

    //Assicrona 
    //Não aguarda ela terminar e ja passa pro proximo
    //Pra dizer que tenho interrese nessa resposta, voce coloca o subscribe
    //A requisição pode ocorrer com sucesso ou com erro, next para sucesso e error para erro
    //os dados do return da função que chamou da classeService vai ser o parametro da arrow function, ou o erro tambem
    this.usersService.obterTodos().subscribe({
      //sucesso
      next: (resposta:User[]) => {
        console.log('2')
        console.log(resposta)
        this.users = resposta;
        //this.users = resposta.data;
      },
      //erro
      error: (e) => {
        console.log('erro')
        console.log(e)
      }
    });
    
    //sincrona
    console.log('3');
  }

  protected remover(id:number){
    this.usersService.remover(id).subscribe({
      next: () => {console.log('Usuario removido')},
      error: () => {console.log('Não foi possivel remover')},
    })
    this.obterUsuarios();
  }
}
