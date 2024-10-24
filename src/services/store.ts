import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/IngredientsSlice';
import burgerConstructorSlice from './slices/BurgerConstructorSlice';
import userStateSlice from './slices/UserInfoSlice';
import feedDataSlice from './slices/FeedDataSlice';
import userOrdersHistorySlice from './slices/UserOrdersHistory';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [feedDataSlice.name]: feedDataSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [userStateSlice.name]: userStateSlice.reducer,
  [userOrdersHistorySlice.name]: userOrdersHistorySlice.reducer
}); // Заменить на импорт настоящего редьюсера inPROGRESS

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
