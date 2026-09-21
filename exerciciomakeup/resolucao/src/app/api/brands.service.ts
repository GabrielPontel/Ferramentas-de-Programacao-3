import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Produto } from '../modelos/produto.modelo';

@Injectable({
    providedIn: 'root',
})
export class BrandsService {
    private httpClient = inject(HttpClient);
    private urlBase = environment.api;

    public obterPelaMarca(marca: string){
        return this.httpClient.get<Produto[]>(`${this.urlBase}/products.json?brand=${marca}`)
    }
}
