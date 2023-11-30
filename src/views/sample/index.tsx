import {useState} from "react";
import CommonGrid from "@/views/sample/kendoGrid/commonGrid";
import products from "./kendoGrid/data/products.json";

export default function Index() {
    const [column, setColumnHeader] = useState(
        [
            {field: 'ProductID', title: 'ProductID', width: 150, align: 'center'},
            {field: 'ProductName', title: 'ProductName', width: 300},
            {field: 'UnitPrice', title: 'UnitPrice', width: 150},
        ]
    )
    const commonGridProps = {
        columnHeader: column,
        buttonCount: 5,
        gridData: products,
        sortableGrid: true,
        unsorted: true,
        multipleSorting: false,
        filterable: true,
        resizable: true,
        displayCount: [10, 20, 30, 0]
    };

    return (
        <div id="zero-state">
            This is a demo for React Router.
            <br/>
            Check out{" "}
            <a href="https://reactrouter.com">the docs at reactrouter.com</a>.
            {/* eslint-disable-next-line max-len */}
            <CommonGrid {...commonGridProps}/>
            <br/>
        </div>
    );
}
