import React, { useState } from "react";
import "./card.css";
import { postWish } from "../../redux/reducer/getWishilist";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  addShoppingList,
  postShoppingCart,
} from "../../redux/reducer/shoppingCart";
import { useLocation } from "react-router-dom";
import { CreateProducts } from "../createProduct/CreateProducts";

const Card = ({
  description,
  name,
  price,
  image,
  id,
  color,
  brand,
  stock,
  warranty,
  category,
  genre,
  discount,
  reviews,
}) => {
  const navigate = useLocation();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(!edit);
  };

  const addShopping = ({ target }) => {
    dispatch(addShoppingList({ id, stock }));

    if (localStorage.getItem("userCredentials")) {
      target.parentElement.disabled = true;
      target.disabled = true;
      toast
        .promise(dispatch(postShoppingCart(id)), {
          loading: "Guardando...",
          success: <b>Agregado al carrito 🛒</b>,
          error: <b>No se puedo agregar al carrito 😿</b>,
        })
        .then(
          () => (
            (target.parentElement.disabled = false), (target.disabled = false)
          )
        );
    } else {
      toast.success("Agregado al carrito 🛒");
    }
  };

  const addAWish = ({ target }) => {
    if (localStorage.getItem("userCredentials")) {
      target.parentElement.disabled = true;
      target.disabled = true;
      toast
        .promise(dispatch(postWish(id)), {
          loading: "Guardando...",
          success: <b>Agregado a tu lista de deseos 😍</b>,
          error: <b>No se puedo agregar😿</b>,
        })
        .then(
          () => (
            (target.parentElement.disabled = false), (target.disabled = false)
          )
        );
    } else {
      try {
        toast.error("Inicie sesion...");

        window.bootstrap.Modal.getOrCreateInstance(
          document.getElementById(`modal${id}`)
        ).hide();
        window.bootstrap.Modal.getOrCreateInstance(
          document.getElementById("loginModal")
        ).show();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="d-flex flex-wrap">
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="card position-relative"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#modal${id}`}
      >
        {reviews?.length ? (
          <div
            className="generalRanking"
            style={{
              position: "absolute",
              top: "0",
              right: "5px",
              fontSize: "1rem",
              zIndex: 100,
            }}
          >
            {[...Array(5)].map((item, index) => (
              <span
                key={index}
                className="fa fa-star checked"
                style={{
                  color:
                    index + 1 <=
                    reviews?.reduce((a, b) => a + b.rating, 0) / reviews.length
                      ? "gold"
                      : "gray",
                }}
              ></span>
            ))}
            <span className="mx-1">({reviews.length})</span>
          </div>
        ) : (
          <></>
        )}

        <img className="card-img-top" src={image[0]} alt="foto" />

        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <span className={`badge ${category}`}>{category}</span>
          <p className="card__precio">Precio: ${price}</p>
        </div>
      </div>
      {/* inicio modal */}
      <div
        className="modal fade"
        id={"modal" + id}
        tabIndex="-1"
        aria-labelledby={"modalLabel" + id}
        aria-hidden="true"
      >
        {!edit ? (
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div className="d-flex">
                  <div className="position-relative" style={{ width: "50%" }}>
                    <div
                      className="generalRanking"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        fontSize: "1.5rem",
                        zIndex: 100,
                      }}
                    >
                      {[...Array(5)].map((item, index) => (
                        <span
                          key={index}
                          className="fa fa-star checked"
                          style={{
                            color:
                              index + 1 <=
                              reviews?.reduce((a, b) => a + b.rating, 0) /
                                reviews?.length
                                ? "gold"
                                : "gray",
                          }}
                        ></span>
                      ))}
                    </div>

                    <div
                      id={"carousel" + id}
                      className="carousel carousel-dark slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators">
                        {image.map((url, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target={"#carousel" + id}
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 && "true"}
                            aria-label={"Slide " + index + 1}
                          ></button>
                        ))}
                      </div>
                      <div className="carousel-inner">
                        {image.map((url, index) => (
                          <div
                            key={index}
                            className={
                              "carousel-item " + (index === 0 && "active")
                            }
                            data-bs-interval="5000"
                          >
                            <img
                              src={url}
                              className="d-block w-100"
                              style={{
                                height: "20rem",
                              }}
                              alt="..."
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={"#carousel" + id}
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={"#carousel" + id}
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>

                    <div className="reviewsContainer">
                      <span className="reviewsTitle">Reseñas del producto</span>

                      {reviews?.length ? (
                        <div className="reviewList">
                          {reviews?.map((review) => (
                            <div key={review.id} className="reviewContainer">
                              <div className="reviewHeader">
                                <span className="userReviewDetails">
                                  Por {review.user.userName} el{" "}
                                  {review.createdAt.substring(0, 10)}
                                </span>
                                <div className="userRating">
                                  {[...Array(5)].map((item, index) => (
                                    <span
                                      key={index}
                                      className="fa fa-star checked"
                                      style={{
                                        color:
                                          index + 1 <= review.rating
                                            ? "gold"
                                            : "gray",
                                      }}
                                    ></span>
                                  ))}
                                </div>
                              </div>
                              <span className="reviewComment">
                                {review.comment}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span>Este producto aún no tiene reseñas.</span>
                      )}
                    </div>
                  </div>
                  <div
                    className="text-left"
                    style={{ width: "50%", paddingLeft: "5px" }}
                  >
                    <p>
                      <b>Nombre:</b> {name}{" "}
                    </p>
                    <p className="modal__description">
                      <b>Descripcion:</b> {description}
                    </p>
                    <p>
                      <b>Marca:</b> {brand}
                    </p>
                    <p>
                      <b>Precio:</b> ${price}
                    </p>
                    <p>
                      <b>Color:</b> {color}
                    </p>
                    <p>
                      <b>Disponibles:</b> {stock}
                    </p>
                    <p>
                      <b>Garantia:</b>
                      Garantia: {warranty} {warranty > 1 ? "años" : "año"}
                    </p>

                    {navigate.pathname !== "/perfil" ? (
                      <div className="buttonContainer">
                        {stock > 0 ? (
                          <button
                            type="button"
                            className="btn"
                            onClick={addShopping}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-custom-class="custom-tooltip"
                            title="Agregar al Carrito de compras."
                          >
                            <i className="fas fa-cart-plus"></i>
                          </button>
                        ) : (
                          <button className="btn btn-danger" disabled>
                            No Disponible
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn"
                          onClick={addAWish}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-custom-class="custom-tooltip"
                          title="Agregar a la lista de deseos."
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              {navigate.pathname === "/perfil" ? (
                <div className="modal-footer">
                  <button className="btn btn-warning" onClick={handleEdit}>
                    Editar
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={"modalLabel" + id}>
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleEdit}
                ></button>
              </div>
              <div className="modal-body">
                <CreateProducts
                  editDescription={description}
                  editName={name}
                  editPrice={price}
                  editImage={image}
                  editId={id}
                  editColor={color}
                  editBrand={brand}
                  editStock={stock}
                  editWarranty={warranty}
                  editCategory={category}
                  editGenre={genre}
                  editDiscount={discount}
                  isEdit={true}
                />
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
