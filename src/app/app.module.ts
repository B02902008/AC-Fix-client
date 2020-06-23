import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppAsideModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { CoreuiLayoutComponent } from './layout';

const APP_CONTAINERS = [
  CoreuiLayoutComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    // CoreUI layout modules
    AppAsideModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    TabsModule.forRoot()
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
