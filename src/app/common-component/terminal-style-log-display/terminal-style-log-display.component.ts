import { Component, Input, OnInit } from '@angular/core';

import { secondaryTheme } from '../../app-interface-and-const';
import { MatchingToken } from './terminal-interface';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal-style-log-display.component.html'
})
export class TerminalStyleLogDisplayComponent implements OnInit {

  @Input() messageMatchingStrategy: MatchingToken[] = [];
  @Input() logLevelColoringStrategy: any = {};
  @Input() logTimestampColoring: string = secondaryTheme.code;
  @Input() messageList: string[] = [];
  coloringRegexPattern: RegExp = new RegExp('');

  constructor() { }

  ngOnInit(): void {
    this.coloringRegexPattern = this.messageMatchingStrategy.reduce(
      (acc, val) => new RegExp(acc.source + val.regex.source), /^/
    );
  }

  matchColoringPattern = (message: string) => ({ input: message, match: message.match(this.coloringRegexPattern) });

  replaceLeadingEndingSpace(token: string): string {
    if (token.charAt(0) === ' ') { token = '\u00a0' + token.substr(1); }
    if (token.charAt(token.length - 1) === ' ') { token = token.substr(0, token.length - 1) + '\u00a0'; }
    return token;
  }

  getLevelColoring(level: string): string {
    if (this.logLevelColoringStrategy.hasOwnProperty(level)) { return this.logLevelColoringStrategy[level]; }
    return secondaryTheme.code;
  }

}
