import { Component, Input, OnInit } from '@angular/core';

export const ColumnType = {
  plainText: 1,
  relativeDate: 2,
  absoluteDate: 3,
  icon: 4
};

export interface ColumnConfig {
  name: string;
  presentType?: number;
  sortable?: boolean;
  center?: boolean;
  width?: string;
}

export interface Pagination {
  totalEntry: number;
  totalPage: number;
  currentPage: number;
  perPage: number;
}

export interface TableCellIcon {
  icon: any;
  color: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  @Input() columns: ColumnConfig[] = [];
  @Input() enableRowRouting = false;
  @Input() enablePagination = false;
  @Input() pagination: Pagination;
  @Input() dataRows: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.columns.forEach(column => {
      if (!column.presentType) { column.presentType = ColumnType.plainText; }
      if (!column.sortable) { column.sortable = false; }
      if (!column.center) { column.center = false; }
    });
  }

}
