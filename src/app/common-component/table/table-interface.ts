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

const sortIconClass = {
  asc:     { fa: true, 'fa-sort-asc': true,  'fa-sort-desc': false, 'fa-sort': false },
  desc:    { fa: true, 'fa-sort-asc': false, 'fa-sort-desc': true,  'fa-sort': false },
  default: { fa: true, 'fa-sort-asc': false, 'fa-sort-desc': false, 'fa-sort': true  },
  contains: (k) => (k === 'asc' || k === 'desc')
};
export const sortIconClassLambda = (s: string) => (sortIconClass.contains(s) ? sortIconClass[s] : sortIconClass.default);
