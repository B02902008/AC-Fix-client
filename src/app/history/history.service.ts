import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CompatClient, Stomp } from '@stomp/stompjs';

import { AutofixFixingRecord } from '../app-interface-and-const';
import { PagedFixingRecordList } from './history-interface-and-const';

@Injectable()
export class HistoryService {

  streamWebSocket: CompatClient = null;
  webSocketId = '';
  webSocketConnectedSubject: Subject<string> = new Subject<any>();

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

  getHistoryById(id: number): Observable<AutofixFixingRecord> {
    if (isNaN(id)) { return null; }
    return this.http.get<AutofixFixingRecord>('http://140.112.90.150:5566/history/' + id);
  }

  downloadFixingProduct(id: number): Observable<Blob> {
    if (isNaN(id)) { return; }
    return this.http.get('http://140.112.90.150:5566/history/product/' + id, { responseType: 'blob' });
  }

  invokeLogStream(id: number): Observable<any> {
    if (isNaN(id)) { return; }
    const headers = new HttpHeaders({ 'Content-Type':  'application/json' });
    return this.http.post('http://140.112.90.150:5566/history/stream/' + id, { socketID: this.webSocketId }, { headers });
  }

  webSocketConnect() {
    this.streamWebSocket = Stomp.over(() => new WebSocket('ws://140.112.90.150:5566/ws-connect'));
    this.streamWebSocket.connect({}, frame => {
      this.streamWebSocket.subscribe('/ws-private/topic/socket-ID', message => {
        this.webSocketId = JSON.parse(message.body).content;
        this.webSocketConnectedSubject.next(this.webSocketId);
      });
      this.streamWebSocket.send('/websocket/whoami', {}, '');
    }, error => {
      this.webSocketDisconnect();
    });
  }

  webSocketDisconnect() {
    if (this.streamWebSocket !== null) { this.streamWebSocket.ws.close(); }
    this.streamWebSocket = null;
    this.webSocketId = '';
    console.log('Web socket disconnected.');
  }

}
