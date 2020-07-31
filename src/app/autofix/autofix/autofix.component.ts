import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AutofixServiceConfig, AutofixWebSocket, services } from '../autofix-interace-and-const';

import { terminalColoringPattern, terminalLogLevelColoringStrategy, APIHost } from '../../app-interface-and-const';
import { MatchingToken } from '../../common-component/terminal-style-log-display/terminal-interface';

import { AutofixService } from '../autofix.service';

@Component({
  selector: 'app-autofix',
  templateUrl: './autofix.component.html',
  styles: ['.autofix-finished-link:hover { cursor: pointer; color: #20A8D8; }']
})
export class AutofixComponent implements OnInit {

  tool =  '';
  productUrl = APIHost + '/history/product/';
  webSocket: AutofixWebSocket;
  config: AutofixServiceConfig = {} as AutofixServiceConfig;
  coloringPattern: MatchingToken[] = terminalColoringPattern;
  levelColoringStrategy = terminalLogLevelColoringStrategy;
  isFixing = () => (this.webSocket.webSocket !== null);
  isFinished = () => (this.webSocket.webSocket === null && this.webSocket.logStream.length > 0);
  isDownloadable = () => (this.webSocket.productSize > 0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AutofixService
  ) { }

  onParamReset(tool: string): void {
    if (tool === null || !services.contains(tool) || !this.service.webSockets.contains(tool) ) {
      this.router.navigate(['/error'], {
        queryParams: { code: 404, error: 'Not Found', message: 'Auto-Fix service for ' + tool + ' is not provided.' }
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
      this.service.invokeAutoFix(this.tool, socketId, input).subscribe(id => this.webSocket.buildIndex = id);
      subscription.unsubscribe();
    });
    this.service.webSocketConnect(this.tool);
  }

  restartLinkClicked(): void {
    this.webSocket.logStream = [];
    this.webSocket.buildIndex = -1;
  }

}
