import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ContentState {
    expanded: number | null;
}

const initialState: ContentState = {
    expanded: null,
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContent: (state, action: PayloadAction<string>) => {
            state.expanded = action.payload;
        },
    }
});

export const {setContent} = contentSlice.actions;

export default contentSlice.reducer;