import React from "react";
// styled-components 임포트
import {
  AccountMenu,
  Dropdown,
  DropdownOption,
  HeaderContainer,
  Nav,
  Title,
} from "./headerStyle.ts";

interface HeaderProps {
  // 필요한 프롭스 타입 정의 (예시)
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <HeaderContainer>
      <Title>Enblock Manager</Title>
      <Nav>
        <Dropdown>
          <DropdownOption value="hq">HQ</DropdownOption>
          {/* 다른 지역 선택지 추가 */}
        </Dropdown>
        <Dropdown>
          <DropdownOption value="en">ENGLISH</DropdownOption>
          {/* 다른 언어 선택지 추가 */}
        </Dropdown>
        <AccountMenu>My Account</AccountMenu>
        {/* 계정 관리 드롭다운 메뉴 구현 */}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
