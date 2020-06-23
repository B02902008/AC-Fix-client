import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreuiLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CoreuiLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then(m => m.HistoryModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
