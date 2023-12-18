import React, { useCallback, useEffect, useState } from "react";
import {
  getSelectedState,
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridFilterCellProps,
  GridFilterChangeEvent,
  GridPageChangeEvent,
  GridPagerSettings,
  GridRowClickEvent,
  GridSortChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";

import { Button } from "@progress/kendo-react-buttons";
import {
  CompositeFilterDescriptor,
  filterBy,
  getter,
  orderBy,
  SortDescriptor,
} from "@progress/kendo-data-query";
import { TableSelectionChangeEvent } from "@progress/kendo-react-data-tools";
import "@/components/kendo/grid/css/styles.css";
import { CustomDropDownFilter } from "@/components/kendo/grid/CustomDropDownFilter.tsx";
import {
  AppState,
  CommonGridProps,
  GridHeader,
  ItemType,
} from "./interface/gridInterfaces.ts";
import { CustomArea, DefaultButton, GirdInfoArea } from "./GridToolbarArea.tsx";
import { useSelector } from "react-redux";
import { CustomCheckBoxFilter } from "@/components/kendo/grid/CustomCheckBoxFilter.tsx";
import { RootState } from "@/store/interface/storeInterfaces.ts";

const GridComponent = <T extends unknown>({
  columnHeader = [
    {
      field: "fieldName",
      title: "titleName",
      width: 50,
      filterType: "filterTypeName",
      filterable: false,
      align: "alignName",
      cellType: "cellTypeName",
    },
  ],
  buttonCount = 5,
  sortableGrid = false,
  unsorted = false,
  multipleSorting = false,
  defaultFilter = false,
  resizable = false,
  reorder = false,
  gridData = [],
  displayCount = [10],
  gridWidth = 0,
  gridHeight = 0,
  check = false,
  cellClick = (props: GridRowClickEvent) => {
    return props;
  },
  addButton = null,
  deleteButton = null,
  girdToolBar = false,
}: CommonGridProps<T>) => {
  const [sort, setSort] = useState<Array<SortDescriptor>>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | undefined>(
    undefined,
  );
  const [columns, setColumns] = useState<GridHeader[]>(columnHeader);

  const createState = (skip: number, take: number): AppState => {
    const pagerSettings: GridPagerSettings = {
      buttonCount,
      info: false,
      type: "numeric",
      pageSizes: false,
      previousNext: true,
    };

    return {
      items: gridData?.slice(
        skip,
        take === 0 ? gridData?.length : skip + take,
      ) as object[],
      total: gridData?.length as number,
      skip,
      take,
      pageSize: take,
      pageable: take === 0 ? false : pagerSettings,
    };
  };

  const [state, setState] = useState<AppState>(createState(0, displayCount[0]));
  const expanded = useSelector((state: RootState) => state.content.expanded);
  const [width, setWidth] = useState(gridWidth);
  const [height, setHeight] = useState(gridHeight);
  const [selectedState, setSelectedState] = useState<{
    [id: string]: boolean | number[];
  }>({});
  const SELECTED_FIELD = "selected";
  const DATA_ITEM_KEY: string = "name";
  const idGetter = getter(DATA_ITEM_KEY);
  const [selectedRow, setSelectedRow] = useState<T[]>([]);

  /* 페이지 이동 */
  const pageChange = (event: GridPageChangeEvent) => {
    setState(createState(event.page.skip, event.page.take));
  };

  /* 데이터 정렬 변경 */
  const sortChange = (event: GridSortChangeEvent) => {
    if (gridData != null) {
      const sortedData = orderBy(gridData, event.sort);
      setState({
        ...state,
        items: sortedData,
      });
    }
    setSort(event.sort);
  };

  /* 한화면에 보여지는 데이터 갯수 초기값 */
  useEffect(() => {
    setState(createState(0, displayCount[0]));
  }, [gridData]);

  /* 필터 사용을 안할때 쓰는 빈 태그 */
  function nonFilter() {
    return <div></div>;
  }

  const CategoryFilterCell: React.FC<GridFilterCellProps> = (props) => {
    type ActualType = number | string;
    let state = {
      items: [] as ItemType<ActualType>[],
    };

    const fieldValues: ItemType<ActualType>[] = state.items;

    if (!props.field) {
      return <></>; // Return empty when field is undefined
    }

    const field = props.field; // Now we know field is a string
    const uniqueValues = Array.from(
      new Set<string>(
        fieldValues?.map((item: ItemType<ActualType>) => String(item[field])) ??
          [],
      ),
    );

    return (
      <CustomDropDownFilter {...props} data={uniqueValues} defaultItem="ALL" />
    );
  };

  /* 체크 박스 필터 타입 */
  function CheckBoxFilterCell(props: any) {
    const fieldValues = state?.items;
    return <CustomCheckBoxFilter {...props} data={fieldValues} />;
  }

  /* 커스텀 컴럼 */
  const ColumnCell: React.FC<GridCellProps> = ({ field, dataItem }) => {
    if (!field) return;

    const column = columns.find((col: GridHeader) => col.field === field);
    const dataValue = dataItem[field];
    const displayValue =
      typeof dataValue === "boolean"
        ? dataValue
          ? "TRUE"
          : "FALSE"
        : dataValue;
    return (
      <td
        onClick={(event: React.MouseEvent) => {
          cellClick?.(event as unknown as GridRowClickEvent);
        }}
        style={{
          textAlign: (column?.align || "left") as
            | "left"
            | "right"
            | "center"
            | "justify",
          textDecoration: "underline",
        }}
      >
        {displayValue}
      </td>
    );
  };

  /* 필터 초기화 */
  const clearFilters = () => {
    setFilter(undefined);
    setSort([]);
  };

  /* 그리드 레이아웃 초기화 */
  const resetColumns = () => {
    setColumns(columnHeader);
  };

  /* 컬럼 width, 컬럼 순서 변경 */
  const onColumnReorderWithResize = (event: any) => {
    const reorderedColumns = event.columns.sort(
      (a: { orderIndex: number }, b: { orderIndex: number }) =>
        a.orderIndex - b.orderIndex,
    );
    if (check) reorderedColumns.shift();

    setColumns(reorderedColumns);
  };

  /* LNB extend 변경시 그리드 width 변경 */
  useEffect(() => {
    let currentWidth: number;

    if (gridWidth !== 0) {
      currentWidth = expanded ? gridWidth - 275 : gridWidth - 50;
    } else {
      currentWidth = expanded
        ? window.innerWidth - 290
        : window.innerWidth - 50;
    }

    setWidth(currentWidth);
    setHeight(gridHeight ? gridHeight : 500);
  }, [expanded, gridWidth, gridHeight]);

  const gridStyles = {
    transition: "all 200ms ease 0s",
  };

  type OnSelectionChangeEvent = TableSelectionChangeEvent<{ [x: string]: any }>;

  const onSelectionChange = useCallback(
    (event: OnSelectionChangeEvent) => {
      const checkboxElement = event.syntheticEvent?.target as HTMLInputElement;
      const checked = checkboxElement?.checked;
      let filterData;

      if (checked === undefined) return;

      if (!checked) {
        filterData = selectedRow.filter(
          // @ts-ignore
          (key: T) => key[DATA_ITEM_KEY] !== event.dataItem[DATA_ITEM_KEY],
        );

        setSelectedRow(filterData);
      } else {
        setSelectedRow([
          ...selectedRow,
          { ...event.dataItem, selected: checked },
        ]);
      }

      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState],
  );

  const onHeaderSelectionChange = useCallback(
    (event: { syntheticEvent: { target: any }; dataItems: any[] }) => {
      const checkboxElement = event.syntheticEvent?.target;
      const checked = checkboxElement.checked;
      const newSelectedState: { [key: string]: boolean } = {};
      event.dataItems.forEach((item: any) => {
        newSelectedState[idGetter(item)] = checked;
      });

      let checkedAllData: any[] = [];

      if (!checked) {
        setSelectedRow([]);
      } else {
        event.dataItems.forEach((item) => {
          checkedAllData.push({ ...item, selected: true });
        });
        setSelectedRow(checkedAllData);
      }

      setSelectedState(checked ? newSelectedState : {});
    },
    [],
  );

  return (
    <Grid
      style={{ width: width, height: height, ...gridStyles }}
      data={
        filter
          ? filterBy(
              state.items?.map((item) => ({
                ...item,
                [SELECTED_FIELD]: selectedState[idGetter(item)],
              })),
              filter,
            )
          : state.items?.map((item) => ({
              ...item,
              [SELECTED_FIELD]: selectedState[idGetter(item)],
            }))
      }
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
      onFilterChange={(event: GridFilterChangeEvent) => setFilter(event.filter)}
      onColumnReorder={onColumnReorderWithResize}
      filterable={defaultFilter}
      filter={filter}
      resizable={resizable}
      onColumnResize={onColumnReorderWithResize}
      dataItemKey={DATA_ITEM_KEY}
      selectedField={SELECTED_FIELD}
      onSelectionChange={onSelectionChange}
      onHeaderSelectionChange={onHeaderSelectionChange}
      selectable={{
        enabled: true,
        drag: false,
        cell: false,
        mode: "multiple",
      }}
      reorderable={reorder}
      onRowClick={(event) => {
        if (check) cellClick?.(event.dataItem);
      }}
    >
      {girdToolBar && (
        <GridToolbar>
          <GirdInfoArea>
            <span>Total {gridData?.length} </span>
            {displayCount.length !== 0 && (
              <div>
                <span>Page Size</span>
                <select
                  onChange={(event) =>
                    setState(createState(0, parseInt(event.target.value, 10)))
                  }
                >
                  {displayCount.map((value) => (
                    <option value={value}>{value === 0 ? "ALL" : value}</option>
                  ))}
                </select>
              </div>
            )}
          </GirdInfoArea>
          <CustomArea>
            {addButton && (
              <Button
                onClick={() => {
                  addButton?.(selectedRow);
                }}
              >
                ADD
              </Button>
            )}
            {deleteButton && (
              <Button
                onClick={() => {
                  deleteButton?.(selectedRow);
                }}
              >
                DELETE
              </Button>
            )}
          </CustomArea>
          <DefaultButton>
            <Button onClick={clearFilters} style={{ marginRight: 10 }}>
              Reset Filter{" "}
            </Button>
            <Button onClick={resetColumns} style={{ marginRight: 10 }}>
              Reset table layout{" "}
            </Button>
            <Button>set Column </Button>
          </DefaultButton>
        </GridToolbar>
      )}
      {check && (
        <Column
          locked={true}
          reorderable={false}
          resizable={false}
          field={SELECTED_FIELD}
          width={50}
          headerSelectionValue={
            state.items?.findIndex((item) => !selectedState[idGetter(item)]) ===
            -1
          }
          filterCell={nonFilter}
        />
      )}
      {columns.map((header, index) => {
        const cellProp = header.cellType === "link" ? ColumnCell : undefined;

        return (
          <Column
            {...header}
            cell={cellProp}
            filterCell={
              defaultFilter &&
              header.filterable &&
              header.filterType === "select"
                ? CategoryFilterCell
                : defaultFilter &&
                    header.filterable &&
                    header.filterType === "checkbox"
                  ? nonFilter
                  : defaultFilter && !header.filterable
                    ? defaultFilter && header.filterable == undefined
                      ? undefined
                      : nonFilter
                    : undefined
            }
            columnMenu={
              header.filterable && header.filterType === "checkbox"
                ? CheckBoxFilterCell
                : undefined
            }
            key={`${header.field}_${index}`}
          />
        );
      })}
    </Grid>
  );
};

export default GridComponent;
