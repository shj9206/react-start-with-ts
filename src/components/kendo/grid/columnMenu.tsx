import {GridColumnMenuFilter, GridColumnMenuProps, GridColumnMenuSort} from '@progress/kendo-react-grid';

export function ColumnMenu(props: GridColumnMenuProps) {
    return (
        <div>
            <GridColumnMenuSort {...props} />
            <GridColumnMenuFilter {...props} expanded/>
        </div>
    );
}

