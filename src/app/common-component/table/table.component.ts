import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { ColumnType, ColumnConfig, Pagination, Sorting, sortIconClassLambda } from './table-interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  @Input() columns: ColumnConfig[] = [];
  @Input() enableRowRouting = false;
  @Input() enablePagination = false;
  @Input() enableJumpToPage = false;
  @Input() enableSorting = false;
  @Input() currentSorting: Sorting = { sorting: '', direction: '' };
  @Input() pagination: Pagination;
  @Input() dataRows: any[] = [];
  @Output() loadPageRequest = new EventEmitter<number>();
  @Output() sortPageRequest = new EventEmitter<string>();
  jumpToPageInput: string;
  iconClass = sortIconClassLambda;

  constructor() {
  }

  ngOnInit(): void {
    this.columns.forEach(column => {
      if (!column.presentType) { column.presentType = ColumnType.plainText; }
      if (!column.sortable) { column.sortable = false; }
      if (!column.center) { column.center = false; }
      if (!column.bind) { column.bind = column.name; }
    });
  }

  jumpToPage(): void {
    const page: number = Number(this.jumpToPageInput);
    if (!isNaN(page) && page > 0 ) {
      this.jumpToPageInput = '';
      this.pagination.currentPage = Math.min(this.pagination.totalPage, page);
    }
  }

  tablePageChanged(event: PageChangedEvent): void {
    this.loadPageRequest.emit(event.page);
  }

  sortableColumnClick(event: ColumnConfig): void {
    if (!event.sortable) { return; }
    this.sortPageRequest.emit(event.bind);
  }

}
