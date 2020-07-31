import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SonarReportComponent } from './sonar-report/sonar-report.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'sonar' },
    children: [
      {
        path: ':id',
        component: SonarReportComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SonarRoutingModule { }
