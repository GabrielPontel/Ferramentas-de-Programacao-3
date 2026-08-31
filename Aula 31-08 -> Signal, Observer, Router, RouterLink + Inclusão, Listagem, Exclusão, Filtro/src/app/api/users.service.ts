import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { UserResponse } from '../modelos/user-response.modelo';
import { User } from '../modelos/user.modelo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  private httpClient = inject(HttpClient);
  private urlBase = environment.api + '/users'
  //IMPORTAR O ENVIRONMENT SEM PROD

  //Os métodos tem que ser public, porque arquivos que ta fora do diretorio tem que acessar esse metodo
  public obterTodos(){
    return this.httpClient.get<User[]>(`${this.urlBase}`);
  }

  public obterPeloId(id:number){
    return this.httpClient.get<User>(`${this.urlBase}/${id}`);
  }

  public obterPeloNome(nome:string){
    return this.httpClient.get<User[]>(`${this.urlBase}?first_name:contains=${nome}`);
  }


  public cadastrar(user: User){
    return this.httpClient.post<User>(`${this.urlBase}`, user);
  }

  public remover(id: number){
    //return this.httpClient.delete(this.urlBase+"/"+id);
    return this.httpClient.delete(`${this.urlBase}/${id}`);
  }

}
