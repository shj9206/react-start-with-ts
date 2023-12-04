import styled from 'styled-components';

export const GirdInfoArea = styled.div`
    span {
        margin-right: 10px;
    }
`;

export const CustomArea = styled.div`
  margin: 0 15px;
`;

export const DefaultButton = styled.div`
  margin-left: auto;
`;

export function GridToolbarArea({ children }) {
    return (
        <GridToolbarArea>
            {children}
        </GridToolbarArea>
    )
}