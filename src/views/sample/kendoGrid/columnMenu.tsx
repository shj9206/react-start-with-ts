import {
    GridColumnMenuFilter,
    GridColumnMenuSort,
    // GridColumnMenuCheckboxFilter,
    GridColumnMenuProps
} from '@progress/kendo-react-grid';

export function ColumnMenu(props: GridColumnMenuProps) {
    return (
        <div>
            <GridColumnMenuSort {...props} />
            <GridColumnMenuFilter {...props} expanded/>
        </div>
    );
}

// export const ColumnMenuCheckboxFilter = (props: GridColumnMenuProps) => {
//     return (
//         <div>
//             <GridColumnMenuCheckboxFilter {...props} data={products} expanded={true}/>
//         </div>
//     );
// }
