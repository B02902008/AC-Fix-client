import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnType, ColumnConfig, Pagination, Sorting } from './table-interface';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';

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
    const page: number = parseInt(this.jumpToPageInput, 10);
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

  getSortingIconClass(direction: string) {
    switch (direction.toLowerCase()) {
      case 'desc':
        return { fa: true, 'fa-sort-desc': true };
      case 'asc':
        return { fa: true, 'fa-sort-asc': true };
      default:
        return { fa: true, 'fa-sort': true };
    }
  }

}
