import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { postUserReview } from '../../redux/reducer/review';

export const CardReview = ({ review }) => {
  const saveButton = useRef();

  const dispatch = useDispatch();
  const [formReview, setFormReview] = useState({ rating: 0, comment: '' });

  const [selectedStars, setSelectedStars] = useState(0);

  const [active, setActive] = useState(true);

  const changeRating = count => {
    setFormReview(state => ({ ...state, rating: count }));
  };

  const saveReview = () => {
    saveButton.current.disabled = true;
    toast
      .promise(dispatch(postUserReview({ id: review.id, ...formReview })), {
        loading: 'Guardando...',
        success: <b>Reseña enviada 👍</b>,
        error: <b>Error.</b>,
      })
      .then(() => {
        setActive(false);
      });
  };

  return (
    <>
      {active ? (
        <div className='userReviewContainer'>
          <div className='reviewHeader'>
            <span>Comprado el {review.createdAt.substring(0, 10)}</span>
          </div>

          <div className='reviewBody'>
            <div className='productDescription'>
              <img alt={review.product.name} src={review.product.image[0]} />
              <span>{review.product.name}</span>
            </div>

            <div className='inputContainer'>
              <div className='buttonsContainer'>
                <div className='ratingContainer' id={'ratingContainer' + 1}>
                  {[...Array(5)].map((item, index) => (
                    <span
                      key={index}
                      className='fa fa-star'
                      style={{
                        color: index + 1 <= selectedStars ? 'gold' : 'gray',
                        cursor: 'pointer',
                      }}
                      onClick={() => changeRating(index + 1)}
                      onMouseOver={() => {
                        setSelectedStars(index + 1);
                      }}
                      onMouseOut={() => {
                        setSelectedStars(formReview.rating);
                      }}
                    ></span>
                  ))}
                </div>
                <button className='btn ' onClick={saveReview} ref={saveButton}>
                  Enviar <i className='fas fa-save'></i>
                </button>
              </div>

              <div className='form-floating'>
                <textarea
                  className='form-control'
                  placeholder='Deje su comentario'
                  id={'floatingTextarea' + review.id}
                  onChange={({ target }) => {
                    setFormReview(state =>
                      state.length > 100
                        ? { ...state, comment: target.value.substring(0, 100) }
                        : { ...state, comment: target.value }
                    );
                  }}
                  maxLength='100'
                ></textarea>
                <label htmlFor={'floatingTextarea' + review.id}>
                  Deje su comentario{' '}
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
