export const ColumnType = {
  plainText: 1,
  relativeDate: 2,
  absoluteDate: 3,
  icon: 4
};

export interface ColumnConfig {
  name: string;
  presentType?: number;
  sortable?: boolean;
  center?: boolean;
  width?: string;
  bind?: string;
}

export interface Pagination {
  totalEntry: number;
  totalPage: number;
  currentPage: number;
  perPage: number;
}

export interface Sorting {
  sorting: string;
  direction: string;
}

export interface TableCellIcon {
  icon: any;
  color: string;
}
