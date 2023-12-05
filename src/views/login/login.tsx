import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setToken, setUserInfomation} from '@/store/authSlice';
import {useQuery} from "@tanstack/react-query";
import {SigninResponse, SigninRequest } from "@/utils/apiService/authService.ts.ts";
import { useModal } from '@/components/modal/useModal.tsx';
import Modal from '@/components/modal/Modal.tsx';

import {
    Button,
    ButtonContainer,
    ImageContainer,
    Input,
    Label,
    Link,
    LoginContainer,
    LoginForm,
    Title
} from './style.ts'; // 경로는 실제 파일 위치에 맞게 조정하세요.
import mainImg from '@/assets/login.png';
import {signin} from "@/utils/apiService/authService.ts";

export const Login: React.FC = () => {
    const { modalProps, showModal, hideModal } = useModal();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 로그인 로직을 여기에 추가
        console.log('Email:', email, 'Password:', password);
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginQuery = () => ({

        queryKey: ["login"],
        queryFn: async () => {
            const result = await signin({email, pushToken: "", pwd: password});
            return result as SigninResponse;
        },
    });

    const {data: userDetail} = useQuery<SigninResponse, Error>(loginQuery());

    const userInfomation = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // signin 함수를 직접 호출
            const response: SigninResponse = await signin({email, pushToken: "", pwd: password});

            // 응답에서 토큰을 추출하여 Redux에 저장
            if (response && response.data) {
                let accessToken = response.data.accessToken;
                document.cookie = `accessToken=${accessToken};path=/`;
                dispatch(setUserInfomation(email));
                console.log(userInfomation.email)
                showModal('error', 'Login Failed', 'Invalid username or password', hideModal, hideModal);

            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <LoginContainer>
            <LoginForm onSubmit={handleLogin}>
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
            {modalProps.isVisible && <Modal {...modalProps} />}
        </LoginContainer>
    );
};

export default Login;
