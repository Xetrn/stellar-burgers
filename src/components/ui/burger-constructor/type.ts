import { TOrder } from '@utils-types';
import { TOrderConstructorState } from 'src/services/slices/orderConstructorSlice';

export type BurgerConstructorUIProps = {
  constructorItems: TOrderConstructorState;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
