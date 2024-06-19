import { ImageList,useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import AdvertCard from "./AdvertCard";
import { v4 } from "uuid";

function DisplayAdverts() {
  const adverts = [
    {
      key: v4(),
      title: "Amazing Deals!",
      subtitle: "Shop now and save big!",
      buttonText: "Shop Now",
      imageLink: "https://picsum.photos/200/300",
      goto: () => console.log("Clicked advert 1"),
    },
    {
      key: v4(),
      title: "New Arrivals!",
      subtitle: "Discover the latest products",
      buttonText: "Explore",
      imageLink: "https://picsum.photos/300/300",
      goto: () => console.log("Clicked advert 2"),
    },
    {
      key: v4(),
      title: "Amazing Deals!",
      subtitle: "Shop now and save big!",
      buttonText: "Shop Now",
      imageLink: "https://picsum.photos/200/300",
      goto: () => console.log("Clicked advert 1"),
    },
    {
      key: v4(),
      title: "Amazing Deals!",
      subtitle: "Shop now and save big!",
      buttonText: "Shop Now",
      imageLink: "https://picsum.photos/200/300",
      goto: () => console.log("Clicked advert 1"),
    },
    {
      title: "New Arrivals!",
      subtitle: "Discover the latest products",
      buttonText: "Explore",
      imageLink: "https://picsum.photos/300/300",
      goto: () => console.log("Clicked advert 2"),
    },
    {
      title: "Amazing Deals!",
      subtitle: "Shop now and save big!",
      buttonText: "Shop Now",
      imageLink: "https://picsum.photos/200/300",
      goto: () => console.log("Clicked advert 1"),
    },
  ];
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <ImageList cols={isMatch ? 2:3} rowHeight={"auto"} gap={25} sx={{ margin: isMatch? 1: 15 }}>
      {adverts.map((advert) => (
        <AdvertCard
          key={advert.key}
          title={advert.title}
          subtitle={advert.subtitle}
          buttonText={advert.buttonText}
          goto={advert.goto}
          imageLink={advert.imageLink}
        />
      ))}
    </ImageList>
  );
}

export default DisplayAdverts;
