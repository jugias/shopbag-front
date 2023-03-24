import React, { useRef, useEffect } from 'react';

import FacebookLogin from '@greatsumini/react-facebook-login';

import { apiLoginFacebook } from '../../redux/reducer/login';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const LoginFromFacebook = ({ page = false }) => {
  const buttonRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSuccess = res => {
    dispatch(apiLoginFacebook(res));
    navigate('/');
  };

  const onFailure = res => {
    console.log(res);
  };


  useEffect(() => {
    if (page && localStorage.getItem('userCredentials')) {
      Swal.close();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bienvenido',
        timer: 1500,
      });
      try {
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById('loginModal')
        );

        modal.hide();
      } catch (error) {}

      navigate('/');
    }
  }, [localStorage.getItem('userCredentials')]);


  useEffect(() => {
    buttonRef.current.lastChild.innerText = 'Ingresar con Facebook';
  }, []);

  return (
    <div
      ref={buttonRef}
      style={{
        width: '80%',
        height: '2.6rem',
        backgroundColor: '#4267b2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <i
        className='fab fa-facebook'
        style={{
          fontSize: '25px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      ></i>
      <FacebookLogin
        appId='1727626107587181'
        onFail={onFailure}
        onProfileSuccess={onSuccess}
        style={{
          backgroundColor: 'transparent',
          color: '#fff',
          fontSize: '1rem',
          padding: '10px 10px 10px 0',
          border: 'none',
          fontWeight: 'bold'
        }}
      />
    </div>
  );
};
