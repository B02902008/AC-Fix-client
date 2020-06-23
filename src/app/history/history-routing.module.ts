import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryComponent } from './history/history.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'history' },
    children: [
      {
        path: '',
        component: HistoryComponent
      },
      {
        path: 'page',
        component: HistoryComponent
      },
      {
        path: 'page/:pageId',
        component: HistoryComponent
      },
      {
        path: ':id',
        component: RecordDetailComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HistoryRoutingModule { }
