import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HistoryService } from '../history.service';

import {
  AcFixFixingRecord,
  statIconColorLambda,
  statIconClassLambda,
  terminalColoringPattern,
  terminalLogLevelColoringStrategy
} from '../../app-interface-and-const';
import { MatchingToken } from '../../common-component/terminal-style-log-display/terminal-interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit, OnDestroy {

  id: number;
  productUrl: string;
  productSize: number;
  record: AcFixFixingRecord = {} as AcFixFixingRecord;
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
    if (isNaN(id)) {
      this.router.navigate(['/error'], {
        queryParams: { code: 400, error: 'Bad Request', message: 'Invalid record id, should be a number.' }
      });
    }
    this.id = id;
    this.productUrl = environment.APIHost + '/history/product/' + this.id;
    this.log = [];
    this.getRecordDetail();
    if (this.service.webSocketId) { this.service.webSocketDisconnect(); }
    const subscription = this.service.connected.subscribe(_ => {
      this.service.webSocket.subscribe('/ws-private/topic/acfix/log', message => this.log.push(message.body));
      this.service.webSocket.subscribe('/ws-private/topic/terminate', () => {
        if (this.record.stat !== 1 && this.record.stat !== -1) { this.getRecordDetail(); }
        this.service.webSocketDisconnect();
      });
      this.service.invokeLogStream(this.id).subscribe();
      subscription.unsubscribe();
    });
    this.service.webSocketConnect();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.onParamReset(Number(params.get('id'))));
  }

  ngOnDestroy(): void {
    if (this.service.webSocketId) { this.service.webSocketDisconnect(); }
  }

  getRecordDetail(): void {
    this.service.getHistoryById(this.id).subscribe(record => this.record = record);
    this.service.headProduct(this.id).subscribe(len => this.productSize = len);
  }

  getTimePeriod(): string {
    if (!this.record.end || !this.record.start) { return ''; }
    const seconds = Math.floor((+new Date(this.record.end) - +new Date(this.record.start)) / 1000);
    const hour = Math.floor(Math.abs(seconds) / 3600);
    const minute = Math.floor(Math.abs(seconds) / 60 - hour * 60);
    const second = Math.abs(seconds) - minute * 60 - hour * 3600;
    return (seconds >= 0 ? '' : '- ') + hour + (minute > 9 ? ':' : ':0') + minute + (second > 9 ? ':' : ':0') + second;
  }

  navigateToSonar(): void {
    this.router.navigate(['/sonar', this.id]);
  }

}
