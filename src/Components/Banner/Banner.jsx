import React from "react";
import "./Banner.css";

import banner1 from "./img/1.webp";
import banner2 from "./img/2.webp";
import banner3 from "./img/3.webp";
import banner4 from "./img/4.webp";
import banner5 from "./img/5.webp";
import banner6 from "./img/6.webp";
import banner7 from "./img/7.webp";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const imagenes = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
    banner7,
  ];
  //   const tamañoPantalla = window.innerWidth;

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings}>
      {imagenes.map((banner, index) => (
        <div className="banner_carrusel" key={index}>
          <img src={banner} alt="banner de ofertas" className="banner" />
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
