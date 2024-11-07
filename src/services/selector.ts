import { RootState } from './store';

export const selectOrderById = (number: number) => (state: RootState) => {
  if (state.feeddata.orders.length || state.ordershistory.orders.length) {
    return (
      state.feeddata.orders.find((order) => order.number === number) ||
      state.ordershistory.orders.find((order) => order.number === number)
    );
  }
  if (state.feeddata.modalOrder) {
    return state.feeddata.modalOrder.number === number
      ? state.feeddata.modalOrder
      : null;
  }
  return null;
};
