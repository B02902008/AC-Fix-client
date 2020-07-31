import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppService } from '../app.service';

import { AutofixFixingRecord } from '../app-interface-and-const';
import { AutofixLoading } from './dashboard-interface-and-const';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient, private service: AppService) { }

  getAutofixLoading(service: string): Observable<AutofixLoading> {
    return this.http.get<AutofixLoading>('/acfix/loading/' + service)
      .pipe(catchError(err => this.service.handleError(err)));
  }

  getCurrentQueue(): Observable<AutofixFixingRecord[]> {
    return this.http.get<AutofixFixingRecord[]>('/dashboard/current')
      .pipe(catchError(err => this.service.handleError(err)));
  }

  getRecentResult(): Observable<AutofixFixingRecord[]> {
    return this.http.get<AutofixFixingRecord[]>('/dashboard/recent')
      .pipe(catchError(err => this.service.handleError(err)));
  }

}
