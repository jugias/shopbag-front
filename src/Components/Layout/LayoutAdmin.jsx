import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../admin/components/sidebar/Sidebar';
import './Layout.css';
import { rootVerification } from '../../redux/reducer/login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(rootVerification()).then(({ payload }) => {
    if (!payload) navigate('/login');
  });

  return (
    <div className='grid__adminLayaout'>
      <div>
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;
