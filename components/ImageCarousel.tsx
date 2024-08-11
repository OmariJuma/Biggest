"use client"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const getDeviceType = (width: number) => {
  if (width >= 1280) {
    return "desktop";
  } else if (width >= 768) {
    return "tablet";
  } else {
    return "mobile";
  }
};

function ImageCarousel({ slideImages, mainImage }) {
  const [deviceType, setDeviceType] = useState('desktop'); // Default to 'desktop'

  useEffect(() => {
    const updateDeviceType = () => {
      if (typeof window !== 'undefined') {
        setDeviceType(getDeviceType(window.innerWidth));
      }
    };

    updateDeviceType(); // Initialize device type on client-side
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };


  let imageArray = [
    <img
      key="mainImage"
      src={`${mainImage}`}
      alt="Main Image"
      className="w-full" // Tailwind classes for width and aspect ratio
      width={300}
      height={250}
      style={{ objectFit: "scale-down" , aspectRatio:"4/3"}} // Style to cover the image

    />,
  ];

  slideImages.forEach((slide: { image: any; }, i: number) => {
    imageArray.push(
      <div key={`slide-${i}`}>
        <img
          src={`${slide.image}`}
          alt={`Slide Image ${i + 1}`}
          className="w-full" // Tailwind classes for width and aspect ratio
          width={300}
          height={250}
          style={{ objectFit: "scale-down" , aspectRatio:"4/3"}} // Style to cover the image
        />
      </div>
    );
  })

  return (
    <div
      className="carousel-container"
    >
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // Server-side rendering enabled
        infinite={true}
        autoPlay={true} 
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={250}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        deviceType={deviceType}
      >
        {imageArray}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;