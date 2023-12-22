import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SidebarContainer = styled.aside`
  width: 250px; // 사이드바의 너비 설정
  background-color: #f5f5f5;
  height: 100%;
  padding: 1rem;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 10px 15px;

  &:hover {
    background-color: #e4e4e4;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

export const Sidebar: React.FC = (props) => {
  return (
    <SidebarContainer>
      <MenuList>
        <MenuItem>
          <StyledLink to={"/views/sample/kendoGrid"}> 테스트 링크</StyledLink>
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;
