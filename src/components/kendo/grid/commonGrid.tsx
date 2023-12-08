import * as React from "react";
import { useEffect, useState } from "react";
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridFilterChangeEvent,
    GridPageChangeEvent,
    GridPagerSettings,
    GridSortChangeEvent,
    GridToolbar
} from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';

import {Button} from '@progress/kendo-react-buttons';
import {filterBy, orderBy, SortDescriptor} from "@progress/kendo-data-query";
import '@/components/kendo/grid/css/styles.css';
import {DropdownFilterCell} from "@/components/kendo/grid/dropdownfilterCell.tsx";
import {AppState, CommonGridProps, IColumn} from './gridInterfaces.ts';
import {GirdInfoArea, CustomArea, DefaultButton} from './GridToolbarArea.tsx';

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
    const [filter, setFilter] = useState();
    const [columns, setColumns] = useState<IColumn[]>(columnHeader);

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
                take === 0 ? gridData?.length : skip + take
            ) as object[],
            total: gridData?.length as number,
            skip,
            take,
            pageSize: take,
            pageable: take === 0 ? false : pagerSettings,
        };
    };

    const [state, setState] = useState<AppState>(createState(0, displayCount[0]));

    const pageChange = (event: GridPageChangeEvent) => {
        setState(createState(event.page.skip, event.page.take));
    };

    const sortChange = (event: GridSortChangeEvent) => {
        const sortedData = orderBy(gridData, event.sort);
        setState({
            ...state,
            items: sortedData,
        });
        setSort(event.sort);
    };

    useEffect(() => {
        setState(createState(0, displayCount[0]));
    }, [gridData, displayCount]);

    const CategoryFilterCell = (props) => {
        const fieldValues = state.items;
        const uniqueValues = Array.from(new Set(fieldValues?.map((item) => item[props.field])));
        return (
            <DropdownFilterCell {...props} data={uniqueValues} defaultItem={'ALL'}/>
        );
    };

    const ColumnCell = (props: GridCellProps) => {
        const column = columns.find((col: IColumn) => col.field === props.field);
        const dataValue = props.dataItem[props.field];
        const displayValue = typeof dataValue === 'boolean' ? (dataValue ? 'TRUE' : 'FALSE') : dataValue;

        return (
            <td style={{ textAlign: column?.align || "left" }}>
                {displayValue}
            </td>
        );
    };

    const clearFilters = () => {
        setFilter(undefined);
        setSort([]);
    };

    const resetColumns = () => {
        setColumns(columnHeader);
    };

    const onColumnReorderWithResize = (e) => {
        const reorderedColumns = e.columns.sort((a, b) => a.orderIndex - b.orderIndex);
        setColumns(reorderedColumns);
    };

    return (
        <div>
            <Grid
                style={{ height: 350, width: 'fit-content' }}
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
                onFilterChange={(event: GridFilterChangeEvent) => setFilter(event.filter)}
                reorderable
                onColumnReorder={onColumnReorderWithResize}
                filterable={filterable}
                filter={filter}
                resizable={resizable}
                onColumnResize={onColumnReorderWithResize}
            >
                <GridToolbar>
                    <GirdInfoArea>
                        <span>Total {gridData?.length} </span>
                        <span>Page Size</span>
                        <select onChange={(event) => setState(createState(0, parseInt(event.target.value, 10)))}>
                            {displayCount.map((value) => <option value={value}>{value === 0 ? 'ALL' : value}</option>)}
                        </select>
                    </GirdInfoArea>
                    <CustomArea>
                        <Button>test Column </Button>
                    </CustomArea>
                    <DefaultButton>
                        <Button onClick={clearFilters} style={{ marginRight: 10 }}>Reset Filter </Button>
                        <Button onClick={resetColumns} style={{ marginRight: 10 }}>Reset table layout </Button>
                        <Button>set Column </Button>
                    </DefaultButton>
                </GridToolbar>
                {columns.map((header, index) => (
                    <Column
                        {...header}
                        cell={ColumnCell}
                        filterCell={header.filterType === 'select' ? CategoryFilterCell : undefined}
                        key={header.field + '_' + index}
                    />
                ))}
            </Grid>
        </div>
    );
}

export default CommonGrid;
