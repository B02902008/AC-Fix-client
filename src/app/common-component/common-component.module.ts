import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { RelativeDatePipe } from './relative-date.pipe';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    RelativeDatePipe
  ],
    imports: [
        CommonModule,
        CollapseModule,
        RouterModule
    ],
  exports: [
    CardComponent,
    TableComponent,
    RelativeDatePipe
  ]
})
export class CommonComponentModule { }
