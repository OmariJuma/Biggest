import * as React from "react";
import Box from "@mui/material/Box";
import {Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,   
}from "@mui/material/";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function RightDrawer() {
    const pages = ['Home', 'Everything', 'About Us', 'Contact Us'];
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
      <React.Fragment>
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          sx={{mr:1}}
        >
          <List>
            {pages.map((page, index) => (
              <ListItemButton key={index}>
                <ListItemIcon>
                  <ListItemText sx={{color:"inherit"}}>{page}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <IconButton
          sx={{ color: "inherit"}}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon color="inherit" />
        </IconButton>
      </React.Fragment>
  );
}
