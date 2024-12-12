import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

import { orderBurgerApi } from '@api';

export const orderBurger = createAsyncThunk('constructor/order', orderBurgerApi);

type ConstructorIngredients = {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
};

type ConstructorItems = {
    constructorItems: ConstructorIngredients;
    ingredientId: number;
    isOrderCreating: boolean;
    isError: boolean;
    order: TOrder | null;
};

const initialState: ConstructorItems = {
    constructorItems: { bun: null, ingredients: [] },
    ingredientId: 0,
    order: null,
    isOrderCreating: false,
    isError: false
};

const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        setBun: (state, action: PayloadAction<TIngredient>) => {
            state.constructorItems.bun = action.payload;
        },
        addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
            state.constructorItems.ingredients.push(action.payload);
            state.ingredientId++;
        },
        moveDown: (state, action: PayloadAction<number>) => {
            const index = action.payload;

            [state.constructorItems.ingredients[index], state.constructorItems.ingredients[index + 1]] = [
                state.constructorItems.ingredients[index + 1],
                state.constructorItems.ingredients[index]
            ];
        },
        moveUp: (state, action: PayloadAction<number>) => {
            const index = action.payload;

            [state.constructorItems.ingredients[index], state.constructorItems.ingredients[index - 1]] = [
                state.constructorItems.ingredients[index - 1],
                state.constructorItems.ingredients[index]
            ];
        },
        removeIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
            state.constructorItems.ingredients = state.constructorItems.ingredients.filter(
                (value) => value.id !== action.payload.id
            );
        },
        clearOrder: (state) => {
            state.isError = false;
            state.order = null;
            state.isOrderCreating = false;

            state.constructorItems = { bun: null, ingredients: [] };
            state.ingredientId = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderBurger.pending, (state) => {
                state.isError = false;
                state.order = null;

                state.isOrderCreating = true;
            })
            .addCase(orderBurger.fulfilled, (state, action) => {
                state.isOrderCreating = false;
                state.order = action.payload.order;

                state.constructorItems = { bun: null, ingredients: [] };
                state.ingredientId = 0;
            })
            .addCase(orderBurger.rejected, (state) => {
                state.isError = true;
                state.isOrderCreating = false;
            });
    }
});

export const { setBun, addIngredient, removeIngredient, moveUp, moveDown, clearOrder } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
