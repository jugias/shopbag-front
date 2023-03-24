import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ShoppingCart.css';
import {
  deleteShoppingList,
  updateShoppingList,
  deleteShoppingCart,
  putShoppingCart,
  getShoppingCart,
  cleanShoppingCart,
  cleanShoppingList,
  getShoppingCartGuest,
} from '../../redux/reducer/shoppingCart';
import { ButtonCounter } from '../hooks/ButtonCounter';

import toast, { Toaster } from 'react-hot-toast';

export const ShoppingCart = ({ login = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iframeActive, setIframeActive] = useState(false);
  const userToken = JSON.parse(localStorage.getItem('userCredentials'))?.token;
  const baseUrl = process.env.REACT_APP_API || 'http://localhost:3001';
  const shoppingList = useSelector(
    ({ shoppingCart }) => shoppingCart.shoppingList
  );
  userToken && (login = true);

  useEffect(() => {
    login
      ? dispatch(getShoppingCart())
      : dispatch(
          getShoppingCartGuest(JSON.parse(localStorage.getItem('shoppingCart')))
        );
    document
      .getElementById('modalMercadoPago')
      .addEventListener('hidden.bs.modal', e => {
        setIframeActive(false);
      });

    document
      .getElementById('modalMercadoPago')
      .addEventListener('show.bs.modal', e => {
        setIframeActive(true);
      });
  }, []);

  const updateShopping = (quantity, id) => {
    dispatch(updateShoppingList({ quantity, id }));
    login && dispatch(putShoppingCart({ quantity, id }));
  };

  const deleteShopping = id => {
    dispatch(deleteShoppingList(id));
    login && dispatch(deleteShoppingCart(id));
  };

  const cleanShopping = () => {
    dispatch(cleanShoppingList());
    login && dispatch(cleanShoppingCart());
  };

  const startPurchase = () => {
    if (!shoppingList.length) return toast.error('Carrito vacio.');

    try {
      window.bootstrap.Modal.getOrCreateInstance(
        document.getElementById(login ? 'modalMercadoPago' : 'loginModal')
      ).show();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className='modal fade'
        id='modalMercadoPago'
        tabIndex='-1'
        aria-labelledby='modalMercadoPagoLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-body  p-0' style={{ height: '90vh' }}>
              {iframeActive && (
                <iframe
                  src={baseUrl + `/api/checkout/${userToken}`}
                  style={{ width: '100%', height: '90vh' }}
                  title='mercadoPago'
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='carrito__container'>
        <Toaster position='top-center' reverseOrder={false} />
        <div className='bg-light mt-3 mx-3' style={{ position: 'relative' }}>
          <button
            style={{ position: 'absolute', left: '10px', top: '10px' }}
            onClick={() => navigate('/')}
            className='btn text-light btn-danger'
          >
            <i className='fas fa-arrow-left'></i>{' '}
            <span className='back'>Regresar</span>
          </button>
          <button // chequear mercado pago
            style={{ position: 'absolute', right: '10px', top: '10px' }}
            className='btn text-light btn-success'
            onClick={startPurchase}
          >
            <i className='far fa-credit-card pr-1'></i>
            <span className='buy'>Comprar</span>
          </button>

          <h4 className='py-3 px-3 text-center'>Carro de compra</h4>
          <p className='border-bottom text-right py-1 mx-3'>
            {shoppingList.length ? 'Precio' : ''}
          </p>
          {shoppingList[0]?.id && shoppingList.length ? (
            shoppingList.map(
              ({ id, image, name, stock, price, quantity, discount }) => (
                <div
                  key={id}
                  className=' border-bottom d-flex mx-3 py-3 position-relative'
                >
                  {discount ? (
                    <span
                      className='position-absolute top-0 d-flex justify-content-center align-items-center'
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: 'red',
                        fontSize: '.8rem',
                        width: '2.3rem',
                        height: '2.3rem',
                        borderRadius: '50%',
                      }}
                    >
                      -%{discount}
                    </span>
                  ) : (
                    ''
                  )}
                  <div className='px-3'>
                    <img
                      className=' img-thumbnail'
                      src={image[0]}
                      alt={name}
                      width={200}
                    />
                  </div>
                  <div className='d-flex  justify-content-beetwen w-100'>
                    <div className='col-7'>
                      <p>{name}</p>
                      <p className='pt-1'>
                        {stock
                          ? stock +
                            (stock === 1 ? 'unidad' : ' unidades disponibles')
                          : 'Sin disponibilidad'}
                      </p>

                      <div className='shoppingButtonsContainer'>
                        <button
                          className='btn text-light btn-dark'
                          onClick={() => deleteShopping(id)}
                        >
                          Eliminar
                        </button>

                        <ButtonCounter
                          init={quantity}
                          cb={updateShopping}
                          id={id}
                          max={stock}
                        />
                      </div>
                    </div>
                    <div className='col-5 text-right'>
                      <p>
                        {discount ? (
                          <>
                            <span style={{ textDecoration: 'line-through' }}>
                              ${price}
                            </span>
                            {' - '}
                          </>
                        ) : (
                          ''
                        )}
                        ${price - (price * discount) / 100}
                      </p>
                      <span> </span>
                      <p className=''>Cantidad {quantity}</p>
                      <p className=''>
                        Total $
                        {(
                          (price - (price * discount) / 100) *
                          quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className=' text-center'>
              <h3>
                Su carro de compras está vacio. Agregue algunos productos!
              </h3>
            </div>
          )}
          <div className=' d-flex py-3 mx-3 justify-content-between'>
            <div className='col-6'>
              <button
                className='btn text-light btn-warning'
                onClick={cleanShopping}
                disabled={!shoppingList.length}
              >
                Eliminar todo
              </button>
            </div>

            {shoppingList.length ? (
              <div className='col-6 text-right'>
                Total :$
                {shoppingList
                  .reduce(
                    (a, b) =>
                      a + (b.price - (b.price * b.discount) / 100) * b.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};
