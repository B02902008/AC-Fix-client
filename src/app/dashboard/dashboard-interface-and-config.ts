import { autofixServices } from '../app-interface-and-config';
import { ColumnConfig, ColumnType, TableCellIcon } from '../common-component/table/table-interface';

export interface AutofixLoading {
  load: number;
  core: number;
}

export interface AutofixLoadingData {
  name: string;
  icon: string;
  cur: number;
  max: number;
}

export interface DashboardCurrentQueueRowData {
  index: number;
  name: string;
  start: Date;
  routerLink: string;
}

export interface DashboardRecentResultRowData {
  index: number;
  stat: TableCellIcon;
  name: string;
  end: Date;
  routerLink: string;
}

export const autofixLoadingDataSet: AutofixLoadingData[] = autofixServices.map(service => {
  return { name: service.name, icon: service.icon, cur: 1, max: 1 };
});

export const currentQueueTableColumns: ColumnConfig[] = [
  { name: 'index', center: true, width: '50px' },
  { name: 'name' },
  { name: 'start', presentType: ColumnType.relativeDate, width: '120px' }
];

export const recentResultTableColumns: ColumnConfig[] = [
  { name: 'index', center: true, width: '50px' },
  { name: 'stat', presentType: ColumnType.icon, center: true, width: '50px' },
  { name: 'name' },
  { name: 'end', presentType: ColumnType.relativeDate, width: '120px' }
];
