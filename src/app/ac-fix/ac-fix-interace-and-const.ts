import { DropdownPrefixChoice } from '../common-component/dropdown-prefix-input-group/dropdown-prefix-interface';
import { CompatClient } from '@stomp/stompjs';
import { Subject } from 'rxjs';

export interface AcFixServiceConfig {
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
      'Paste Github/GitLab repository URL in the text box below, and click the start button to invoke a new Cmake AC-Fix process.\n' +
      'One can only invoke one Cmake AC-Fix process at a time, the start button will be disabled until current service terminate.\n' +
      'The repository should be a project using Cmake as its build tool.'
  } as AcFixServiceConfig,
  gradle: {
    source: [
      { name: 'Github', icon: 'cib-github', prefix: 'https://github.com/' },
      { name: 'GitLab', icon: 'cib-gitlab', prefix: 'https://gitlab.com/' }
      ],
    manual:
      'Paste Github/GitLab repository URL in the text box below, and click the start button to invoke a new Gradle AC-Fix process.\n' +
      'One can only invoke one Gradle AC-Fix process at a time, the start button will be disabled until current service terminate.\n' +
      'The repository should be a project using Gradle as its build tool.\n' +
      'The timestamp in fixing log uses time zone GMT+00:00.\n' +
      'Android projects is currently not supported.'
  } as AcFixServiceConfig,
  pip: {
    source: [
      { name: 'PyPI', icon: 'cib-pypi', prefix: 'https://pypi.org/project/' },
      { name: 'Github', icon: 'cib-github', prefix: 'https://github.com/' },
      { name: 'GitLab', icon: 'cib-gitlab', prefix: 'https://gitlab.com/' }
      ],
    manual:
      'Paste PyPI/Github/GitLab repository URL in the text box below, and click the start button to invoke a new Pip AC-Fix process.\n' +
      'One can only invoke one Pip AC-Fix process at a time, the start button will be disabled until current service terminate.\n' +
      'The repository should be a project using Pip as its build tool.'
  } as AcFixServiceConfig,
  contains: (s) => (['cmake', 'gradle', 'pip'].includes(s))
};

export interface AcFixWebSocket {
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
  } as AcFixWebSocket,
  gradle: {
    webSocket: null,
    webSocketId: '',
    connected: new Subject<string>(),
    logStream: [],
    stageEmit: new Subject<string>(),
    buildIndex: -1,
    productSize: 0
  } as AcFixWebSocket,
  pip: {
    webSocket: null,
    webSocketId: '',
    connected: new Subject<string>(),
    logStream: [],
    stageEmit: new Subject<string>(),
    buildIndex: -1,
    productSize: 0
  } as AcFixWebSocket,
  contains: (s) => (['cmake', 'gradle', 'pip'].includes(s))
};
