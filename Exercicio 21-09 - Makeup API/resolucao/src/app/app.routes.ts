import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'produto-listagem',
    pathMatch: 'full',
  },
  {
    path: 'produto-listagem',
    loadComponent: () => import('./produto-listagem/produto-listagem.page').then( m => m.ProdutoListagemPage)
  },
];
