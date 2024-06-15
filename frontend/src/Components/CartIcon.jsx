import React from "react";
import {Badge, 
        IconButton
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function CartIcon() {
  return (
    <IconButton aria-label="cart" color="inherit">
      <Badge
        badgeContent={1}
        invisible={false}
        sx={{ backgroundColor: "inherit" }}
      >
        <ShoppingCartIcon color="inherit" />
      </Badge>
    </IconButton>
  );
}
export default CartIcon;
