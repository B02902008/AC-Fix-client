import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnType, ColumnConfig, Pagination } from './table-interface';
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
  @Input() pagination: Pagination;
  @Input() dataRows: any[] = [];
  @Output() loadPageRequest = new EventEmitter<number>();
  jumpToPageInput: string;

  constructor() {
  }

  ngOnInit(): void {
    this.columns.forEach(column => {
      if (!column.presentType) { column.presentType = ColumnType.plainText; }
      if (!column.sortable) { column.sortable = false; }
      if (!column.center) { column.center = false; }
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

}
