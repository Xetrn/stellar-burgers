import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TConstructorIngredient, TIngredient, TOrder } from "@utils-types"
import { orderBurger } from "../thunks"

export type ConstructorItems = {
    constructorItems: ConstructorIngredients,
    isOrderRequest: boolean,
    isOrderRequestError: boolean,
    orderData: TOrder | null,
    ingredientId: number,
}

type ConstructorIngredients = {
    bun: TIngredient | null,
    ingredients: TConstructorIngredient[]
};

const initialState: ConstructorItems = {
    constructorItems: {bun: null, ingredients: []},
    orderData: null,
    isOrderRequest: false,
    isOrderRequestError: false,
    ingredientId: 0
}

const constructorSlice = createSlice({
    name: "constructor",
    initialState,
    reducers: {
        setBun: (state, action: PayloadAction<TIngredient>) => {
            state.constructorItems.bun = action.payload;
        },
        addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
            state.constructorItems.ingredients.push(action.payload);
            state.ingredientId++;
        },
        removeIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
            state.constructorItems.ingredients = state.constructorItems.ingredients.filter(i => i.id !== action.payload.id);
        },
        swapWithAbove: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            [state.constructorItems.ingredients[index], state.constructorItems.ingredients[index - 1]] = 
            [state.constructorItems.ingredients[index - 1], state.constructorItems.ingredients[index]]
        },
        swapWithBelow: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            [state.constructorItems.ingredients[index], state.constructorItems.ingredients[index + 1]] = 
            [state.constructorItems.ingredients[index + 1], state.constructorItems.ingredients[index]]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(orderBurger.pending, (state) => {
            state.isOrderRequestError = false;
            state.orderData = null;
            state.isOrderRequest = true;
        })
        .addCase(orderBurger.fulfilled, (state, action) => {
            state.isOrderRequest = false;
            state.orderData = action.payload.order;
            state.constructorItems = {bun: null, ingredients: []}
            state.ingredientId = 0;
        })
        .addCase(orderBurger.rejected, (state) => {
            state.isOrderRequestError = true;
            state.isOrderRequest = false;
        })
    }
})

export const { setBun, addIngredient, removeIngredient, swapWithAbove, swapWithBelow } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;