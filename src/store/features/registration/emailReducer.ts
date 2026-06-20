import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export const emailState = {
    emailOrPhone: '',
};

const emailSlice = createSlice({
    name: 'emailOrPhone',
    initialState: emailState,
    reducers: {
        setEmailToReducer: (state, action) => {
            state.emailOrPhone = action.payload;
        },
    },
});

export const {setEmailToReducer} = emailSlice.actions;
export default emailSlice.reducer;
