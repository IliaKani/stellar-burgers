import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorSelector,
  clearBurgerConstructor
} from '../../services/slices/constructorSlice';
import {
  clearOrder,
  isOrderLoadingSelector,
  orderSelector
} from '../../services/slices/orderSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthCheckedSelector } from '../../services/slices/authSlice';
import { orderBurgerThunk } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(burgerConstructorSelector);
  const orderRequest = useSelector(isOrderLoadingSelector);
  const orderModalData = useSelector(orderSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useSelector(isAuthCheckedSelector);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const { bun, ingredients } = constructorItems;
    if (!constructorItems.bun || orderRequest) return;
    const orderData: string[] = [
      bun?._id!,
      ...ingredients.map((ingredient) => ingredient._id),
      bun?._id!
    ];
    dispatch(orderBurgerThunk(orderData))
      .unwrap()
      .then(() => {
        dispatch(clearBurgerConstructor());
      });
  };

  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
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
