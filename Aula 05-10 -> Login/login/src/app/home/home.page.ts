import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInputPasswordToggle, IonButton } from '@ionic/angular';
import { IonInput } from "@ionic/angular";
import { LoginService } from '../services/login.service';
import { LoginResponse } from '../modelos/login-response.modelo';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonItem, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonInputPasswordToggle, ReactiveFormsModule, IonButton],
})
export class HomePage {

  private loginService = inject(LoginService);

  private formBuilder =  inject(NonNullableFormBuilder);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor() {}

  protected login(){
    if(this.form.valid){
      const login = this.form.getRawValue();
      this.loginService.login(login).subscribe({
        next: (resposta: LoginResponse) =>{
          console.log(resposta);
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }
}
