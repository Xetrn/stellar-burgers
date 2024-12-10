import { TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from './getIngredients';
import { TPendingProps } from '../../../services/types';
import { useSelector } from '../../../services/store';

interface TBurgerIngredientsSlice extends TPendingProps {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  all: TIngredient[];
  chosenIngredient: TIngredient | null;
  chosenIngredientId: string | null;
}

const initialState: TBurgerIngredientsSlice = {
  buns: [],
  mains: [],
  sauces: [],
  all: [],
  loading: false,
  error: '',
  chosenIngredient: null,
  chosenIngredientId: null
};

export const IngredientsSlice = createSlice({
  name: 'allIngredients',
  initialState,
  reducers: {
    chooseIngredient: (store, action: PayloadAction<string>) => {
      store.chosenIngredientId = action.payload;
    }
  },
  selectors: {
    selectBuns: (state) => state.buns,
    selectMains: (state) => state.mains,
    selectSauces: (state) => state.sauces,
    selectLoading: (state) => state.loading,
    selectAllIngredients: (state) => state.all,
    selectChosenIngredient: (state) => state.chosenIngredientId,
    selectIngredientDetails: (state) => {
      const chosen = state.chosenIngredientId;
      return state.all.find((item) => item._id === chosen);
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.all = action.payload;
      state.buns = action.payload.filter((item) => item.type === 'bun');
      state.mains = action.payload.filter((item) => item.type === 'main');
      state.sauces = action.payload.filter((item) => item.type === 'sauce');
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.loading = false;
    });
  }
});
export const {
  selectBuns,
  selectMains,
  selectSauces,
  selectLoading,
  selectAllIngredients,
  selectIngredientDetails
} = IngredientsSlice.selectors;

export const { chooseIngredient } = IngredientsSlice.actions;
