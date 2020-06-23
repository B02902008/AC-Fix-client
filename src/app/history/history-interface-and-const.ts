import { ColumnConfig, ColumnType, TableCellIcon } from '../common-component/table/table-interface';
import { MatchingToken, TokenType } from '../common-component/terminal-style-log-display/terminal-interface';

import { AutofixFixingRecord, successTheme, warningTheme, infoTheme, dangerTheme, primaryTheme } from '../app-interface-and-const';

export interface PagedFixingRecordList {
  content: AutofixFixingRecord[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface AutofixHistoryRowData {
  id: number;
  stat: TableCellIcon;
  name: string;
  lang: string;
  tool: string;
  start: Date;
  end: Date;
  routerLink: any[];
}

export const autofixHistoryTableColumns: ColumnConfig[] = [
  { name: 'index', sortable: true, center: true, width: '65px', bind: 'id' },
  { name: 'stat', presentType: ColumnType.icon, center: true, width: '50px' },
  { name: 'project name', bind: 'name' },
  { name: 'language', width: '120px', bind: 'lang' },
  { name: 'build tool', width: '120px', bind: 'tool' },
  { name: 'start time', presentType: ColumnType.absoluteDate, sortable: true, width: '180px', bind: 'start' },
  { name: 'end time', presentType: ColumnType.absoluteDate, sortable: true, width: '180px', bind: 'end' }
];

export const terminalColoringPattern: MatchingToken[] = [
  { regex: /(\[)/, type: TokenType.plaintext },
  { regex: /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/, type: TokenType.timestamp },
  { regex: /(]\[)/, type: TokenType.plaintext },
  { regex: /(\w{4,5})/, type: TokenType.logLevels },
  { regex: /( ?] .+)$/, type: TokenType.plaintext }
];

export const terminalLogLevelColoringStrategy = {
  start: primaryTheme.code,
  stage: successTheme.code,
  final: primaryTheme.code,
  debug: warningTheme.code,
  error: dangerTheme.code,
  info: infoTheme.code
};
