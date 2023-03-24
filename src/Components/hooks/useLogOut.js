import { useDispatch } from 'react-redux';

import { logOut } from '../../redux/reducer/login';
import { cleanShoppingList } from '../../redux/reducer/shoppingCart';
import { useNavigate } from 'react-router-dom';
export const useLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const out = () => {
    dispatch(logOut());
    dispatch(cleanShoppingList());
    navigate('/');
  };

  return out;
};
