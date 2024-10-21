import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorItems,
  getOrderRequest,
  getOrderModalData
} from '../../services/slices/BurgerConstructorSlice';
import { selectUser } from '../../services/slices/UserInfoSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest! и orderModalData! из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const authorized = useSelector(selectUser);

  //todo! to join data for order, use dispatch to create order

  // const orderRequest = false;

  // const orderModalData = null;

  const onOrderClick = () => {
    if (!authorized) {
      return navigate('/login'); //проверяем авторизован ли пользователь
    }
    if (!constructorItems.bun || orderRequest) return;
  };

  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
