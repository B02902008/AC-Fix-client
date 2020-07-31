import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcFixComponent } from './ac-fix/ac-fix.component';

const routes: Routes = [
  {
    path: '',
    component: AcFixComponent
  },
  {
    path: ':tool',
    component: AcFixComponent
  }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AcFixRoutingModule { }
