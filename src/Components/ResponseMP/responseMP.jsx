import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderMP, postOrderMP } from '../../redux/reducer/getResponseMP';
import jsPDF from 'jspdf';
import './response.css';
import logo from './LogoEcommerce.png';
import shoppingCart, {
  cleanShoppingList,
  cleanShoppingCart,
} from '../../redux/reducer/shoppingCart';
import { sendNotification } from '../../utils/notifications';

import { useNavigate } from 'react-router-dom';

const ResponseMP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const invoice = useSelector(state => state.paymentOrderEG.invoice);
  const listOrders = useSelector(state => state.paymentOrderEG.listOrders);

  useEffect(() => {
    if (
      !localStorage.getItem('shoppingCart') ||
      !JSON.parse(localStorage.getItem('shoppingCart')).length
    ) {
      navigate('/');
    } else {
      Promise.all([dispatch(getOrderMP()), dispatch(postOrderMP())]).then(
        () => {
          sendNotification('ordersQuantity');
          sendNotification('salesQuantity');
          sendNotification('lastOrders');
          sendNotification('profitAmount');
          sendNotification('getRadarChar');
          sendNotification('salesReport')

          dispatch(cleanShoppingList());
          dispatch(cleanShoppingCart());
        }
      );
    }
  }, []);

  const genPDF = async () => {
    try {
      var doc = new jsPDF('p', 'mm', [720, 660]);

      var pdfjs = document.getElementById('content');
      await doc.html(pdfjs, {
        callback: function (doc) {
          doc.save(`factura#${invoice.invoiceNumber}.pdf`);
        },
      }); //,
    } catch (error) {}
  };

  return listOrders?.shoppingCart && invoice?.invoiceNumber ? (
    <div style={{ position: 'relative', width: '700px', margin: '0 auto' }}>
      <div
        id='content'
        className='page-content container'
        style={{ background: 'white', height: '650px' }}
      >
        <div className='page-header text-blue-d2'>
          <h1 className='page-title text-secondary-d1'>ShopBag</h1>
        </div>
        <div className='container px-0'>
          <div className='row mt-4'>
            <div className='col-12 col-lg-12'>
              <div className='row'>
                <div className='col-12'>
                  <div className='text-center text-150'>
                    <img
                      src={logo}
                      style={{ height: '50px', margin: 0 }}
                      alt='logo'
                    />
                    <span className='text-default-d3'>
                      Orden Compra # {invoice.invoiceNumber}
                    </span>
                  </div>
                </div>
              </div>

              <hr className='row brc-default-l1 mx-n1 mb-4' />

              <div className='row' style={{ marginBottom: '50px' }}>
                <div className='col-sm-6'>
                  <div>
                    <span className='text-sm text-grey-m2 align-middle'>
                      Para:
                    </span>
                    <span className='text-600 text-110 text-blue align-middle'>
                      {' '}
                      {listOrders.user.firstName} {listOrders.user.lastName}
                    </span>
                  </div>
                  <div>
                    <span className='text-sm text-grey-m2 align-middle'>
                      Dirección:
                    </span>
                    <span className='text-600 text-110 text-blue align-middle'>
                      {listOrders.user.address}
                    </span>
                  </div>
                  <div>
                    <span className='text-sm text-grey-m2 align-middle'>
                      Teléfono:
                    </span>
                    <span className='text-600 text-110 text-blue align-middle'>
                      {listOrders.user.phone}
                    </span>
                  </div>
                  <div>
                    <span className='text-sm text-grey-m2 align-middle'>
                      Email:{' '}
                    </span>
                    <span className='text-600 text-110 text-blue align-middle'>
                      {listOrders.user.email}
                    </span>
                  </div>
                </div>

                <div className='text-95 col-sm-6 align-self-start d-sm-flex justify-content-end'>
                  <hr className='d-sm-none' />
                  <div className='text-grey-m2'>
                    <div className='mt-1 mb-2 text-secondary-m1 text-600 text-125'></div>
                    <div className='my-2'>
                      <i className='fa fa-circle text-blue-m2 text-xs mr-1'></i>{' '}
                      <span className='text-600 text-90'>Orden #:</span>
                      {invoice.invoiceNumber}
                    </div>
                    <div className='my-2'>
                      <i className='fa fa-circle text-blue-m2 text-xs mr-1'></i>{' '}
                      <span className='text-600 text-90'>Fecha:</span>
                      {invoice.createdAt.substring(0, 10)}
                    </div>
                    {/* //2022-05-15 13:31:26.18-04 */}
                    <div className='my-2 d-flex'>
                      <i className='fa fa-circle text-blue-m2 text-xs mr-1'></i>{' '}
                      <span className='text-600 text-90'>Status:</span>
                      <span className='badge badge-warning badge-pill px-25'>
                        none
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row text-600 text-white bgc-default-tp1 py-25 px-1'>
                <div className='d-none d-sm-block col-1'>#</div>
                <div className='col-3'>Descripción</div>
                <div className='d-none d-sm-block col-2 col-sm-2'>Cant.</div>
                <div className='d-none d-sm-block col-sm-2'>Unit.Precio</div>
                <div className='d-none d-sm-block col-sm-2'>Dcto.</div>
                <div className='col-2'>Total</div>
              </div>

              <div className='mt-4'>
                <div className='text-95 text-secondary-d3'>
                  {listOrders.shoppingCart.map((elem, index) => {
                    return (
                      <div key={elem.title} className='row mb-2 mb-sm-0 py-25'>
                        <div className='d-none d-sm-block col-1'>
                          {index + 1}{' '}
                        </div>
                        <div className='col-3 '>{elem.title}</div>
                        <div className='d-none d-sm-block col-2'>
                          {elem.quantity}
                        </div>
                        <div className='d-none d-sm-block col-2 text-95'>
                          ${elem.price.toFixed(2)}
                        </div>
                        <div className='d-none d-sm-block col-2 text-95'>
                          {elem.discount.toFixed(2)}%
                        </div>
                        <div className='col-2 text-secondary-d2'>
                          ${elem.totalPage.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className='row mt-3'>
                <div className='col-12 col-sm-5 text-grey text-90 order-first order-sm-last ml-auto'>
                  <div className='row my-2 align-items-center bgc-primary-l3 p-2'>
                    <div className='col-7 text-right'>invoice / total $</div>
                    <div className='col-5'>
                      <span className='text-150 text-success-d3 opacity-2'>
                        {invoice.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <span className='text-secondary-d1 text-105'>
                Gracias por su Compra !
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className='buttonsContainer'
        style={{
          position: 'absolute',
          display: 'flex',
          top: '1rem',
          right: '1rem',
        }}
      >
        <div onClick={() => navigate('/')} className='btn btn-info  px-4 mr-1'>
          Continuar!
        </div>
        <div onClick={genPDF} className='btn btn-success px-4  mr-1'>
          Descargar
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ResponseMP;
