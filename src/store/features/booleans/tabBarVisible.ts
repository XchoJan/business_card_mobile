import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export const tabBarVisibleState = {
    tabBarVisible: true,
};

const tabBarVisibleSlice = createSlice({
    name: 'tabBarVisible',
    initialState: tabBarVisibleState,
    reducers: {
        setTabBarVisible: (state, action) => {
            state.tabBarVisible = action.payload;
        },
    },
});

export const {setTabBarVisible} = tabBarVisibleSlice.actions;
export default tabBarVisibleSlice.reducer;
