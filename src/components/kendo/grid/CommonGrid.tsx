import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Grid, GridCellProps, GridColumn as Column, GridFilterChangeEvent, GridPageChangeEvent, GridPagerSettings, GridSortChangeEvent, GridToolbar,} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";

import {Button} from "@progress/kendo-react-buttons";
import {filterBy, orderBy, SortDescriptor} from "@progress/kendo-data-query";
import "@/components/kendo/grid/css/styles.css";
import {CustomDropDownFilter} from "@/components/kendo/grid/CustomDropDownFilter.tsx";
import {AppState, CommonGridProps, IColumn} from "./gridInterfaces.ts";
import {CustomArea, DefaultButton, GirdInfoArea} from "./GridToolbarArea.tsx";
import {useSelector} from "react-redux";

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
                                                   gridWidth = 0,
                                                   gridHeight = 0,
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

    function CategoryFilterCell(props) {
        const fieldValues = state.items;
        const uniqueValues = Array.from(
            new Set(fieldValues?.map((item) => item[props.field]))
        );
        return (
            <CustomDropDownFilter {...props} data={uniqueValues} defaultItem="ALL"/>
        );
    }

    function ColumnCell(props: GridCellProps) {
        const column = columns.find((col: IColumn) => col.field === props.field);
        const dataValue = props.dataItem[props.field];
        const displayValue =
            typeof dataValue === "boolean"
                ? dataValue
                    ? "TRUE"
                    : "FALSE"
                : dataValue;

        return (
            <td style={{textAlign: column?.align || "left"}}>{displayValue}</td>
        );
    }

    const clearFilters = () => {
        setFilter(undefined);
        setSort([]);
    };

    const resetColumns = () => {
        setColumns(columnHeader);
    };

    const onColumnReorderWithResize = (e) => {
        const reorderedColumns = e.columns.sort(
            (a, b) => a.orderIndex - b.orderIndex
        );
        setColumns(reorderedColumns);
    };

    const expanded = useSelector((state) => state.content.expanded);
    const [width, setWidth] = useState(gridWidth);
    const [height, setHeight] = useState(gridHeight);

    useEffect(() => {
        let currentWidth = 0;

        if (gridWidth !== 0) {
            currentWidth = expanded ? gridWidth - 275 : gridWidth - 50
        }else {
            currentWidth = expanded ? window.innerWidth - 290 : window.innerWidth - 50
        }

        setWidth(currentWidth);
        setHeight(gridHeight ? gridHeight : 500);
    }, [expanded, gridWidth, gridHeight]);

    const gridStyles = {
        transition: 'all 200ms ease 0s',
    };

    return (
        <Grid
            style={{width: width, height: height, ...gridStyles}}
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
            onFilterChange={(event: GridFilterChangeEvent) =>
                setFilter(event.filter)
            }
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
                    <select
                        onChange={(event) =>
                            setState(createState(0, parseInt(event.target.value, 10)))
                        }
                    >
                        {displayCount.map((value) => (
                            <option value={value}>{value === 0 ? "ALL" : value}</option>
                        ))}
                    </select>
                </GirdInfoArea>
                <CustomArea>
                    <Button>test Column </Button>
                </CustomArea>
                <DefaultButton>
                    <Button onClick={clearFilters} style={{marginRight: 10}}>
                        Reset Filter{" "}
                    </Button>
                    <Button onClick={resetColumns} style={{marginRight: 10}}>
                        Reset table layout{" "}
                    </Button>
                    <Button>set Column </Button>
                </DefaultButton>
            </GridToolbar>
            {columns.map((header, index) => (
                <Column
                    {...header}
                    cell={ColumnCell}
                    filterCell={
                        header.filterType === "select" ? CategoryFilterCell : undefined
                    }
                    key={`${header.field}_${index}`}
                />
            ))}
        </Grid>
    );
};

export default CommonGrid;
