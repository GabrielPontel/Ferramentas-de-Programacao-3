import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login } from '../modelos/login.modelo';
import { LoginResponse } from '../modelos/login-response.modelo';

@Service()
export class LoginService {

    private httpClient = inject(HttpClient);
    private urlBase = environment.api + "/users";

    public login(login:Login){
        return this.httpClient.post<LoginResponse>(this.urlBase, login);
    }
}
