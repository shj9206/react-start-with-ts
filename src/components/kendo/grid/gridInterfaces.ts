import {GridPagerSettings} from "@progress/kendo-react-grid";

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
    defualtFilter: boolean | false;
    resizable: boolean | false;
    gridData: object[] | null;
    displayCount: number[];
    gridWidth: number;
    gridHeight: number;
    check: boolean | false;
}

interface IColumn {
    field: string;
    title: string;
    width: number;
    align: "left" | "center" | "right";
    defualtFilter: boolean

    [key: string]: any;
}

export type { AppState, GridHeader, CommonGridProps, IColumn };