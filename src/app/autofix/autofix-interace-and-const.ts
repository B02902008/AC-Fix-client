import { DropdownPrefixChoice } from '../common-component/dropdown-prefix-input-group/dropdown-prefix-interface';
import { CompatClient } from '@stomp/stompjs';
import { Subject } from 'rxjs';

export interface AutofixServiceConfig {
  source: DropdownPrefixChoice[];
  manual: string;
}

export const services = {
  cmake: {
    source: [
      { name: 'Github', icon: 'cib-github', prefix: 'https://github.com/' },
      { name: 'GitLab', icon: 'cib-gitlab', prefix: 'https://gitlab.com/' }
      ],
    manual:
      'Paste Github/GitLab repository URL in the text box below, and click the start button to invoke a new Cmake Auto-Fix process.\n' +
      'One can only invoke one Cmake Auto-Fix process at a time, the start button will be disabled until current service terminate.\n' +
      'The repository should be a project using Cmake as its build tool.'
  } as AutofixServiceConfig,
  gradle: {
    source: [
      { name: 'Github', icon: 'cib-github', prefix: 'https://github.com/' },
      { name: 'GitLab', icon: 'cib-gitlab', prefix: 'https://gitlab.com/' }
      ],
    manual:
      'Paste Github/GitLab repository URL in the text box below, and click the start button to invoke a new Gradle Auto-Fix process.\n' +
      'One can only invoke one Gradle Auto-Fix process at a time, the start button will be disabled until current service terminate.\n' +
      'The repository should be a project using Gradle as its build tool.\n' +
      'The timestamp in fixing log uses time zone GMT+00:00.\n' +
      'Android projects is currently not supported.'
  } as AutofixServiceConfig,
  pip: {
    source: [
      { name: 'PyPI', icon: 'cib-pypi', prefix: 'https://pypi.org/project/' },
      { name: 'Github', icon: 'cib-github', prefix: 'https://github.com/' },
      { name: 'GitLab', icon: 'cib-gitlab', prefix: 'https://gitlab.com/' }
      ],
    manual:
      'Paste PyPI/Github/GitLab repository URL in the text box below, and click the start button to invoke a new Pip Auto-Fix process.\n' +
      'One can only invoke one Pip Auto-Fix process at a time, the start button will be disabled until current service terminate.\n' +
      'The repository should be a project using Pip as its build tool.'
  } as AutofixServiceConfig,
  contains: (s) => (['cmake', 'gradle', 'pip'].includes(s))
};

export interface AutofixWebSocket {
  webSocket: CompatClient;
  webSocketId: string;
  connected: Subject<string>;
  logStream: string[];
  stageEmit: Subject<string>;
  buildIndex: number;
  productSize: number;
}

export const webSockets = {
  cmake: {
    webSocket: null,
    webSocketId: '',
    connected: new Subject<string>(),
    logStream: [],
    stageEmit: new Subject<string>(),
    buildIndex: -1,
    productSize: 0
  } as AutofixWebSocket,
  gradle: {
    webSocket: null,
    webSocketId: '',
    connected: new Subject<string>(),
    logStream: [],
    stageEmit: new Subject<string>(),
    buildIndex: -1,
    productSize: 0
  } as AutofixWebSocket,
  pip: {
    webSocket: null,
    webSocketId: '',
    connected: new Subject<string>(),
    logStream: [],
    stageEmit: new Subject<string>(),
    buildIndex: -1,
    productSize: 0
  } as AutofixWebSocket,
  contains: (s) => (['cmake', 'gradle', 'pip'].includes(s))
};
