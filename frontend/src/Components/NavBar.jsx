import React, { useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./Drawer";
import LeftDrawer from "./Drawer";
import RightDrawer from "./Drawer";
const Header = () => {
  const [value, setValue] = useState();
  const pages = ['Home', 'Everything', 'About Us', 'Contact Us'];
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar sx={{ position:"sticky",backgroundColor: "inherit" , color:"inherit"}}>
        <Container sx={{ marginLeft: "auto" }}
        >
        <Toolbar disableGutters>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%",margin: "auto" }}>
                Biggest
              </Typography>
              <RightDrawer />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                {pages.map((page,key)=>(
                  <Tab key={key} label={page} />

                ))}
              </Tabs>
              <Button sx={{ marginLeft: "auto" }} variant="contained">
                Login
              </Button>
              <Button sx={{ marginLeft: "10px" }} variant="contained">
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;