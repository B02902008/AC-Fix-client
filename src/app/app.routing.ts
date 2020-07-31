import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { CoreuiLayoutComponent } from './layout/coreui-layout/coreui-layout.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'error',
    component: ErrorPageComponent
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
        path: 'ac-fix',
        loadChildren: () => import('./ac-fix/ac-fix.module').then(m => m.AcFixModule)
      },
      {
        path: 'sonar',
        loadChildren: () => import('./sonar/sonar.module').then(m => m.SonarModule)
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
