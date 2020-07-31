import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcFixComponent } from './ac-fix/ac-fix.component';

import { AcFixRoutingModule } from './ac-fix-routing.module';
import { CommonComponentModule } from '../common-component/common-component.module';


@NgModule({
  declarations: [
    AcFixComponent
  ],
  imports: [
    CommonModule,
    AcFixRoutingModule,
    CommonComponentModule
  ],
  providers: []
})
export class AcFixModule { }
