import {useRef, useState} from "react";
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {filterBy} from "@progress/kendo-data-query";


export function CustomDropDownFilter(props) {
    // 현재 필터링 상태를 관리하는 로컬 상태
    const [filterValue, setFilterValue] = useState('');
    const timeout = useRef(false);
    const [state, setState] = useState({
        data: props.data.slice(),
        loading: false,
    });
    const delay = 300;


    // 드롭다운 리스트 값 변경 핸들러
    const onChange = event => {
        const isAllSelected = event.target.value === 'ALL';
        props.onChange({
            value: isAllSelected ? '' : event.target.value, // 'ALL'이면 빈 문자열을, 그렇지 않으면 선택된 값을 사용
            operator: isAllSelected ? '' : 'contains', // 'ALL'이면 연산자를 빈 문자열로, 그렇지 않으면 'eq'를 사용
            syntheticEvent: event.syntheticEvent
        });

        // 필터 입력을 관리하는 상태 업데이트
        if (isAllSelected) {
            setFilterValue(''); // 필터 입력 상태를 비움
        }
    };

    const filterData = (filter) => {
        const data = props.data.slice();
        return filterBy(data, filter);
    };

    const filterChange = (event) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            setState({
                loading: true,
                data: filterData(event.filter),
            });
        }, delay);
        setState({
            ...state,
            loading: true,
        });
    };


    return (
        <DropDownList
            filterable
            data={state.data} // 필터링된 데이터를 전달
            onChange={onChange}
            value={props.value || props.defaultItem}
            defaultItem={props.defaultItem}
            onFilterChange={filterChange}
        />
    );
}

