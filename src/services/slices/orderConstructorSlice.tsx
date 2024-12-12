import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrderConstructor } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TOrderConstructorState = {
  bun: TOrderConstructor | null;
  ingredients: TOrderConstructor[];
};

const initialState: TOrderConstructorState = {
  bun: null,
  ingredients: []
};

export const orderConstructorSlice = createSlice({
  name: 'orderConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TOrderConstructor>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TOrderConstructor) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteItem: (state, action: PayloadAction<TOrderConstructor>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearAll: () => initialState,
    updateAll: (state, action: PayloadAction<TOrderConstructor[]>) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    selectItems: (state: TOrderConstructorState) => state
  }
});

export const { addItem, deleteItem, clearAll, updateAll } =
  orderConstructorSlice.actions;
export const constructorSelector = orderConstructorSlice.selectors;
