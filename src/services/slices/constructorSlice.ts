import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

export interface burgerConstructorState {
  burgerConstructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
}

const initialState: burgerConstructorState = {
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    burgerConstructorSelector: (state) => state.burgerConstructor
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burgerConstructor.bun = action.payload;
        } else {
          state.burgerConstructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const array = state.burgerConstructor.ingredients;
      const index = action.payload;
      array.splice(index - 1, 0, array.splice(index, 1)[0]);
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      const array = state.burgerConstructor.ingredients;
      const index = action.payload;
      array.splice(index + 1, 0, array.splice(index, 1)[0]);
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.burgerConstructor.ingredients =
        state.burgerConstructor.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    clearBurgerConstructor: (state) => {
      state.burgerConstructor.bun = null;
      state.burgerConstructor.ingredients = [];
    }
  }
});

export const { burgerConstructorSelector } = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  upIngredient,
  downIngredient,
  removeIngredient,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
