import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

import { getIngredientsApi } from '@api';

export const getIngredients = createAsyncThunk('ingredients/getAll', getIngredientsApi);

type IngredientsState = {
    isLoading: boolean;
    isError: boolean;
    ingredients: TIngredient[];
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
};

export const initialState: IngredientsState = {
    isLoading: true,
    isError: false,
    ingredients: [],
    buns: [],
    mains: [],
    sauces: []
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
                state.ingredients = action.payload;

                state.buns = action.payload.filter((value) => value.type === 'bun');
                state.mains = action.payload.filter((value) => value.type === 'main');
                state.sauces = action.payload.filter((value) => value.type === 'sauce');

                state.isLoading = false;
            })
            .addCase(getIngredients.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    }
});
export const ingredientsReducer = ingredientsSlice.reducer;
