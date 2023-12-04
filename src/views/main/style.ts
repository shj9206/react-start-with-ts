import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #fff;
    /* 기타 스타일링 */
`;

export const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    /* 기타 스타일링 */
`;

export const MainContent = styled.main`
    flex-grow: 1;
    padding: 1rem;
    /* 기타 스타일링 */
`;

export const Footer = styled.footer`
    padding: 1rem;
    background-color: #fff;
    /* 기타 스타일링 */
`;

export const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    /* 기타 스타일링 */
`;