export interface AutofixFixingRecord {
  id: number;
  stat: number;
  name: string;
  lang: string;
  tool: string;
  start: string;
  end: string;
}

export const autofixServices = [
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
