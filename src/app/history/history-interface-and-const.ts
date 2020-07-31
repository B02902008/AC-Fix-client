import { AcFixFixingRecord } from '../app-interface-and-const';
import { ColumnConfig, ColumnType, TableCellIcon } from '../common-component/table/table-interface';

export interface PagedFixingRecordList {
  content: AcFixFixingRecord[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface AcFixHistoryRowData {
  id: number;
  stat: TableCellIcon;
  name: string;
  lang: string;
  tool: string;
  start: Date;
  end: Date;
  routerLink: any[];
}

export const acFixHistoryTableColumns: ColumnConfig[] = [
  { name: 'index', sortable: true, center: true, width: '65px', bind: 'id' },
  { name: 'stat', presentType: ColumnType.icon, center: true, width: '50px' },
  { name: 'project name', bind: 'name' },
  { name: 'language', width: '120px', bind: 'lang' },
  { name: 'build tool', width: '120px', bind: 'tool' },
  { name: 'start time', presentType: ColumnType.absoluteDate, sortable: true, width: '180px', bind: 'start' },
  { name: 'end time', presentType: ColumnType.absoluteDate, sortable: true, width: '180px', bind: 'end' }
];
