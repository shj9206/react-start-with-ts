import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ContentState} from "@/store/interface/storeInterfaces.ts";

const initialState: ContentState = {
    expanded: true,
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContent: (state, action: PayloadAction<boolean>) => {
            state.expanded = action.payload;
        },
    }
});

export const {setContent} = contentSlice.actions;

export default contentSlice.reducer;