import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'diretiva-estratura',
    loadComponent: () => import('./diretiva-estratura/diretiva-estratura.page').then( m => m.DiretivaEstraturaPage)
  },
  {
    path: '',
    redirectTo: 'diretiva-estratura',
    pathMatch: 'full',
  },
  
];
