import * as React from "react";
import { useEffect, useState } from "react";
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridColumnMenuFilter,
  GridColumnMenuSort,
  GridColumnResizeEvent,
  GridFilterChangeEvent,
  GridPageChangeEvent,
  GridPagerSettings,
  GridSortChangeEvent,
  GridToolbar,
  getSelectedState,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";

import { Button } from "@progress/kendo-react-buttons";
import { filterBy, orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { getter } from "@progress/kendo-react-common";
import { ColumnMenu } from "./columnMenu";
import "./styles.css";

interface AppState {
  items: object[];
  total: number;
  skip: number;
  take: number;
  pageSize: number;
  pageable: boolean | GridPagerSettings;
}

interface GridHeader {
  title: string;
  column?: string;
  field: string;
  width: number;
  align?: string;
}

interface CommonGridProps {
  columnHeader: GridHeader[];
  buttonCount: number;
  sortableGrid: boolean | false;
  unsorted: boolean | true;
  multipleSorting: boolean | false;
  filterable: boolean | false;
  resizable: boolean | false;
  gridData: unknown;
  displayCount: number[];
}

interface IColumn {
  field: string;
  title: string;
  width: number;
  align: "left" | "center" | "right";

  [key: string]: any;
}

// eslint-disable-next-line react/function-component-definition
const CommonGrid: React.FC<CommonGridProps> = ({
  columnHeader,
  buttonCount,
  sortableGrid,
  unsorted,
  multipleSorting,
  filterable,
  resizable,
  gridData,
  displayCount,
}) => {
  const [sort, setSort] = useState<Array<SortDescriptor>>([]);
  const [selectOption] = useState<number[]>(() => {
    return displayCount === undefined ? [5, 10, 0] : displayCount;
  });
  const SELECTED_FIELD = "selected";
  const DATA_ITEM_KEY = "ProductID";

  const idGetter = getter(DATA_ITEM_KEY);

  const createState = (skip: number, take: number): AppState => {
    const pagerSettings: GridPagerSettings = {
      buttonCount,
      info: false,
      type: "numeric",
      pageSizes: false,
      previousNext: true,
    };

    return {
      items: gridData.slice(
        skip,
        take === 0 ? gridData.length : skip + take
      ) as object[],
      total: gridData.length,
      skip,
      take,
      pageSize: take,
      pageable: take === 0 ? false : pagerSettings,
    };
  };

  const [state, setState] = useState<AppState>(createState(0, 5));

  const sortState = (sortData: object[]) => {
    const pagerSettings: GridPagerSettings = {
      buttonCount,
      info: false,
      type: "numeric",
      pageSizes: false,
      previousNext: true,
    };

    return {
      items: sortData as object[],
      total: gridData.length,
      skip: state.skip,
      take: state.take,
      pageSize: state.take,
      pageable: state.take === 0 ? false : pagerSettings,
    };
  };

  const pageChange = (event: GridPageChangeEvent) => {
    setState(createState(event.page.skip, event.page.take));
  };

  const sortChange = (event: GridSortChangeEvent) => {
    const orderedItems =
      event.sort.length === 0
        ? createState(state.skip, state.take).items
        : orderBy(state.items, event.sort);
    setState(sortState(orderedItems));
    setSort(event.sort);
  };

  const [filter, setFilter] = useState();

  const columnProps = (header: IColumn, index: number) => {
    return {
      key: header.field,
      field: header.field,
      title: header.title,
      width: header.width,
      align: header.align,
      columnMenu: filterable ? ColumnMenu : null,
      headerClassName: isColumnActive(header.field, state) ? "active" : "",
      orderIndex: index,
    };
  };

  const ColumnCell = (props: GridCellProps) => {
    const { field } = props;
    const column = columns.find((col: IColumn) => col.field === field);

    return (
      <td style={{ textAlign: column?.align || "left" }}>
        {props.dataItem[field]}
      </td>
    );
  };

  const isColumnActive = (field: string) => {
    return (
      GridColumnMenuFilter.active(field, filter) ||
      GridColumnMenuSort.active(field, sort)
    );
  };

  const clearFilters = () => {
    setFilter(undefined);
    setState(createState(state.skip, state.take));
    setSort([]);
  };

  const [columns, setColumns] = useState(columnHeader);

  const onColumnReorderWithResize = (e) => {
    let reorderedColumns = e.columns;
    reorderedColumns = reorderedColumns.sort(
      (a, b) => a.orderIndex - b.orderIndex
    );
    setColumns(reorderedColumns);
  };

  const resetColumns = () => {
    setColumns(columnHeader);
  };

  const [selectedState, setSelectedState] = React.useState({});
  const onSelectionChange = React.useCallback(
    (event) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState]
  );

  return (
    <div>
      <Grid
        style={{ height: "350px" }}
        // data={state.items.map((item) => ({
        //     ...item,
        //     [SELECTED_FIELD]: selectedState[idGetter(item)],
        // }))}
        data={filterBy(state.items, filter)}
        onPageChange={pageChange}
        total={state.total}
        skip={state.skip}
        pageable={state.pageable}
        pageSize={state.pageSize}
        sortable={
          !sortableGrid
            ? false
            : {
                allowUnsort: unsorted,
                mode: multipleSorting ? "multiple" : "single",
              }
        }
        sort={sort}
        onSortChange={sortChange}
        onFilterChange={(event: GridFilterChangeEvent) => {
          setFilter(event.filter);
        }}
        reorderable={true}
        onColumnReorder={onColumnReorderWithResize}
        filter={filter}
        resizable={resizable}
        onColumnResize={onColumnReorderWithResize}
        // selectable={{
        //     enabled: false,
        //     drag: false,
        //     cell: false,
        //     mode: "multiple",
        // }}
        // selectedField={SELECTED_FIELD}
        // dataItemKey={DATA_ITEM_KEY}
        // onSelectionChange={onSelectionChange}
      >
        <GridToolbar>
          <span>Total {gridData.length} </span>
          <span>Page Size</span>
          <span>
            <select
              onChange={(event) => {
                setState(createState(0, parseInt(event.target.value, 10)));
              }}
            >
              {selectOption.map((value) => (
                <option value={value}>{value === 0 ? "ALL" : value}</option>
              ))}
            </select>
          </span>
          <Button onClick={clearFilters}>Reset Filter </Button>
          <Button onClick={resetColumns}>Reset table layout </Button>
          <Button>set Column </Button>
        </GridToolbar>
        {/*<Column*/}
        {/*    field={SELECTED_FIELD}*/}
        {/*    width="50px"*/}
        {/*    headerSelectionValue={*/}
        {/*        state.items.findIndex((item) => !selectedState[idGetter(item)]) === -1*/}
        {/*    }*/}
        {/*/>*/}
        {columns.map((header, index) => (
          <Column {...columnProps(header, index)} cell={ColumnCell} />
        ))}
      </Grid>
    </div>
  );
};

export default CommonGrid;
