import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export const toastVisibleState = {
    toastVisible: {isVisible: false, type: ''},
};

const toastVisibleSlice = createSlice({
    name: 'toastVisible',
    initialState: toastVisibleState,
    reducers: {
        setToastVisible: (state, action) => {
            state.toastVisible = action.payload;
        },
    },
});

export const {setToastVisible} = toastVisibleSlice.actions;
export default toastVisibleSlice.reducer;
