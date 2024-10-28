import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedData } from '../../services/slices/FeedDataSlice';
import { getFeedOrders } from '../../services/slices/FeedDataSlice';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** DONE: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedData()).then((result) => {});
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getFeedOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetAllOrders = () => {
    dispatch(getFeedData());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetAllOrders} />;
};
