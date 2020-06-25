import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofixComponent } from './autofix/autofix.component';

import { AutofixRoutingModule } from './autofix-routing.module';
import { CommonComponentModule } from '../common-component/common-component.module';

import { AutofixService } from './autofix.service';


@NgModule({
  declarations: [
    AutofixComponent
  ],
  imports: [
    CommonModule,
    AutofixRoutingModule,
    CommonComponentModule
  ],
  providers: [
    AutofixService
  ]
})
export class AutofixModule { }
