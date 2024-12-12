import { OrderInfo } from '@components';
import { TOrder } from '@utils-types';
import { OrderInfoUIProps } from '../../ui/order-info/type';
import { TPendingProps } from '../../../services/types';

export interface IOrderModal extends TPendingProps {
  order: TOrder;
}
