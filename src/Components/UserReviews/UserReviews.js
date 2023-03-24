import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviews } from '../../redux/reducer/review';
import './UserReviews.scss';
import { CardReview } from './CardReview';
import { Toaster } from 'react-hot-toast';

export const UserReviews = () => {
  const dispatch = useDispatch();
  const userReviews = useSelector(({ review }) => review.userReviews);

  useEffect(() => {
    dispatch(getUserReviews());
  }, []);

  return (
    <>
      <Toaster />
      {userReviews.length ? (
        <div className='userReviewList'>
          <h2>MIS RESEÑAS</h2>

          {userReviews.map(review => (
            <CardReview review={review} key={review.id} />
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: 'center', margin: 'auto' }}>Aún no tienes reseñas.</h2>
      )}
    </>
  );
};
