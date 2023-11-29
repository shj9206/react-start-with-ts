import {useState} from "react";
import CommonGrid from "@/views/sample/kendoGrid/commonGrid";
import products from "./kendoGrid/data/products.json";

export default function Index() {
    const [column, setColumnHeader] = useState(
        [
            {column: 'ProductID', field: 'ProductID'},
            {column: 'ProductName', field: 'ProductName'},
            {column: 'UnitPrice', field: 'UnitPrice'},
        ]
    )

    return (
        <div id="zero-state">
            This is a demo for React Router.
            <br/>
            Check out{" "}
            <a href="https://reactrouter.com">the docs at reactrouter.com</a>.
            {/* eslint-disable-next-line max-len */}
            <CommonGrid columnHeader={column} buttonCount={5} gridData={products} sortableGrid unsorted multipleSorting={false} filterable resizable/>
        </div>
    );
}
