import { TConstructorIngredient } from '@utils-types';

export default function swapElements(
  state: TConstructorIngredient[],
  index: number,
  step: number
) {
  const copy = [...state];
  copy[index] = copy.splice(index + step, 1, copy[index])[0];

  return copy;
}
