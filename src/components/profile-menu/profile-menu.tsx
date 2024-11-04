import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logOutUser } from '../../services/slices/UserInfoSlice';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};

//Done: логин/логаут с сохранением и очищением токенов, регистрация - с сохранением токенов,
//Done: Потом при каждом заходе на сайте т.е. при первом рендере компонента app  делать запрос пользователя с помощью access токена и получать пользователя в стор. Если пользователь есть - значит он авторизован, если нет -  нужно на защищенных компонентах перенаправлять на страницу логина
//ToDo: проверить вызовы обновления токенов, отобразить историю заказов, доделать смену пароля, редактирование личных данных, вывод/обработка ошибок/доадеров?
//ToDo: поправить Readme, удалить консольлоги, комментарии todo, done, откомментировать основные моменты кода
