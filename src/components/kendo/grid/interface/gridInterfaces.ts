import { GridPagerSettings } from "@progress/kendo-react-grid";
import React from "react";

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
  defaultFilter: boolean;
  align?: string;
  cellType?: string;
};

interface CommonGridProps {
  columnHeader: GridHeader[];
  buttonCount: number;
  sortableGrid: boolean | false;
  unsorted: boolean | true;
  multipleSorting: boolean | false;
  defaultFilter: boolean | false;
  resizable: boolean | false;
  gridData: object[] | null;
  displayCount: number[];
  gridWidth: number;
  gridHeight: number;
  check?: boolean | false;
  cellClick?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  addButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteButton?: (selectedRow: any[]) => void;
}

interface IColumn {
  field: string;
  title: string;
  width: number;
  align?: string;
  defaultFilter: any;

  [key: string]: any;
}

interface ItemType {
  [key: string]: any;
}

export type { AppState, GridHeader, CommonGridProps, IColumn, ItemType };
