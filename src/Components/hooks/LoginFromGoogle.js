import React, { useRef, useEffect } from 'react';

import { GoogleLogin } from 'react-google-login';
import './LoginFromGoogle.css';
import { apiLoginGoogle } from '../../redux/reducer/login';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const GOOGLE_CLIENT_ID =
  '913412464437-a7ohualvhioa1mefpohgg0u4df7276nb.apps.googleusercontent.com';

export const LoginFromGoogle = ({ page = false }) => {
  const buttonRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onSuccess = ({ profileObj }) => {
    dispatch(apiLoginGoogle(profileObj));
    navigate('/');
  };

  const onFailure = res => {
    console.log(res);
  };

  useEffect(() => {
    buttonRef.current.firstChild.id = 'loginFromGoogle';
  }, []);

  return (
    <div
      ref={buttonRef}
      style={{
        width: '80%',
      }}
    >
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText='Ingresar con Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};
