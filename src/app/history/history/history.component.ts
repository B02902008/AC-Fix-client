import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { HistoryService } from '../history.service';

import { statIconColorLambda, statIconClassLambda } from '../../app-interface-and-const';
import { AcFixHistoryRowData, acFixHistoryTableColumns, PagedFixingRecordList } from '../history-interface-and-const';
import { Pagination, Sorting } from '../../common-component/table/table-interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

  columns = acFixHistoryTableColumns;
  pagination: Pagination = { totalEntry: 1, totalPage: 1, currentPage: 1, perPage: 1 };
  currentSorting: Sorting = { sorting: '', direction: '' };
  rows: AcFixHistoryRowData[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HistoryService
  ) { }

  ngOnInit(): void {
    this.currentSorting = {
      sorting: this.route.snapshot.paramMap.has('sorting') ? this.route.snapshot.paramMap.get('sorting') : 'id',
      direction: this.route.snapshot.paramMap.has('direction') ? this.route.snapshot.paramMap.get('direction') : 'desc'
    };
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getAllHistoryPage(Number(params.get('pageId')), params.get('sorting'), params.get('direction'))
    )).subscribe(paged => this.parsePagedList(paged));
  }

  tablePageChanged(event: number): void {
    this.router.navigate(['/history/page/' + event, this.currentSorting]);
  }

  tableSortChanged(event: string): void {
    this.currentSorting = {
      sorting: event,
      direction: this.currentSorting.sorting === event && this.currentSorting.direction === 'desc' ? 'asc' : 'desc'
    };
    this.router.navigate(['/history/page/1', this.currentSorting]);
  }

  parsePagedList(paged: PagedFixingRecordList): void {
    this.rows = [];
    paged.content.forEach(row => {
      this.rows.push({
        id: row.id,
        stat: { icon: statIconClassLambda(row.stat), color: statIconColorLambda(row.stat) },
        name: row.name,
        lang: row.lang,
        tool: row.tool,
        start: new Date(row.start),
        end: row.end ? new Date(row.end) : null,
        routerLink: ['/history', row.id]
      });
    });
    this.pagination = {
      totalEntry: paged.totalElements,
      totalPage: paged.totalPages,
      currentPage: paged.number + 1,
      perPage: paged.size
    };
  }

}
