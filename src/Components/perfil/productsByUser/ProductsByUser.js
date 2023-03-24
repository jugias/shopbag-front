import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByUser } from "../../../redux/reducer/getProductsByUser";
import Card from "../../Card/Cards";

import "./productsByUser.css";

export const ProductsByUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByUser());
  }, [dispatch]);
  const data = useSelector((state) => state.productsByUser.productsByUser);

  return (
    <div className="productsByUSer__container">
      <hr />
      <div className="col ">
        <h4 className=" ">Mis Productos</h4>
      </div>
      {data.length > 0 ? (
        <div className="productsByUSer__cardContainer">
          {data.map((pr) => (
            <Card
              key={pr.id}
              description={pr.description}
              name={pr.name}
              image={pr.image}
              price={pr.price}
              id={pr.id}
              color={pr.color}
              brand={pr.brand}
              stock={pr.stock}
              warranty={pr.warranty}
              category={pr.categoryId}
              genre={pr.genreId}
              discount={pr.discount}
              reviews={pr.reviews}
            />
          ))}
        </div>
      ) : (
        <div className="productsByUSer__noProducts">
          <p>No tiene productos en venta</p>
        </div>
      )}
      <hr />
    </div>
  );
};
