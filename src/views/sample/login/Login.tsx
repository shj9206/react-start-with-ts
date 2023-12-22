import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setRegion, setToken, setUserInfomation } from "@/store/authSlice.ts";
import { getUserDetail } from "@/utils/apiService/accountService.ts";
import mainImg from "@/assets/login.png";
import StyledInput from "@/components/kendo/common/StyledInput.tsx";
import StyledLabel from "@/components/kendo/common/StyledLabel.tsx";
import StyledButton from "@/components/kendo/common/StyledButton.tsx";
import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import { signin } from "@/utils/apiService/authService.ts";

const Wrapper = styled(FlexBox)`
  align-items: center; // Center children vertically
  justify-content: center; // Center children horizontally
  height: 100vh; // Full viewport height
`;

const LoginSection = styled(FlexBox)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 30%;
  padding: 2rem;
  margin-right: 2rem;
`;

const ImageContainer = styled.div`
  width: 70%;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const Label = styled(StyledLabel)`
  margin-bottom: 0.5rem;
  font-size: 14px;
  margin-right: auto;
`;

const Input = styled(StyledInput)`
  width: 100%; // This sets the input width to fill the container
  min-width: 28vh; // Set a max-width to control the size
  padding: 12px 20px; // Increase padding to make the input taller
  font-size: 16px; // Increase the font size if needed

  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    border-color: #3079ed;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: #3079ed;
  font-size: 0.9rem;
`;

const Button = styled(StyledButton)`
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

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.accessToken);
  const getEmail = useSelector((state) => state.auth.email);
  const getRegion = useSelector((state) => state.auth.region);

  const userDetail = useMutation({
    mutationFn: () => getUserDetail(email),
    onSuccess: (response) => {
      dispatch(setRegion(response.data.region));
    },
  });

  const loginMutation = useMutation({
    mutationFn: () => signin(email),
    onSuccess: (response) => {
      dispatch(setToken(response.data.accessToken));
      dispatch(setUserInfomation(email));
      userDetail.mutate(email);
    },
  });

  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(email);
  };

  useEffect(() => {
    token && getRegion && navigate(`/main/DashBoard/dashboard`);
  }, [getRegion]);

  return (
    <Wrapper>
      <LoginSection>
        <Title>Enblock Manager</Title>
        <FlexBox direction="column">
          <Label>Email ID</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.value)}
            required
          />
        </FlexBox>
        <FlexBox direction="column">
          <Label>Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.value)}
            required
          />
        </FlexBox>
        <FlexBox direction="column">
          <Link href="/forgot-password">Forgot your password?</Link>
          <Button onClick={handleLoginClick}>Sign In</Button>
        </FlexBox>
        <FlexBox direction="row" justify="space-between">
          <Link href="/signup">Sign Up</Link>
          <Link href="/help">Need Help?(GECP)</Link>
        </FlexBox>
      </LoginSection>
      <ImageContainer>
        <img src={mainImg} alt="LG Energy Solution" />
      </ImageContainer>
    </Wrapper>
  );
}

export default Login;
