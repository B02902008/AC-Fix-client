import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofixLoadingComponent } from './autofix-loading/autofix-loading.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonComponentModule } from '../common-component/common-component.module';

import { DashboardService } from './dashboard.service';


@NgModule({
  declarations: [
    DashboardComponent,
    AutofixLoadingComponent,
    LoadingIconComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonComponentModule
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
