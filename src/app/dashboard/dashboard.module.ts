import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonComponentModule } from '../common-component/common-component.module';

import { DashboardService } from './dashboard.service';


@NgModule({
  declarations: [
    DashboardComponent,
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
