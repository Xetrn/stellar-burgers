import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export type TBun = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

interface ConstructorState {
  bun: TBun;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: {
    _id: '',
    price: 0,
    name: '',
    image: ''
  },
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState: initialState,
  reducers: {}
});

export const ConstructorReducer = constructorSlice.reducer;
