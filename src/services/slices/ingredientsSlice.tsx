import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TIngredient } from "@utils-types"
import { getIngredients } from "../thunks";


export type IngredientsData = {
    isIngredientsLoading: boolean,
    isIngredientsError: boolean,
    ingredients: TIngredient[],
    buns: TIngredient[],
    mains: TIngredient[],
    sauces: TIngredient[]
}

const initialState: IngredientsData = {
    isIngredientsLoading: true,
    isIngredientsError: false,
    ingredients: [],
    buns: [],
    mains: [],
    sauces: []
}

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getIngredients.pending, (state) => {
            state.isIngredientsLoading = true;
            state.isIngredientsError = false;
        })
        .addCase(getIngredients.fulfilled, (state, action) => {
            const ingredients = action.payload;
            state.ingredients = ingredients;
            state.buns = ingredients.filter(i => i.type === 'bun');
            state.mains = ingredients.filter(i => i.type === 'main');
            state.sauces = ingredients.filter(i => i.type === 'sauce');
            state.isIngredientsLoading = false;
        })
        .addCase(getIngredients.rejected, (state) => {
            state.isIngredientsLoading = false;
            state.isIngredientsError = true;
        })
    }
});
export const ingredientsReducer = ingredientsSlice.reducer;