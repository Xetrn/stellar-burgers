import { TIngredientsState } from '../slices/ingredients';
import { TIngredient } from '@utils-types';
import { PayloadAction, SerializedError } from '@reduxjs/toolkit';

export const onPendingGetIngredientsList = (state: TIngredientsState) => {
  state.isLoadingGetIngredients = true;
  state.error = null;
};

export const onFulfilledGetIngredientsList = (
  state: TIngredientsState,
  action: PayloadAction<
    TIngredient[],
    string,
    {
      arg: void;
      requestId: string;
      requestStatus: 'fulfilled';
    }
  >
) => {
  state.isLoadingGetIngredients = false;
  state.ingredients = action.payload;
};

export const onRejectedGetIngredientsList = (
  state: TIngredientsState,
  action: PayloadAction<
    unknown,
    string,
    | ({
        arg: void;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: true })
    | ({
        arg: void;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: false }),
    SerializedError
  >
) => {
  state.isLoadingGetIngredients = false;
  state.error = action.error.message;
};
