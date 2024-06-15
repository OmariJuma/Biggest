import React, { useState } from "react";
import {
  AppBar,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RightDrawer from "./Drawer";
import CartIcon from "./CartIcon";
import PersonIcon from "@mui/icons-material/Person";
const Header = () => {
  const [pageValue, setPageValue] = useState();
  const [subpageValue, setSubpageValue] = useState();
  const pages = ["Home", "Everything"];
  const subPages = ["About Us", "Contact Us"];
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar
        sx={{
          position: "sticky",
          backgroundColor: "inherit",
          color: "inherit",
        }}
      >
        <Container>
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
            disableGutters
          >
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                fontFamily: "Times New Roman",
              }}
            >
              Biggest
            </Typography>

            {isMatch ? (
              <></>
            ) : (
              <>
                <Tabs
                  indicatorColor="secondary"
                  textColor="black"
                  value={pageValue}
                  onChange={(e, value) => setPageValue(value)}
                >
                  {pages.map((page, key) => (
                    <Tab key={key} label={page} />
                  ))}
                </Tabs>
              </>
            )}
            {isMatch ? (
              <>
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginRight: "10px",
                  }}
                >
                  <CartIcon />
                  <PersonIcon />
                </div>

                <RightDrawer />
              </>
            ) : (
              <>
                <Tabs
                  sx={{ marginLeft: "auto" }}
                  indicatorColor="secondary"
                  textColor="black"
                  value={subpageValue}
                  onChange={(e, value) => setSubpageValue(value)}
                >
                  {subPages.map((page, key) => (
                    <Tab key={key} label={page} />
                  ))}
                </Tabs>
                <CartIcon />
                <PersonIcon />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
