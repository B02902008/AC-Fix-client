import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryComponent } from './history/history.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';

import { HistoryRoutingModule } from './history-routing.module';
import { CommonComponentModule } from '../common-component/common-component.module';

import { HistoryService } from './history.service';


@NgModule({
  declarations: [
    HistoryComponent,
    RecordDetailComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    CommonComponentModule
  ],
  providers: [
    HistoryService
  ]
})
export class HistoryModule { }
