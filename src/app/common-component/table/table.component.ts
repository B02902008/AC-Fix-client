import { Component, Input, OnInit } from '@angular/core';
import { ColumnType, ColumnConfig, Pagination } from './table-interface';

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
