import '@progress/kendo-theme-default/dist/all.css';
import {Input} from '@progress/kendo-react-inputs';
import styled from 'styled-components';
import {useEffect, useState} from "react";
import MyIcon from '@/assets/reading-glasses.svg';


const SearchContainer = styled.div`
    position: relative;
    .k-input {
        border-radius: 20px;
        padding-right: 24px;
        padding-left: 8px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        width: 100%; // 인풋 너비를 컨테이너에 맞추기
    }

    .k-icon {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        color: #ccc;
        cursor: pointer; // 아이콘에 마우스 오버 시 커서 변경
    }
`;
const FilterInput = styled(Input)``; // 필요한 추가 스타일링이 있으면 여기에 추가

// CustomFilterCell 컴포넌트
export function CustomFilterCell({ filterReset, ...props }) {
    const [inputValue, setInputValue] = useState(props.value || '');
    // 입력값을 로컬 상태에 저장하는 핸들러
    useEffect(() => {
        // 상위 컴포넌트에서 필터를 초기화하라는 명령을 받았을 때 입력값도 초기화합니다.
        setInputValue(props.value || '');
    }, [props.value]);

    const onInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // 조회 버튼 클릭 시 필터링을 수행하는 핸들러
    const onSearchClick = () => {
        props.onChange({
            value: inputValue,
            operator: 'contains',
            field: props.field,
            syntheticEvent: event
        });
    };

    return (
        <SearchContainer>
            <FilterInput value={inputValue} onChange={onInputChange}/>
            <img className="k-icon k-i-search" src={MyIcon} alt="search Filter Button" style={{width:15, height:15}} onClick={onSearchClick}/>
        </SearchContainer>
    );
}



