import styled from 'styled-components';


export const LoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    /* 배경색을 제거하거나 페이지 배경색에 맞춥니다. */
    background: #FFFFFF; /* 예를 들어 페이지의 배경색이 흰색일 경우 */
    font-family: 'Arial', sans-serif;
`;

export const ImageContainer = styled.div`
  float: right; // 이미지를 오른쪽에 배치
  width: 50%; // 이미지의 너비, 필요에 따라 조정하세요
  img {
    width: 100%; // 이미지가 컨테이너의 너비에 맞게 조정되도록 설정
    height: auto; // 이미지의 높이가 자동으로 조정되도록 설정
  }
`;

export const LoginForm = styled.form`
  width: 50%;
  max-width: 500px;
  /* 배경색을 제거하거나 부모 요소의 배경색에 맞춥니다. */
  background: transparent; /* 배경색을 투명하게 설정 */
  padding: 2rem;
  /* 박스 쉐도우를 제거하거나 조정합니다. */
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */ /* 박스 쉐도우 제거 */
  border-radius: 8px;
`;


export const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;


export const Label = styled.label`
  margin-bottom: 0.5rem;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    border-color: #3079ed;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  color: #3079ed;
  font-size: 0.9rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  background-color: #3079ed;
  color: white;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #205cbd;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; // 버튼과 링크 사이의 공간을 균등하게 분배
  align-items: center;
  width: 100%; // 컨테이너의 너비를 부모 요소에 맞춤
  margin-top: 1rem; // 위의 요소와의 간격을 추가
`;

export const HelpLink = styled(Link)`
  margin-left: auto; // 링크를 오른쪽 끝으로 밀어냄
`;
