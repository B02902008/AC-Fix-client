import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppAsideModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CoreuiLayoutComponent } from './coreui-layout/coreui-layout.component';
import { AsideAutofixTabComponent } from './aside-autofix-tab-set/aside-autofix-tab.component';
import { StageGlimpseComponent } from './stage-glimpse/stage-glimpse.component';


@NgModule({
  declarations: [
    CoreuiLayoutComponent,
    AsideAutofixTabComponent,
    StageGlimpseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // CoreUI layout modules
    AppAsideModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    TabsModule.forRoot()
  ],
  exports: [
    CoreuiLayoutComponent
  ]
})
export class LayoutModule { }
