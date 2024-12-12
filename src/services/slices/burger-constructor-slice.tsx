import { orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
};

export const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

export const sendOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'burger/sendOrder',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getBurgerConstructorState: (state) => state,
    selectBun: (state) => state.constructorItems.bun,
    selectIngredients: (state) => state.constructorItems.ingredients,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems.ingredients.push(ingredient);
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveCartItem: (
      state,
      action: PayloadAction<{ itemId: string; direction: 'up' | 'down' }>
    ) => {
      const { itemId, direction } = action.payload;
      const ingredients = state.constructorItems.ingredients;
      const currentIndex = ingredients.findIndex((item) => item.id === itemId);

      if (currentIndex === -1) return;

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= ingredients.length) return;

      const newArray = [...ingredients];
      [newArray[currentIndex], newArray[newIndex]] = [
        newArray[newIndex],
        newArray[currentIndex]
      ];
      state.constructorItems.ingredients = newArray;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.constructorItems.ingredients = []; // чистим корзину
        state.isLoading = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { moveCartItem, removeCartItem, addIngredient } =
  burgerConstructorSlice.actions;
export const {
  getBurgerConstructorState,
  selectBun,
  selectIsLoading,
  selectError
} = burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
