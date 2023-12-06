import styled from 'styled-components';

// Header 스타일 컴포넌트 정의
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  color: white;
`;

export const Logo = styled.img`
  height: 50px; // 로고의 높이
`;

export const Title = styled.h1`
  margin-left: 1rem;
  font-size: 1.5rem;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

export const Dropdown = styled.select`
  margin: 0 1rem;
  padding: 0.5rem;
`;

export const DropdownOption = styled.option``;

export const AccountMenu = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
