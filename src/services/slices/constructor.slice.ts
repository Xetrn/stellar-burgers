import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface IConstructorItems {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

interface IConstructorSlice {
  constructorItems: IConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: IConstructorSlice = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setConstructorItems: (state, action: PayloadAction<IConstructorItems>) => {
      state.constructorItems = action.payload;
    }
  }
});

export const { setConstructorItems } = constructorSlice.actions;
export default constructorSlice.reducer;
