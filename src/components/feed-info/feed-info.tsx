import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  getFeedOrders,
  getTotalEmountOrders,
  getTotalEmountToday,
  getLoading,
  getError
} from '../../services/slices/FeedDataSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** DONE: взять переменные из стора */
  const orders: TOrder[] = useSelector(getFeedOrders);
  const totalAmount = useSelector(getTotalEmountOrders);
  const totalAmountToday = useSelector(getTotalEmountToday);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total: totalAmount, totalToday: totalAmountToday }}
    />
  );
};
