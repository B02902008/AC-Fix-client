import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AutofixFixingRecord } from '../app-interface-and-const';
import { AutofixLoading } from './dashboard-interface-and-const';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAutofixLoading(service: string): Observable<AutofixLoading> {
    return this.http.get<AutofixLoading>('http://140.112.90.150:5566/autofix/loading/' + service);
  }

  getCurrentQueue(): Observable<AutofixFixingRecord[]> {
    return this.http.get<AutofixFixingRecord[]>('http://140.112.90.150:5566/dashboard/current');
  }

  getRecentResult(): Observable<AutofixFixingRecord[]> {
    return this.http.get<AutofixFixingRecord[]>('http://140.112.90.150:5566/dashboard/recent');
  }

}
