import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/store/authSlice.ts";
import { useQuery } from "@tanstack/react-query";
import {
  AccountResult,
  getUserDetail,
} from "@/utils/apiService/accountService.ts";
import {
  Button,
  ButtonContainer,
  ImageContainer,
  Input,
  Label,
  Link,
  LoginContainer,
  LoginForm,
  Title,
} from "./style.ts"; // 경로는 실제 파일 위치에 맞게 조정하세요.
import mainImg from "@/assets/login.png";

export const Login: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 로그인 로직을 여기에 추가
    console.log("Email:", email, "Password:", password);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginQuery = () => ({
    queryKey: ["login"],
    queryFn: async () => {
      const result = await getUserDetail(email);
      return result as AccountResult;
    },
  });

  const { data: userDetail } = useQuery<AccountResult, Error>(loginQuery());

  const token = useSelector((state) => state.auth.token);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // console.log(userDetail.data);

      dispatch(setToken(userDetail.data.region)); // 토큰을 Redux에 저장합니다.

      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Enblock Manager</Title>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link href="/forgot-password">Forgot your password?</Link>
        <Button type="submit">Sign In</Button>
        <ButtonContainer>
          <Link href="/signup">Sign Up</Link>
          <Link href="/help">Need Help?(GECP)</Link>
        </ButtonContainer>
      </LoginForm>
      <ImageContainer>
        <img src={mainImg} alt="LG Energy Solution" />
      </ImageContainer>
    </LoginContainer>
  );
};

export default Login;
