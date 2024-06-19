import {
  ImageListItem,
  ImageListItemBar,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

function AdvertCard({ title, subtitle, imageLink, buttonText, action }) {
  return (
    <ImageListItem>
      <ImageListItemBar
        title={
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "auto", sm: "auto", md: "auto" },
              color: "white",
              overflow: "visible",
              whiteSpace: "normal",
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        }
        subtitle={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: 15, sm: 20, md: 20 },
                color: "white",
                overflow: "visible",
                whiteSpace: "normal",
                textAlign: "center",
              }}
            >
              {subtitle}
            </Typography>

            <Button
              variant="text"
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "10px",
                textTransform: "initial",
                width: "inherit",
                margin: "auto",
              }}
              onClick={action}
            >
              {buttonText}
            </Button>
          </div>
        }
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <img
        srcSet={`${imageLink}?w=248&fit=crop&auto=format`}
        src={`${imageLink}?w=248&fit=crop&auto=format`}
        alt={`${title}`}
        style={{
          height: { xs: "200px", sm: "250px", md: "300px", lg: "350px" },
        }}
      />
    </ImageListItem>
  );
}

export default AdvertCard;
