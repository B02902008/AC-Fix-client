import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PagedFixingRecordList } from './history-interface-and-const';

@Injectable()
export class HistoryService {

  constructor(private http: HttpClient) { }

  getAllHistoryDefault(): Observable<PagedFixingRecordList> {
    return this.http.get<PagedFixingRecordList>('http://140.112.90.150:5566/history/');
  }

  getAllHistoryPage(pageId: number, sorting: string, direction: string): Observable<PagedFixingRecordList> {
    if (isNaN(pageId)) { return this.getAllHistoryDefault(); }
    let params = new HttpParams();
    if (sorting) { params = params.set('sorting', sorting); }
    if (direction) { params = params.set('direction', direction); }
    return this.http.get<PagedFixingRecordList>('http://140.112.90.150:5566/history/page/' + pageId, { params });
  }

}
