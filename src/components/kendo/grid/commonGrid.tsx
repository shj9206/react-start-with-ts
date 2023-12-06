import * as React from "react";
import {useEffect, useState} from "react";
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
import {getter} from "@progress/kendo-react-common";
import '@/components/kendo/grid/css/styles.css';
import {DropdownFilterCell} from "@/components/kendo/grid/dropdownfilterCell.tsx";
import {AppState, CommonGridProps, IColumn} from './gridInterfaces.ts';
import {GirdInfoArea, CustomArea, DefaultButton} from './GridToolbarArea.tsx'

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

    const [state, setState] = useState<AppState>();

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
            total: gridData?.length,
            skip: state?.skip,
            take: state?.take,
            pageSize: state?.take,
            pageable: state?.take === 0 ? false : pagerSettings,
        };
    };

    const pageChange = (event: GridPageChangeEvent) => {
        setState(createState(event.page.skip, event.page.take));
    };

    const sortChange = (event: GridSortChangeEvent) => {
        setState(sortState(orderBy(createState(state?.skip, state?.take).items, event.sort)));
        setSort(event.sort);
    };

    const [filter, setFilter] = useState();

    const getUniqueFieldValues = (fieldValues, field) => {
        return Array.from(new Set(fieldValues?.map(data => data[field])));
    };

    const CategoryFilterCell = (props) => {
        const {field} = props;
        const fieldValues = createState(state?.skip, state?.take).items;

        return (
            <DropdownFilterCell {...props} data={getUniqueFieldValues(fieldValues, field)} defaultItem={'ALL'}/>
        )
    };

    const columnProps = (column: IColumn, index: number) => {
        return {
            key: column.field + '_' + index,
            field: column.field,
            title: column.title,
            width: column.width,
            align: column.align,
            orderIndex: index,
            filterable: column.filterable,
            filter: column.filterType === 'select' ? 'text' : column.filterType,
            filterCell: column.filterType === 'select' ? CategoryFilterCell : null,
            // headerCell: CustomHeaderCell
        };
    }

    const ColumnCell = (props: GridCellProps) => {
        const {field} = props;
        const column = columns.find((col: IColumn) => col.field === field);

        const dataValue = props.dataItem[field];
        const displayValue = typeof dataValue === 'boolean' ? (dataValue ? 'TRUE' : 'FALSE') : dataValue;

        return (
            <td style={{textAlign: column?.align || "left"}}>
                {displayValue}
            </td>
        );
    };

    const clearFilters = () => {
        setFilter(undefined);
        setState(createState(state?.skip, state?.take));
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

    useEffect(() => {
        setState(createState(0, displayCount[0]));

    }, []);

    useEffect(() => {
        setState(createState(0, displayCount[0]));
    }, [gridData]);


    return (
        <div>
            <Grid
                style={{height: 350, width: 'fit-content'}}
                data={filterBy(state?.items, filter)}
                onPageChange={pageChange}
                total={state?.total}
                skip={state?.skip}
                pageable={state?.pageable}
                pageSize={state?.pageSize}
                sortable={!sortableGrid ? false : {
                    allowUnsort: unsorted,
                    mode: multipleSorting ? "multiple" : "single"
                }}
                sort={sort}
                onSortChange={sortChange}
                onFilterChange={(event: GridFilterChangeEvent) => {
                    setFilter(event.filter);
                }}
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
                        <select onChange={
                            (event) => {
                                setState(createState(0, parseInt(event.target.value, 10)));
                            }
                        }>
                            {selectOption.map((value) =>
                                <option value={value}>{value === 0 ? 'ALL' : value}</option>
                            )}
                        </select>
                    </GirdInfoArea>
                    <CustomArea>
                        <Button>test Column </Button>
                    </CustomArea>
                    <DefaultButton>
                        <Button onClick={clearFilters} style={{marginRight: 10}}>Reset Filter </Button>
                        <Button onClick={resetColumns} style={{marginRight: 10}}>Reset table layout </Button>
                        <Button>set Column </Button>
                    </DefaultButton>
                </GridToolbar>
                {columns.map((header, index) => (
                    <Column
                        {...columnProps(header, index)}
                        cell={ColumnCell}
                    />
                ))}
            </Grid>
        </div>
    );
}

export default CommonGrid;