import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CompatClient, Stomp } from '@stomp/stompjs';

import { AppService } from '../app.service';

import { AutofixFixingRecord } from '../app-interface-and-const';
import { PagedFixingRecordList } from './history-interface-and-const';

@Injectable()
export class HistoryService {

  webSocket: CompatClient = null;
  webSocketId = '';
  connected: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private service: AppService) { }

  getAllHistoryDefault(): Observable<PagedFixingRecordList> {
    return this.http.get<PagedFixingRecordList>('http://140.112.90.150:5566/history/')
      .pipe(catchError(err => this.service.handleError(err)));
  }

  getAllHistoryPage(pageId: number, sorting: string, direction: string): Observable<PagedFixingRecordList> {
    if (isNaN(pageId) || pageId <= 0) { return this.getAllHistoryDefault(); }
    let params = new HttpParams();
    if (sorting) { params = params.set('sorting', sorting); }
    if (direction) { params = params.set('direction', direction); }
    return this.http.get<PagedFixingRecordList>('http://140.112.90.150:5566/history/page/' + pageId, { params })
      .pipe(catchError(err => this.service.handleError(err)));
  }

  getHistoryById(id: number): Observable<AutofixFixingRecord> {
    if (isNaN(id)) { return null; }
    return this.http.get<AutofixFixingRecord>('http://140.112.90.150:5566/history/' + id)
      .pipe(catchError(err => this.service.handleError(err)));
  }

  headProduct(id: number): Observable<number> {
    if (isNaN(id)) { return of(0); }
    return this.http.head('http://140.112.90.150:5566/history/product/' + id, { observe: 'response' })
      .pipe(map(res => Number(res.headers.get('Content-Length'))), catchError(_ => of(0)));
  }

  invokeLogStream(id: number): Observable<any> {
    if (isNaN(id)) { return; }
    const headers = new HttpHeaders({ 'Content-Type':  'application/json' });
    return this.http.post('http://140.112.90.150:5566/history/stream/' + id, { socketID: this.webSocketId }, { headers })
      .pipe(catchError(err => this.service.handleError(err)));
  }

  webSocketConnect() {
    this.webSocket = Stomp.over(() => new WebSocket('ws://140.112.90.150:5566/ws-connect'));
    this.webSocket.connect({}, _ => {
      this.webSocket.subscribe('/ws-private/topic/socket-ID', msg => {
        this.webSocketId = msg.body;
        this.connected.next(this.webSocketId);
      });
      this.webSocket.send('/websocket/whoami', {}, '');
    }, _ => this.webSocketDisconnect());
  }

  webSocketDisconnect() {
    if (this.webSocket !== null) { this.webSocket.ws.close(); }
    this.webSocket = null;
    this.webSocketId = '';
  }

}
