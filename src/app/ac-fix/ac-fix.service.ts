import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Stomp } from '@stomp/stompjs';

import { AppService } from '../app.service';

import { AcFixWebSocket, webSockets } from './ac-fix-interace-and-const';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcFixService {

  webSockets = webSockets;

  constructor(private http: HttpClient, private service: AppService) { }

  getWebSocket(tool: string): AcFixWebSocket {
    return this.webSockets.contains(tool) ? this.webSockets[tool] : { webSocket: null, webSocketId: '', logStream: [] };
  }

  headProduct(id: number): Observable<number> {
    if (isNaN(id)) { return of(0); }
    return this.http.head('/history/product/' + id, { observe: 'response' })
      .pipe(map(res => Number(res.headers.get('Content-Length'))), catchError(_ => of(0)));
  }

  invokeAcFix(tool: string, socketID: string, url: string): Observable<number> {
    if (!this.webSockets.contains(tool)) { return; }
    const headers = new HttpHeaders({ 'Content-Type':  'application/json' });
    return this.http.post<number>('/acfix/' + tool, { socketID, url }, { headers })
      .pipe(catchError(err => {
        this.webSocketDisconnect(tool);
        return this.service.handleError(err);
      }));
  }

  webSocketConnect(tool: string): void {
    if (!this.webSockets.contains(tool)) { return; }
    const socket: AcFixWebSocket = this.webSockets[tool];
    socket.webSocket = Stomp.over(() => new WebSocket(environment.WSHost + '/ws-connect'));
    socket.webSocket.connect({}, _ => {
      socket.webSocket.subscribe('/ws-private/topic/terminate', () => this.webSocketDisconnect(tool));
      socket.webSocket.subscribe('/ws-private/topic/acfix/log', msg => socket.logStream.push(msg.body));
      socket.webSocket.subscribe('/ws-private/topic/acfix/stage', msg => socket.stageEmit.next(msg.body));
      socket.webSocket.subscribe('/ws-private/topic/socket-ID', msg => {
        socket.webSocketId = msg.body;
        socket.connected.next(socket.webSocketId);
      });
      socket.webSocket.send('/websocket/whoami', {}, '');
    }, _ => this.webSocketDisconnect(tool));
  }

  webSocketDisconnect(tool: string): void {
    if (!this.webSockets.contains(tool)) { return; }
    const socket: AcFixWebSocket = this.webSockets[tool];
    if (socket.webSocket !== null) { socket.webSocket.ws.close(); }
    socket.webSocket = null;
    socket.webSocketId = '';
    this.headProduct(socket.buildIndex).subscribe(len => socket.productSize = len);
  }

}
