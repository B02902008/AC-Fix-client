import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    CollapseModule
  ],
  exports: [
    CardComponent
  ]
})
export class CommonComponentModule { }
