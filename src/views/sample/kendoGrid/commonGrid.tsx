import * as React from 'react';
import {
    Grid,
    GridColumn as Column, GridColumnMenuFilter, GridColumnMenuSort, GridColumnReorderEvent,
    GridFilterChangeEvent,
    GridPageChangeEvent,
    GridPagerSettings, GridSortChangeEvent,
    GridToolbar
} from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';

import {Button} from '@progress/kendo-react-buttons';
import {orderBy, SortDescriptor, filterBy} from "@progress/kendo-data-query";
import {ColumnMenu} from './columnMenu';
import {useEffect, useState} from "react";
import './styles.css';

interface AppState {
    items: object[],
    total: number,
    skip: number,
    take: number,
    pageSize: number,
    pageable: boolean | GridPagerSettings
}

interface GridHeader {
    column: string;
    field: string;
}

interface CommonGridProps {
    columnHeader: GridHeader[];
    buttonCount: number;
    sortableGrid: boolean | false;
    unsorted: boolean | true;
    multipleSorting: boolean | false;
    filterable: boolean | false;
    resizable: boolean | false;
    gridData: object[];
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
                                                   gridData
                                               }) => {

    const [sort, setSort] = useState<Array<SortDescriptor>>([]);

    const createState = (skip: number, take: number): AppState => {
        const pagerSettings: GridPagerSettings = {
            buttonCount,
            info: false,
            type: 'numeric',
            pageSizes: false,
            previousNext: true
        }

        return {
            items: gridData.slice(skip, take === 0 ? gridData.length : skip + take) as object[],
            total: gridData.length,
            skip,
            take,
            pageSize: take,
            pageable: take === 0 ? false : pagerSettings
        };
    }

    const [state, setState] = useState<AppState>(createState(0, 5))

    const sortState = (sortData: object[]) => {
        const pagerSettings: GridPagerSettings = {
            buttonCount,
            info: false,
            type: 'numeric',
            pageSizes: false,
            previousNext: true
        }

        return {
            items: sortData as object[],
            total: gridData.length,
            skip: state.skip,
            take: state.take,
            pageSize: state.take,
            pageable: state.take === 0 ? false : pagerSettings
        };
    }

    const pageChange = (event: GridPageChangeEvent) => {
        setState(createState(event.page.skip, event.page.take));
    }

    const sortChange = (event: GridSortChangeEvent) => {

        const orderedItems = event.sort.length === 0 ?
            createState(state.skip, state.take).items : orderBy(state.items, event.sort);
        setState(sortState(orderedItems));
        setSort(event.sort);
    };

    const [filter, setFilter] = useState();

    const columnProps = (field: string) => {
        return {
            key: field,
            field,
            title: field,
            columnMenu: filterable ? ColumnMenu : null,
            headerClassName: isColumnActive(field, state) ? 'active' : ''
        };
    }

    const isColumnActive = (field: string) => {
        return GridColumnMenuFilter.active(field, filter) ||
            GridColumnMenuSort.active(field, sort);
    }

    const clearFilters = () => {
        setFilter(undefined);
        setState(createState(state.skip, state.take));
        setSort([]);
        // columnHeader
    };

    // 컬럼 레이아웃의 초기 상태를 저장
    const initialColumnOrder = [...columnHeader.map(header => header.field)];
    // 컬럼 레이아웃의 현재 상태를 관리하는 state
    const [columnOrder, setColumnOrder] = useState(initialColumnOrder);


    const handleReset = (): void => {
        // 초기 레이아웃 상태로 되돌림
        setColumnOrder(initialColumnOrder);
    };

    useEffect(()=>{
        console.log(columnOrder)
    },[columnOrder])


    const arrayEquals = (a: any[], b: any[]): boolean => {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
    };


    /* TODO 컬럼 이동 초기화 작업중 */
    const handleColumnReorder = (event: GridColumnReorderEvent): void => {
        const newColumnOrder = [...event.columns].sort((a, b) => a.orderIndex - b.orderIndex).map(order => order.field);

        setColumnOrder(prevState => {
            if (arrayEquals(prevState, newColumnOrder)) {
                return prevState;
            } else {
                return newColumnOrder;
            }
        });
    };

    return (
        <div>
            <Grid
                style={{height: '350px', justifyContent: 'justifyContent'}}
                data={filterBy(state.items, filter)}
                onPageChange={pageChange}
                total={state.total}
                skip={state.skip}
                pageable={state.pageable}
                pageSize={state.pageSize}
                sortable={!sortableGrid ? false : {
                    allowUnsort: unsorted,
                    mode: multipleSorting ? "multiple" : "single"
                }}
                sort={sort}
                onSortChange={sortChange}
                onFilterChange={(e: GridFilterChangeEvent) => {
                    setFilter(e.filter);
                }}
                resizable={resizable}
                reorderable={true}
                onColumnReorder={(event) => {
                    handleColumnReorder(event);
                }}
            >
                <GridToolbar>
                    <span>Total {gridData.length} </span>
                    <span>Page Size</span>
                    <span>
              <select onChange={
                  (event) => {
                      setState(createState(0, parseInt(event.target.value, 10)));
                  }
              }>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={0}>All</option>
              </select>
             </span>
                    <Button onClick={clearFilters}>Reset Filter </Button>
                    <Button onClick={handleReset}>Reset table layout </Button>
                    <Button>set Column </Button>
                </GridToolbar>
                {columnOrder.map(header => (
                    <Column {...columnProps(header)} />
                ))}
            </Grid>
        </div>
    );
}

export default CommonGrid;