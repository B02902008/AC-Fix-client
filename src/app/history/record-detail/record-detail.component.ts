import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

import { HistoryService } from '../history.service';

import { AutofixFixingRecord, dangerTheme, darkTheme, infoTheme, successTheme } from '../../app-interface-and-const';
import { terminalColoringPattern, terminalLogLevelColoringStrategy } from '../history-interface-and-const';
import { MatchingToken } from '../../common-component/terminal-style-log-display/terminal-interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit, OnDestroy {

  id: number;
  record: AutofixFixingRecord = {} as AutofixFixingRecord;
  coloringPattern: MatchingToken[] = terminalColoringPattern;
  levelColoringStrategy = terminalLogLevelColoringStrategy;
  log: string[] = [];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HistoryService
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getRecordDetail();
    this.subscription = this.service.webSocketConnectedSubject.subscribe(socketId => {
      this.service.streamWebSocket.subscribe('/ws-private/topic/autofix/log', message => this.log.push(message.body));
      this.service.streamWebSocket.subscribe('/ws-private/topic/terminate', message => {
        if (this.record.stat !== 1 && this.record.stat !== -1) { this.getRecordDetail(); }
        this.service.webSocketDisconnect();
      });
      this.service.invokeLogStream(this.id).subscribe();
    });
    if (this.service.streamWebSocket !== null) { this.service.webSocketDisconnect(); }
    this.service.webSocketConnect();
  }

  ngOnDestroy(): void {
    if (this.service.webSocketId) { this.service.webSocketDisconnect(); }
    this.log = [];
    this.subscription.unsubscribe();
  }

  getRecordDetail(): void {
    this.service.getHistoryById(this.id).subscribe(record => this.record = record);
  }

  getTimePeriod(): string {
    if (!this.record.end || !this.record.start) { return ''; }
    const seconds = Math.floor((+new Date(this.record.end) - +new Date(this.record.start)) / 1000);
    const hour = Math.floor(Math.abs(seconds) / 3600);
    const minute = Math.floor(Math.abs(seconds) / 60 - hour * 60);
    const second = Math.abs(seconds) - minute * 60 - hour * 3600;
    return (seconds >= 0 ? '' : '- ') + hour + (minute > 9 ? ':' : ':0') + minute + (second > 9 ? ':' : ':0') + second;
  }

  downloadLinkClick(): void {
    this.service.downloadFixingProduct(this.id).subscribe(blob => saveAs(blob, this.record.name + '.tar.gz'));
  }

  setRecordDetailStatIconClass(stat: number) {
    return {
      fa: true,
      'fa-circle-o': stat === 1,
      'fa-remove': stat === -1,
      'fa-hourglass-half': stat === 0,
      'fa-question': stat < -1 || stat > 1
    };
  }

  setRecordDetailStatIconColor(stat: number) {
    switch (stat) {
      case 1:
        return successTheme.code;
      case -1:
        return dangerTheme.code;
      case 0:
        return infoTheme.code;
      default:
        return darkTheme.code;
    }
  }

}
