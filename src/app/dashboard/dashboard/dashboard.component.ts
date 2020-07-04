import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { DashboardService } from '../dashboard.service';

import { statIconColorLambda, statIconClassLambda } from '../../app-interface-and-const';
import {
  DashboardCurrentQueueRowData,
  DashboardRecentResultRowData,
  autofixLoadingDataSet,
  currentQueueTableColumns,
  recentResultTableColumns
} from '../dashboard-interface-and-const';

@Component({
  // Avoid magic selector 'app-dashboard'
  selector: 'app-dashboard-non-coreui',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  autofixLoadingDataSet = autofixLoadingDataSet;
  currentQueueTableColumns = currentQueueTableColumns;
  currentQueueTableRows: DashboardCurrentQueueRowData[] = [];
  recentResultTableColumns = recentResultTableColumns;
  recentResultTableRows: DashboardRecentResultRowData[] = [];
  refreshSubscription: Subscription;

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.getNewData();
    this.refreshSubscription = interval(30000).subscribe(_ => { this.getNewData(); });
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  getNewData(): void {
    this.getCurrentLoad();
    this.getCurrentQueue();
    this.getRecentResult();
  }

  getCurrentLoad(): void {
    this.autofixLoadingDataSet.forEach(data => {
      this.service.getAutofixLoading(data.name)
        .subscribe(loading => {
          data.cur = loading.load;
          data.max = loading.core;
        });
    });
  }

  getCurrentQueue(): void {
    this.service.getCurrentQueue()
      .subscribe(rows => {
        this.currentQueueTableRows = [];
        rows.forEach(row => {
          this.currentQueueTableRows.push({
            id: row.id,
            name: row.name,
            start: new Date(row.start),
            routerLink: ['/history', row.id]
          });
        });
      });
  }

  getRecentResult(): void {
    this.service.getRecentResult()
      .subscribe(rows => {
        this.recentResultTableRows = [];
        rows.forEach(row => {
          this.recentResultTableRows.push({
            id: row.id,
            stat: { icon: statIconClassLambda(row.stat), color: statIconColorLambda(row.stat) },
            name: row.name,
            end: new Date(row.end),
            routerLink: ['/history', row.id]
          });
        });
      });
  }

}
