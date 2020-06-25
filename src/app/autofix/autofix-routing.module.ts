import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutofixComponent } from './autofix/autofix.component';

const routes: Routes = [
  {
    path: '',
    component: AutofixComponent
  },
  {
    path: ':tool',
    component: AutofixComponent
  }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AutofixRoutingModule { }
