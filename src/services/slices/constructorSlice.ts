import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { clear } from 'console';

interface IConstructorItems {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

interface IConstructorData {
  constructorItems: IConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: IConstructorData = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null
};

const ConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setConstructorIngredients(
      state,
      action: PayloadAction<TConstructorIngredient>
    ) {
      state.constructorItems.ingredients.push(action.payload);
    },
    setConstructorBun(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    deleteConstructorIngredient(
      state,
      action: PayloadAction<TConstructorIngredient>
    ) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    clearConstructor(state) {
      state.constructorItems = initialState.constructorItems;
      state.orderRequest = initialState.orderRequest;
      state.orderModalData = initialState.orderModalData;
    },
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<TOrder>) {
      state.orderModalData = action.payload;
    },
    updateConstructorIngredients(
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) {
      state.constructorItems.ingredients = action.payload;
    }
  }
});

export const {
  setConstructorBun,
  setConstructorIngredients,
  deleteConstructorIngredient,
  clearConstructor,
  setOrderRequest,
  setOrderModalData,
  updateConstructorIngredients
} = ConstructorSlice.actions;

export const ConstructorReducer = ConstructorSlice.reducer;
