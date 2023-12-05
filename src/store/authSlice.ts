import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    email: string | null;
}

const initialState: AuthState = {
    token: null,
    email: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUserInfomation: (state, action: PayloadAction<string>) => {
            console.log(action)
            state.email = action.payload;
        },
    }
});

export const {setToken, setUserInfomation} = authSlice.actions;

export default authSlice.reducer;