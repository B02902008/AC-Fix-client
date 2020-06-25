import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { CoreuiLayoutComponent } from './layout/coreui-layout/coreui-layout.component';

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
      },
      {
        path: 'autofix',
        loadChildren: () => import('./autofix/autofix.module').then(m => m.AutofixModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [ LayoutModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
