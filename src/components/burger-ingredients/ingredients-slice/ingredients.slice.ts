import { TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from './getAIngredients';
import { TPendingProps } from '../../../services/types';

interface TBurgerIngredientsSlice extends TPendingProps {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
}

const initialState: TBurgerIngredientsSlice = {
  buns: [],
  mains: [],
  sauces: [],
  loading: false,
  error: ''
};

export const IngredientsSlice = createSlice({
  name: 'allIngredients',
  initialState,
  reducers: {},
  selectors: {
    selectBuns: (state) => state.buns,
    selectMains: (state) => state.mains,
    selectSauces: (state) => state.sauces,
    slice: (state) => state.loading
  },

  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.buns = action.payload.filter((item) => item.type === 'bun');
      state.mains = action.payload.filter((item) => item.type === 'main');
      state.sauces = action.payload.filter((item) => item.type === 'sauce');
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.loading = false;
    });
  }
});
export const { selectBuns, selectMains, selectSauces, slice } =
  IngredientsSlice.selectors;
