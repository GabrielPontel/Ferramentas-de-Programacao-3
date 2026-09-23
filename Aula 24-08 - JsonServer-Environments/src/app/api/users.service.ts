import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../modelos/user-response.modelo';
import { User } from '../modelos/user.modelo';

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

  }

  public cadastrar(user: any){

  }

  public remover(id: number){
    //return this.httpClient.delete(this.urlBase+"/"+id);
    return this.httpClient.delete(`${this.urlBase}/${id}`);
  }

}
