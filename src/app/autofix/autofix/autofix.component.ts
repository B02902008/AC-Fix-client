import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AutofixServiceConfig, services } from '../autofix-interace-and-const';

import { terminalColoringPattern, terminalLogLevelColoringStrategy } from '../../app-interface-and-const';
import { MatchingToken } from '../../common-component/terminal-style-log-display/terminal-interface';

import { AutofixService } from '../autofix.service';

@Component({
  selector: 'app-autofix',
  templateUrl: './autofix.component.html',
  styles: ['.autofix-finished-link:hover { cursor: pointer; color: #20A8D8; }']
})
export class AutofixComponent implements OnInit {

  tool =  '';
  config: AutofixServiceConfig = {} as AutofixServiceConfig;
  coloringPattern: MatchingToken[] = terminalColoringPattern;
  levelColoringStrategy = terminalLogLevelColoringStrategy;
  isFixing = () => (this.service.getWebSocket(this.tool).webSocket !== null);
  isFinished = () => (this.service.getWebSocket(this.tool).webSocket === null && this.service.getWebSocket(this.tool).logStream.length > 0);
  isDownloadable = () => (this.service.getWebSocket(this.tool).productSize > 0);

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
    this.config = services[tool];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.onParamReset(params.get('tool')));
  }

  inputBtnClicked(input: string) {
    const socket = this.service.getWebSocket(this.tool);
    const subscription = socket.connected.subscribe(socketId => {
      this.service.invokeAutoFix(this.tool, socketId, input).subscribe(id => socket.buildIndex = id);
      subscription.unsubscribe();
    });
    this.service.webSocketConnect(this.tool);
  }

  restartLinkClicked(): void {
    this.service.getWebSocket(this.tool).logStream = [];
    this.service.getWebSocket(this.tool).buildIndex = -1;
  }

}
