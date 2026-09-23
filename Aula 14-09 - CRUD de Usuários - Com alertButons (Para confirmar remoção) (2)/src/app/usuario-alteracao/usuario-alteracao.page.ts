import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonTitle, IonToolbar } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../api/users.service';
import { User } from '../modelos/user.modelo';

@Component({
  selector: 'app-usuario-alteracao',
  templateUrl: './usuario-alteracao.page.html',
  styleUrls: ['./usuario-alteracao.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonButton,
    ReactiveFormsModule,
    IonList,
    IonInput,
    RouterLink
  ],
})
export class UsuarioAlteracaoPage {
  private route = inject(ActivatedRoute);
  private userService = inject(UsersService);
  private user! : User;

  private formBuilder = inject(NonNullableFormBuilder);

  protected form = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: [''],
    email: [''],
    id: [''],
    avatar: [''],
  });

  private router = inject(Router);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
      this.obterUsuario(id);
  }

  private obterUsuario(id: string){
    this.userService.obterPeloId(id).subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user);
        this.form.setValue(this.user);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  protected alterar(){
    if (this.form.valid) {
    
      this.user = this.form.getRawValue();

      this.userService.alterar(this.user).subscribe({
        next: () => {
          console.log('Usuário alterado');
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
