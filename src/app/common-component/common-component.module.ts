import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { TerminalStyleLogDisplayComponent } from './terminal-style-log-display/terminal-style-log-display.component';
import { OrdinalPipe } from './ordinal.pipe';
import { RelativeDatePipe } from './relative-date.pipe';


@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    TerminalStyleLogDisplayComponent,
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
    RelativeDatePipe,
    TerminalStyleLogDisplayComponent
  ]
})
export class CommonComponentModule { }
