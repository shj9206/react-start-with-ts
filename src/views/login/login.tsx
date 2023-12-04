// @views/login/Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/authSlice';
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/login', { email, password });

            dispatch(setToken(data.token));  // 토큰을 Redux에 저장합니다.

            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}