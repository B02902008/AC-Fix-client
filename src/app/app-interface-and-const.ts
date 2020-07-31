import { MatchingToken, TokenType } from './common-component/terminal-style-log-display/terminal-interface';

export interface AcFixFixingRecord {
  id: number;
  stat: number;
  name: string;
  lang: string;
  tool: string;
  start: string;
  end: string;
}

export const acFixServices = [
  { name: 'cmake', icon: 'cib-cmake' },
  { name: 'gradle', icon: 'cib-gradle' },
  { name: 'pip', icon: 'cib-pypi' }
];

export const primaryTheme = { code: '#20A8D8' };
export const secondaryTheme = { code: '#C8CED3' };
export const successTheme = { code: '#4DBD74' };
export const dangerTheme = { code: '#F86C6B' };
export const warningTheme = { code: '#FFC107' };
export const infoTheme = { code: '#63C2DE' };
export const lightTheme = { code: '#F0F3F5' };
export const darkTheme = { code: '#2F353A' };

const statIconClass = {
  0:       { fa: true, 'fa-hourglass-half': true,  'fa-circle-o': false, 'fa-remove': false, 'fa-question': false },
  1:       { fa: true, 'fa-hourglass-half': false, 'fa-circle-o': true,  'fa-remove': false, 'fa-question': false },
  '-1':    { fa: true, 'fa-hourglass-half': false, 'fa-circle-o': false, 'fa-remove': true,  'fa-question': false },
  default: { fa: true, 'fa-hourglass-half': false, 'fa-circle-o': false, 'fa-remove': false, 'fa-question': true  },
  contains: (k) => (k === 0 || k === 1 || k === -1)
};
export const statIconClassLambda = (s: number) => (statIconClass.contains(s) ? statIconClass[s] : statIconClass.default);

const statIconColor = {
  0: infoTheme.code,
  1: successTheme.code,
  '-1': dangerTheme.code,
  default: darkTheme.code,
  contains: (k) => (k === 0 || k === 1 || k === -1)
};
export const statIconColorLambda = (s: number) => (statIconColor.contains(s) ? statIconColor[s] : statIconColor.default);

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

export const APIHost = 'http://localhost:5566';
export const WSHost = 'ws://localhost:5566';
export const SQHost = 'http://localhost:9000';
