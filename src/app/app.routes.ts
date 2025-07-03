import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'ferie-form',
    loadComponent: () => import('./components/ferie-form/ferie-form.component').then(m => m.FerieFormComponent)
  },
  {
    path: 'grafici',
    loadComponent: () => import('./components/ferie-grafici/ferie-grafici.component').then(m => m.FerieGraficiComponent)
  }
];
