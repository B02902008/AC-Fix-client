import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppService } from '../app.service';

import { AcFixFixingRecord } from '../app-interface-and-const';
import { AcFixLoading } from './dashboard-interface-and-const';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient, private service: AppService) { }

  getAcFixLoading(service: string): Observable<AcFixLoading> {
    return this.http.get<AcFixLoading>('/acfix/loading/' + service)
      .pipe(catchError(err => this.service.handleError(err)));
  }

  getCurrentQueue(): Observable<AcFixFixingRecord[]> {
    return this.http.get<AcFixFixingRecord[]>('/dashboard/current')
      .pipe(catchError(err => this.service.handleError(err)));
  }

  getRecentResult(): Observable<AcFixFixingRecord[]> {
    return this.http.get<AcFixFixingRecord[]>('/dashboard/recent')
      .pipe(catchError(err => this.service.handleError(err)));
  }

}
