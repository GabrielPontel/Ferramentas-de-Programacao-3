import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Produto } from '../modelos/produto.modelo';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private httpClient = inject(HttpClient);
  private urlBase = environment.api + '/produtos';

  public obterTodos() {
    return this.httpClient.get<Produto[]>(`${this.urlBase}`);
  }

  public obterPeloId(id: string) {
    return this.httpClient.get<Produto>(`${this.urlBase}/${id}`);
  }

  public obterPeloNome(nome: string) {
    return this.httpClient.get<Produto[]>(
      `${this.urlBase}?nome:contains=${nome}`,
    );
  }

  public obterPelaCategoria(categoria: string) {
    return this.httpClient.get<Produto[]>(
      `${this.urlBase}?categoria:contains=${categoria}`,
    );
  }


  public cadastrar(produto: Produto) {
    return this.httpClient.post<Produto>(`${this.urlBase}`, produto);
  }

  public remover(id: string) {
    return this.httpClient.delete(`${this.urlBase}/${id}`);
  }

  public alterar(produto: Produto) {
    return this.httpClient.put<Produto>(
      `${this.urlBase}/${produto.id}`,
      produto,
    );
  }
}
