import {useRef, useState} from "react";
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {CompositeFilterDescriptor, filterBy, FilterDescriptor} from "@progress/kendo-data-query";


export function CustomDropDownFilter(props: { data: any[]; onChange: (arg0: { value: string; operator: string; syntheticEvent: any; }) => void; value: any; defaultItem: any; }) {
    const [state, setState] = useState({
        data: props.data.slice(),
        loading: false,
    });
    const delay = 300;


    const onChange = (event: { target: { value: string; }; syntheticEvent: any; }) => {
        const isAllSelected = event.target.value === 'ALL';
        props.onChange({
            value: isAllSelected ? '' : event.target.value,
            operator: isAllSelected ? '' : 'contains',
            syntheticEvent: event.syntheticEvent
        });
    };

    const filterData = (filter: CompositeFilterDescriptor | FilterDescriptor) => {
        if (Array.isArray(props.data)) {
            const data = props.data?.slice();
            return filterBy(data, filter);
        } else {
            console.error("props.data must be an array");
            return [];
        }
    };

    const timeout = useRef<number | undefined>();

    const filterChange = (event: { filter: CompositeFilterDescriptor | FilterDescriptor; }) => {
        if (timeout.current !== undefined) {
            window.clearTimeout(timeout.current);
        }

        setState(prevState => ({
            ...prevState,
            loading: true,
        }));

        timeout.current = window.setTimeout(() => {
            setState({
                data: filterData(event.filter),
                loading: false,
            });
        }, delay);
    };


    return (
        <DropDownList
            filterable
            data={state.data}
            onChange={onChange}
            value={props.value || props.defaultItem}
            defaultItem={props.defaultItem}
            onFilterChange={filterChange}
        />
    );
}

