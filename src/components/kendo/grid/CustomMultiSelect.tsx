import {useEffect, useState} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import {MultiSelect} from '@progress/kendo-react-dropdowns';

const hasValue = (value) => value && value.length > 0;

export function CustomMultiSelect(props) {
    const data = [...props.data];
    data.unshift('Not Selected');

    const multiSelectFilterOperator = (value, current) => {
        const newValue =
            !value ||
            !value.length ||
            value.find((val) =>
                val === 'Not Selected' && current === null
                    ? 'isnull'
                    : value.find((val) => val === current)
            );
        return newValue;
    };
    const [stateValue, setStateValue] = useState(
        props.value ? [props.value] : null
    );
    useEffect(() => {
        console.log(stateValue);
    }, [stateValue]);
    const handleChange = (event) => {
        const {value} = event.target;
        setStateValue([...value]);
        console.log(value)
        // props.onChange({
        //     value: event.value,
        //     operator: multiSelectFilterOperator.bind(undefined, value),
        //     syntheticEvent: event.syntheticEvent,
        // });
    };

    const handleClearClick = (event) => {
        event.preventDefault();
        const {value} = event.target;

        setStateValue([]);
        props.onChange({
            value: [],
            operator: 'eq',
            syntheticEvent: event,
        });
    };
    return (
        <div className="k-filtercell">
            <MultiSelect
                data={data}
                onChange={handleChange}
                value={stateValue || null}
                autoClose={false}
            />
            {/* <button */}
            {/*    className="k-button k-button-icon k-clear-button-visible" */}
            {/*    title="Clear" */}
            {/*    disabled={!hasValue(stateValue)} */}
            {/*    onClick={handleClearClick} */}
            {/* > */}
            {/*    <span className="k-icon k-i-filter-clear" /> */}
            {/* </button> */}
        </div>
    );
}



