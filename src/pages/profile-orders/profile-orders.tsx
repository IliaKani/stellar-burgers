import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  ordersHistory,
  getUserOrdersLoading,
  getUserOrdersHistory
} from '../../services/slices/UserOrdersHistory';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoad = useSelector(getUserOrdersLoading);

  useEffect(() => {
    dispatch(ordersHistory());
  }, []);

  const orders: TOrder[] = useSelector(getUserOrdersHistory);

  if (isLoad) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
