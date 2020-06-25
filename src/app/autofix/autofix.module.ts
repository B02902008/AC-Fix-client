import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofixComponent } from './autofix/autofix.component';

import { AutofixRoutingModule } from './autofix-routing.module';
import { CommonComponentModule } from '../common-component/common-component.module';


@NgModule({
  declarations: [
    AutofixComponent
  ],
  imports: [
    CommonModule,
    AutofixRoutingModule,
    CommonComponentModule
  ],
  providers: []
})
export class AutofixModule { }
