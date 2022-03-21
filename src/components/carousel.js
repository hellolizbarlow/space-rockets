import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function CustomArrow({ className, style, onClick, side }) {
  const arrowStyle = side === "left" ? {left: 12, zIndex: 1} : {right: 12};
  return (
    <div
      className={className}
      style={{ ...style, ...arrowStyle}}
      onClick={onClick}
    />
  );
}

export default function Carousel({children}) {
  return (
    <Slider 
      adaptiveHeight={true}
      dots={false}
      infinite={true}
      arrows={true}
      lazyLoad="progressive"
      nextArrow={<CustomArrow side="right" />}
      prevArrow={<CustomArrow side="left" />}
    >
      {children}
    </Slider>
  )
}