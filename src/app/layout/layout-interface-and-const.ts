import { INavData } from '@coreui/angular';
import { autofixServices } from '../app-interface-and-const';

export interface AsideAutofixTabData {
  name: string;
  icon: string;
  active: boolean;
}

export const asideAutofixTabSetData: AsideAutofixTabData[] = autofixServices.map((service, idx) => {
  return { name: service.name, icon: service.icon, active: idx === 0 };
});

interface AutofixStage {
  name: string;
  stat: number;
}

export interface AutofixStageGlimpse {
  index: number;
  stage: AutofixStage[];
  finish: boolean;
}

const itemAccentClass = {
  0:       { 'list-group-item': true, 'list-group-item-accent-info': true,  'list-group-item-accent-success': false, 'list-group-item-accent-danger': false, 'list-group-item-accent-dark': false },
  1:       { 'list-group-item': true, 'list-group-item-accent-info': false, 'list-group-item-accent-success': true,  'list-group-item-accent-danger': false, 'list-group-item-accent-dark': false },
  '-1':    { 'list-group-item': true, 'list-group-item-accent-info': false, 'list-group-item-accent-success': false, 'list-group-item-accent-danger': true,  'list-group-item-accent-dark': false },
  default: { 'list-group-item': true, 'list-group-item-accent-info': false, 'list-group-item-accent-success': false, 'list-group-item-accent-danger': false, 'list-group-item-accent-dark': true  },
  contains: (k) => (k === 0 || k === 1 || k === -1)
};
export const itemAccentClassLambda = (s: number) => (itemAccentClass.contains(s) ? itemAccentClass[s] : itemAccentClass.default);

export const hNavItems: INavData[] = [
  { name: 'Dashboard', url: '/dashboard' },
  { name: 'History', url: '/history' },
  { name: 'Chart', url: '/chart' }
];

export const sNavItems: INavData[] = [
  { title: true, name: 'Dashboard' },
  { name: 'Dashboard', url: '/dashboard', icon: 'icon-speedometer' },
  { title: true, name: 'Auto-Fix' },
  {
    name: 'C++',
    url: '/autofix/cplusplus',
    icon: 'cib-cplusplus',
    children: [ { name: 'CMake', url: '/autofix/cmake', icon: 'cib-cmake' } ]
  },
  {
    name: 'Java',
    url: '/autofix/java',
    icon: 'cib-java',
    children: [ { name: 'Gradle', url: '/autofix/gradle', icon: 'cib-gradle' } ]
  },
  {
    name: 'Python',
    url: '/autofix/python',
    icon: 'cib-python',
    children: [ { name: 'Pip', url: '/autofix/pip', icon: 'cib-pypi' } ]
  },
  { title: true, name: 'Statistics' },
  { name: 'History', url: '/history', icon: 'cil-history' },
  { name: 'Chart', url: '/chart', icon: 'icon-chart' }
];

