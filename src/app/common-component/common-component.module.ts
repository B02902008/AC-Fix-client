import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { OrdinalPipe } from './ordinal.pipe';
import { RelativeDatePipe } from './relative-date.pipe';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    OrdinalPipe,
    RelativeDatePipe
  ],
  imports: [
    CommonModule,
    CollapseModule,
    RouterModule,
    PaginationModule.forRoot(),
    FormsModule
  ],
  exports: [
    CardComponent,
    TableComponent,
    OrdinalPipe,
    RelativeDatePipe
  ]
})
export class CommonComponentModule { }
