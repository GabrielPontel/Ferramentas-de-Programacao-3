import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonRouterLink } from '@ionic/angular';
import { IonInput } from '@ionic/angular';
import { User } from '../modelos/user.modelo';
import { UsersService } from '../api/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario.cadastro',
  templateUrl: './usuario.cadastro.page.html',
  styleUrls: ['./usuario.cadastro.page.scss'],
  imports: [
    ReactiveFormsModule,
    IonButton,
    IonInput,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    RouterLink
],
})
export class UsuarioCadastroPage implements OnInit {
  
  private userService = inject(UsersService);
  
  //NonNullableFormBuilder -> Vamos utilizar esse, mão permite os campos do formulario serem nulos
  //FormBuilder -> Não vamos usar, ele permite o campo do formulario ser nulo
  //UntypedFormBuilder -> Foi criado para manter a compatibilidade com os formularios mais antigos
  private formBuilder = inject(NonNullableFormBuilder);

  protected form = this.formBuilder.group({
    //email: email: ['', [Validators.required, Validators.minLength(3)]] -> O primeiro parametro é o valor inicial e o segundo é os validadores
    //Sendo um vetor caso seja mais de um validador
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: [''],
    email: [''],
    id: [],
    avatar: [''],
  });

  //Para navegar entre as paginas deve importar o Router
  //this.router.navigate(['/home'])
  private router = inject(Router);

  constructor() {}

  ngOnInit() {}

  protected cadastrar() {
    console.log(this.form.valid);
    if (this.form.valid) {
      //Duas formas para pegar os dados do formulario
      console.log(this.form.value); //Mas esse value faz mais verificações e da mais problema, entao utilize o getRawValue()
      console.log(this.form.getRawValue());

      //Precisamos que nosso formulario esteja em uma variavel user
      //Se acaso estiver dando erro de nao ter algum atributo como id ou/e avatar, basta criar eles como vazio e nem deixar inserir no forms
      const user: User = this.form.getRawValue();

      this.userService.cadastrar(user).subscribe({
        next: () => {
          console.log('Usuário cadastrado');
          this.router.navigate(['/usuario-listagem']);
        },
        error: () => {
          console.log('Não foi possivel cadastrar');
        },
      });

      this.form.reset();
    } else {
      console.log('Formulário invalido');
    }
  }
}
