import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    email: string | null;
}

const initialState: AuthState = {
    accessToken: null,
    email: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setUserInfomation: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    }
});

export const {setToken, setUserInfomation} = authSlice.actions;

export default authSlice.reducer;