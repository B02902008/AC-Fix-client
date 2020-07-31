import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentModule } from '../common-component/common-component.module';
import { SonarRoutingModule } from './sonar-routing.module';

import { SonarReportComponent } from './sonar-report/sonar-report.component';


@NgModule({
  declarations: [
    SonarReportComponent
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    SonarRoutingModule
  ]
})
export class SonarModule { }
