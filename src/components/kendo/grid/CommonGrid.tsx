import {useCallback, useEffect, useState} from "react";
import {
    getSelectedState,
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridFilterChangeEvent,
    GridPageChangeEvent,
    GridPagerSettings,
    GridSortChangeEvent,
    GridToolbar,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";

import {Button} from "@progress/kendo-react-buttons";
import {filterBy, getter, orderBy, SortDescriptor} from "@progress/kendo-data-query";
import "@/components/kendo/grid/css/styles.css";
import {CustomDropDownFilter} from "@/components/kendo/grid/CustomDropDownFilter.tsx";
import {AppState, CommonGridProps, IColumn} from "./gridInterfaces.ts";
import {CustomArea, DefaultButton, GirdInfoArea} from "./GridToolbarArea.tsx";
import {useSelector} from "react-redux";
import {CustomCheckBoxFilter} from "@/components/kendo/grid/CustomCheckBoxFilter.tsx";

const CommonGrid: React.FC<CommonGridProps> = ({
                                                   columnHeader,
                                                   buttonCount,
                                                   sortableGrid,
                                                   unsorted,
                                                   multipleSorting,
                                                   defualtFilter,
                                                   resizable,
                                                   gridData,
                                                   displayCount,
                                                   gridWidth = 0,
                                                   gridHeight = 0,
                                                   check
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

    function nonFilter() {
        return (
            <div></div>
        );
    }

    function CategoryFilterCell(props) {
        const fieldValues = state.items;
        const uniqueValues = Array.from(
            new Set(fieldValues?.map((item) => item[props.field]))
        );
        return (
            <CustomDropDownFilter {...props} data={uniqueValues} defaultItem="ALL"/>
        );
    }

    function CheckBoxFilterCell(props) {
        const fieldValues = state?.items;
        return (
            <CustomCheckBoxFilter {...props} data={fieldValues}/>
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
            <td style={{textAlign: column?.align || "left"}}
                onClick={(e) => {
                    console.log(e.target.innerHTML)
                }}
           defaultValue={displayValue} >{displayValue}</td>
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
        reorderedColumns.shift()
        setColumns(reorderedColumns);
    };

    const expanded = useSelector((state) => state.content.expanded);
    const [width, setWidth] = useState(gridWidth);
    const [height, setHeight] = useState(gridHeight);

    useEffect(() => {
        let currentWidth = 0;

        if (gridWidth !== 0) {
            currentWidth = expanded ? gridWidth - 275 : gridWidth - 50
        } else {
            currentWidth = expanded ? window.innerWidth - 290 : window.innerWidth - 50
        }

        setWidth(currentWidth);
        setHeight(gridHeight ? gridHeight : 500);
    }, [expanded, gridWidth, gridHeight]);

    const gridStyles = {
        transition: 'all 200ms ease 0s',
    };

    const [selectedState, setSelectedState] = useState({});
    const SELECTED_FIELD = 'selected';
    const DATA_ITEM_KEY = 'name';
    const idGetter = getter(DATA_ITEM_KEY);

    const onSelectionChange = useCallback(event => {
        const newSelectedState = getSelectedState({
            event,
            selectedState: selectedState,
            dataItemKey: DATA_ITEM_KEY
        });
        setSelectedState(newSelectedState);
    }, [selectedState]);

    const onHeaderSelectionChange = useCallback(event => {
        const checkboxElement = event.syntheticEvent.target;
        const checked = checkboxElement.checked;
        const newSelectedState = {};
        event.dataItems.forEach(item => {
            newSelectedState[idGetter(item)] = checked;
        });
        setSelectedState(newSelectedState);
    }, []);

    return (
        <Grid
            style={{width: width, height: height, ...gridStyles}}
            data={filterBy(state.items?.map((item) => ({
                ...item,
                [SELECTED_FIELD]: selectedState[idGetter(item)],
            })), filter)}
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
            onColumnReorder={onColumnReorderWithResize}
            filterable={defualtFilter}
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
                mode: 'multiple'
            }}
            reorderable
            onRowClick={(e)=>{console.log(e)}}
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
            {
                check &&
                <Column locked={true} reorderable={false} resizable={false} field={SELECTED_FIELD} width="50px"
                        headerSelectionValue={state.items?.findIndex(item => !selectedState[idGetter(item)]) === -1} filterCell={nonFilter}/>
            }
            {columns.map((header, index) => (
                <Column
                    {...header}
                    cell={ColumnCell}
                    filterCell={header.filterType === "select" ? CategoryFilterCell :
                        header.defualtFilter ? undefined : nonFilter}
                    columnMenu={header.filterType === "checkBox" ? CheckBoxFilterCell : undefined}
                    key={`${header.field}_${index}`}
                />
            ))}
        </Grid>
    );
};

export default CommonGrid;
