import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HistoryService } from '../history.service';

import { AutofixFixingRecord, statIconColorLambda, statIconClassLambda, terminalColoringPattern, terminalLogLevelColoringStrategy } from '../../app-interface-and-const';
import { MatchingToken } from '../../common-component/terminal-style-log-display/terminal-interface';

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
  iconColor = statIconColorLambda;
  iconClass = statIconClassLambda;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HistoryService
  ) { }

  onParamReset(id: number): void {
    if (isNaN(id)) { return; /* TODO: route to 404 */ }
    this.id = id;
    this.log = [];
    this.getRecordDetail();
    if (this.service.webSocketId) { this.service.webSocketDisconnect(); }
    const subscription = this.service.connected.subscribe(_ => {
      this.service.webSocket.subscribe('/ws-private/topic/autofix/log', message => this.log.push(message.body));
      this.service.webSocket.subscribe('/ws-private/topic/terminate', _ => {
        if (this.record.stat !== 1 && this.record.stat !== -1) { this.getRecordDetail(); }
        this.service.webSocketDisconnect();
      });
      this.service.invokeLogStream(this.id).subscribe();
      subscription.unsubscribe();
    });
    this.service.webSocketConnect();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.onParamReset(parseInt(params.get('id'), 10)));
  }

  ngOnDestroy(): void {
    if (this.service.webSocketId) { this.service.webSocketDisconnect(); }
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

}
