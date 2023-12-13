import {useEffect, useState} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import {GridColumnMenuCheckboxFilter} from "@progress/kendo-react-grid";

export function CustomCheckBoxFilter(props) {
    return (
        <div>
            <GridColumnMenuCheckboxFilter {...props} data={props.data} expanded={true} />
        </div>
    );
}



