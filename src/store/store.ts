import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {
    AnyAction,
    combineReducers,
    configureStore,
    Middleware,
    Reducer,
} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import tokenReducer from './features/token/tokenSlice.ts';
import themeReducer from './features/theme/themeSlice.ts';
import tabBarVisibleReducer from './features/booleans/tabBarVisible.ts'
import toastVisibleReducer from './features/booleans/toastVisible.ts'
import selectedRefuelingReducer from './features/selectedRefueling/selectedRefueling.ts'
import technicsReducer from './features/technics/technicsSlice.ts'
import emailOrPhoneReducer from './features/registration/emailReducer.ts'
import userReducer from './features/user/userSlice.ts'
const reducers = {
    token: tokenReducer,
    theme: themeReducer,
    tabBarVisible: tabBarVisibleReducer,
    toastVisible: toastVisibleReducer,
    selectedRefueling: selectedRefuelingReducer,
    technics: technicsReducer,
    emailOrPhone: emailOrPhoneReducer,
    user: userReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const rootReducer: Reducer<ReturnType<typeof combinedReducer>, AnyAction> = (
    state,
    action,
) => {
    if (action.type === 'clearStore/clearStore' && state) {
        // state.auth = defaultAuthState;
        // state.profile = defaultProfileState
    }
    return combinedReducer(state, action);
};


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({immutableCheck: false}),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
