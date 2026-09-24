import { Categoria } from "./categoria.modelo";

export interface Produto{
    id:string,
    nome:string,
    categoria: Categoria,
    preco: number,
    quantidade: number,
    fornecedor:string,
}