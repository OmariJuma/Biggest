import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import BaskingLady from "../assets/baskingGirl.jpg";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

export default function ImageContainer() {
  const theme = useTheme();
  return (
    <ImageListItem>
      <ImageListItemBar
        title={
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: 20, sm: 30, md: 40 },
              color: "white",
              overflow: "visible",
              whiteSpace: "normal",
            }}
          >
            Raining Offers For You
          </Typography>
        }
        subtitle={
          <div>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: 15, sm: 25, md: 30 },
                color: "white",
                overflow: "visible",
                whiteSpace: "normal",
              }}
            >
              Amazing Discounts on most items
            </Typography>
            <Button
              variant="text"
              color="success"
              style={{ backgroundColor: "white" }}
            >
              Start Shopping
            </Button>
          </div>
        }
        sx={{
          position: "absolute",
          top: { xs: "10%", sm: "5%", md: 0 },
          left: { xs: 0, sm: 0, md: "15%", lg: "20%" },
          background: "none",
        }}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={`info about breakfast`}
          >
            <InfoIcon />
          </IconButton>
        }
      />
      <img
        src={BaskingLady}
        alt={"lady basking in the sun"}
        style={{ aspectRatio: "inherit" }}
        loading="lazy"
      />
    </ImageListItem>
  );
}
