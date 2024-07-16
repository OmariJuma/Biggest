"use client"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";

const getDeviceType = (width) => {
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
      src={`${process.env.NEXT_PUBLIC_BACKEND_URI}/public/${mainImage}`}
      alt="Main Image"
      className="w-full" // Tailwind classes for width and aspect ratio
      style={{ objectFit: "scale-down" , aspectRatio:"4/3"}} // Style to cover the image

    />,
  ];

  slideImages.forEach((slide, i) => {
    imageArray.push(
      <div key={`slide-${i}`}>
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URI}/public/${slide.image}`}
          alt={`Slide Image ${i + 1}`}
          className="w-full" // Tailwind classes for width and aspect ratio
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
        autoPlay={deviceType !== 'mobile'} // AutoPlay enabled except for mobile devices
        autoPlaySpeed={10000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
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