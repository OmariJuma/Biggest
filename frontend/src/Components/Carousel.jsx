import { useState } from "react";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
    goto: "/about-us", 
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
    goto: "/login",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
    goto: "/contact-us", 
  },
];

function Carousel() {
  const [currentImage, setCurrentImage]= useState(0);
  const handleImageClick = (event) => {
    const clickedImage = event.target;
    if (clickedImage.tagName === "IMG") {
      // Navigate to the provided goto link
      window.location.href = images[currentImage].goto;
    }
  };

  return (
    <>        
      <ImageGallery
        items={images}
        autoPlay={true}
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={false}
        showBullets={true}
        onClick={handleImageClick}
        onSlide={(e)=>setCurrentImage(e)}
      />
    </>
  );
}

export default Carousel;
