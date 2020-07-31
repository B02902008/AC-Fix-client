import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AcFixServiceConfig, AcFixWebSocket, services } from '../ac-fix-interace-and-const';

import { terminalColoringPattern, terminalLogLevelColoringStrategy } from '../../app-interface-and-const';
import { MatchingToken } from '../../common-component/terminal-style-log-display/terminal-interface';
import { environment } from '../../../environments/environment';

import { AcFixService } from '../ac-fix.service';

@Component({
  selector: 'app-acfix',
  templateUrl: './ac-fix.component.html',
  styles: ['.ac-fix-finished-link:hover { cursor: pointer; color: #20A8D8; }']
})
export class AcFixComponent implements OnInit {

  tool =  '';
  productUrl = environment.APIHost + '/history/product/';
  webSocket: AcFixWebSocket;
  config: AcFixServiceConfig = {} as AcFixServiceConfig;
  coloringPattern: MatchingToken[] = terminalColoringPattern;
  levelColoringStrategy = terminalLogLevelColoringStrategy;
  isFixing = () => (this.webSocket.webSocket !== null);
  isFinished = () => (this.webSocket.webSocket === null && this.webSocket.logStream.length > 0);
  isDownloadable = () => (this.webSocket.productSize > 0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AcFixService
  ) { }

  onParamReset(tool: string): void {
    if (tool === null || !services.contains(tool) || !this.service.webSockets.contains(tool) ) {
      this.router.navigate(['/error'], {
        queryParams: { code: 404, error: 'Not Found', message: 'AC-Fix service for ' + tool + ' is not provided.' }
      });
    }
    this.tool = tool;
    this.webSocket = this.service.getWebSocket(this.tool);
    this.config = services[this.tool];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.onParamReset(params.get('tool')));
  }

  inputBtnClicked(input: string) {
    const subscription = this.webSocket.connected.subscribe(socketId => {
      this.service.invokeAcFix(this.tool, socketId, input).subscribe(id => this.webSocket.buildIndex = id);
      subscription.unsubscribe();
    });
    this.service.webSocketConnect(this.tool);
  }

  restartLinkClicked(): void {
    this.webSocket.logStream = [];
    this.webSocket.buildIndex = -1;
  }

}
