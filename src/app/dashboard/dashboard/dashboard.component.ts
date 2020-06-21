import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { DashboardService } from '../dashboard.service';

import { successTheme, dangerTheme, darkTheme } from '../../app-interface-and-const';
import {
  DashboardCurrentQueueRowData,
  DashboardRecentResultRowData,
  autofixLoadingDataSet,
  currentQueueTableColumns,
  recentResultTableColumns
} from '../dashboard-interface-and-const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  autofixLoadingDataSet = autofixLoadingDataSet;
  currentQueueTableColumns = currentQueueTableColumns;
  currentQueueTableRows: DashboardCurrentQueueRowData[];
  recentResultTableColumns = recentResultTableColumns;
  recentResultTableRows: DashboardRecentResultRowData[];

  constructor(private service: DashboardService) {
    interval(30000).subscribe(_ => { this.getNewData(); });
  }

  ngOnInit(): void {
    this.getNewData();
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
            index: row.id,
            name: row.name,
            start: new Date(row.start),
            routerLink: '/history/' + row.id
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
            index: row.id,
            stat: this.getDashboardTableCellIcon(row.stat),
            name: row.name,
            end: new Date(row.end),
            routerLink: '/history/' + row.id
          });
        });
      });
  }

  getDashboardTableCellIcon(stat: number) {
    const iconClass = {
      fa: true,
      'fa-circle-o': stat === 1,
      'fa-remove': stat === -1,
      'fa-question': stat > 1 || stat < -1 || stat === 0
    };
    switch (stat) {
      case 1:
        return { icon: iconClass, color: successTheme.code };
      case -1:
        return { icon: iconClass, color: dangerTheme.code };
      default:
        return { icon: iconClass, color: darkTheme.code };
    }
  }

}
