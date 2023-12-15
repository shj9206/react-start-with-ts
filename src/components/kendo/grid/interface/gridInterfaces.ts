import {
  GridPagerSettings,
  GridRowClickEvent,
} from "@progress/kendo-react-grid";

interface AppState {
  items: object[];
  total: number;
  skip: number;
  take: number;
  pageSize: number;
  pageable: boolean | GridPagerSettings;
}

type GridHeader = {
  field: string;
  title: string;
  width: number;
  filterType?: string;
  filterable?: boolean;
  align?: string;
  cellType?: string;
};

interface CommonGridProps<T> {
  columnHeader: GridHeader[];
  buttonCount?: number;
  sortableGrid?: boolean | false;
  unsorted?: boolean | true;
  multipleSorting?: boolean | false;
  defaultFilter?: boolean | false;
  resizable?: boolean | false;
  reorder?: boolean | false;
  gridData?: never[];
  displayCount?: number[];
  gridWidth?: number;
  gridHeight?: number;
  check?: boolean;
  cellClick?: (props: GridRowClickEvent) => GridRowClickEvent;
  addButton?: ((props: T[]) => void) | null;
  deleteButton?: ((props: T[]) => void) | null;
  girdToolBar?: boolean;
}

interface IColumn {
  field: string;
  title: string;
  width: number;
  align?: string;
  defaultFilter: boolean;

  [key: string]: unknown;
}

interface ItemType<T> {
  [key: string]: T;
}

export type { AppState, GridHeader, CommonGridProps, IColumn, ItemType };
