import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stomp } from '@stomp/stompjs';

import { AutofixWebSocket, webSockets } from './autofix-interace-and-const';

@Injectable({
  providedIn: 'root'
})
export class AutofixService {

  webSockets = webSockets;

  constructor(private http: HttpClient) { }

  getWebSocket(tool: string): AutofixWebSocket {
    return this.webSockets.contains(tool) ? this.webSockets[tool] : { webSocket: null, webSocketId: '', logStream: [] };
  }

  invokeAutoFix(tool: string, socketID: string, url: string): Observable<number> {
    if (!this.webSockets.contains(tool)) { return; }
    const headers = new HttpHeaders({ 'Content-Type':  'application/json' });
    return this.http.post<number>('http://140.112.90.150:5566/autofix/' + tool, { socketID, url }, { headers });
  }

  webSocketConnect(tool: string): void {
    if (!this.webSockets.contains(tool)) { return; }
    const socket: AutofixWebSocket = this.webSockets[tool];
    socket.webSocket = Stomp.over(() => new WebSocket('ws://140.112.90.150:5566/ws-connect'));
    socket.webSocket.connect({}, _ => {
      socket.webSocket.subscribe('/ws-private/topic/terminate', _ => this.webSocketDisconnect(tool));
      socket.webSocket.subscribe('/ws-private/topic/autofix/log', msg => socket.logStream.push(msg.body));
      socket.webSocket.subscribe('/ws-private/topic/autofix/stage', msg => socket.stageEmit.next(msg.body));
      socket.webSocket.subscribe('/ws-private/topic/socket-ID', msg => {
        socket.webSocketId = msg.body;
        socket.connected.next(socket.webSocketId);
      });
      socket.webSocket.send('/websocket/whoami', {}, '');
    }, _ => this.webSocketDisconnect(tool));
  }

  webSocketDisconnect(tool: string): void {
    if (!this.webSockets.contains(tool)) { return; }
    const socket: AutofixWebSocket = this.webSockets[tool];
    if (socket.webSocket !== null) { socket.webSocket.ws.close(); }
    socket.webSocket = null;
    socket.webSocketId = '';
  }

}
