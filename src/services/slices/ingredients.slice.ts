import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients(state, action: PayloadAction<TIngredient[]>) {
      state.ingredients = action.payload;
      return state;
    },
    setIngredientsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      return state;
    }
  }
});

export const { setIngredients, setIngredientsLoading } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
