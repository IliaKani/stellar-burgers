import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorItems,
  getOrderRequest,
  getOrderModalData,
  createOrder,
  clearOrder
} from '../../services/slices/BurgerConstructorSlice';
import {
  selectUser,
  selectIsAuthChecked,
  selectIsAuthenticated,
  checkUserAuth
} from '../../services/slices/UserInfoSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest! и orderModalData! из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const authorized = useSelector(selectIsAuthenticated);

  const onOrderClick = () => {
    if (!authorized) {
      return navigate('/login'); //проверяем авторизован ли пользователь
    }
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun?._id
    ].filter(Boolean);

    dispatch(createOrder(order));
    console.log(order);
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

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
