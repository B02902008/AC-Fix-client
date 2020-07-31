import { INavData } from '@coreui/angular';
import { acFixServices } from '../app-interface-and-const';

export interface AsideAcFixTabData {
  name: string;
  icon: string;
  active: boolean;
}

export const asideAcFixTabSetData: AsideAcFixTabData[] = acFixServices.map((service, idx) => {
  return { name: service.name, icon: service.icon, active: idx === 0 };
});

interface AcFixStage {
  name: string;
  stat: number;
}

export interface AcFixStageGlimpse {
  index: number;
  stage: AcFixStage[];
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
  { title: true, name: 'AC-Fix' },
  {
    name: 'C++',
    url: '/ac-fix/cplusplus',
    icon: 'cib-cplusplus',
    children: [ { name: 'CMake', url: '/ac-fix/cmake', icon: 'cib-cmake' } ]
  },
  {
    name: 'Java',
    url: '/ac-fix/java',
    icon: 'cib-java',
    children: [ { name: 'Gradle', url: '/ac-fix/gradle', icon: 'cib-gradle' } ]
  },
  {
    name: 'Python',
    url: '/ac-fix/python',
    icon: 'cib-python',
    children: [ { name: 'Pip', url: '/ac-fix/pip', icon: 'cib-pypi' } ]
  },
  { title: true, name: 'Statistics' },
  { name: 'History', url: '/history', icon: 'cil-history' },
  { name: 'Chart', url: '/chart', icon: 'icon-chart' }
];

