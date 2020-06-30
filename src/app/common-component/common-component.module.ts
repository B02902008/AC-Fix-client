import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CardComponent } from './card/card.component';
import { DropdownPrefixInputGroupComponent } from './dropdown-prefix-input-group/dropdown-prefix-input-group.component';
import { TableComponent } from './table/table.component';
import { TerminalStyleLogDisplayComponent } from './terminal-style-log-display/terminal-style-log-display.component';
import { BytesPipe } from './bytes.pipe';
import { OrdinalPipe } from './ordinal.pipe';
import { RelativeDatePipe } from './relative-date.pipe';


@NgModule({
  declarations: [
    CardComponent,
    DropdownPrefixInputGroupComponent,
    TableComponent,
    TerminalStyleLogDisplayComponent,
    BytesPipe,
    OrdinalPipe,
    RelativeDatePipe
  ],
  imports: [
    CommonModule,
    CollapseModule,
    RouterModule,
    PaginationModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    CardComponent,
    DropdownPrefixInputGroupComponent,
    TableComponent,
    TerminalStyleLogDisplayComponent,
    BytesPipe,
    OrdinalPipe,
    RelativeDatePipe
  ]
})
export class CommonComponentModule { }
