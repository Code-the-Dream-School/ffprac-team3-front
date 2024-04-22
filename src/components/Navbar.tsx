import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Button,
  Menu,
  MenuItem,
  Link,
  MenuList,
} from "@mui/material";
import { PetLogoIcon } from "../img/PetLogoIcon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { loginUser } from "../util/index";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userName, setUserName] = useState(""); // State to store the user's name
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking if jwtToken exists in localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    const storedUserName = localStorage.getItem("userName");
    if (jwtToken) {
      setIsLoggedIn(true);
      setUserName(storedUserName || "");
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const handleAccountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);

    try {
      // Call the loginUser function to check if the user is logged in
      const response = await loginUser(loginUser);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#506c60",
          borderColor: "none",
          color: "#f7f4f0",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="logo"
            href="/"
            sx={{
              height: "1rem",
              "&:hover": {
                backgroundColor: "none",
              },
            }}
          >
            <PetLogoIcon
              sx={{
                fontSize: "7rem",
              }}
            />
          </IconButton>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ flexGrow: 1 }}
          >
            {/* {isLoggedIn && ( // Render only if logged in */}
              <>
                <IconButton
                  id="favorites"
                  color="inherit"
                  href="/search?favorites=true"
                  sx={{
                    "&:hover": {
                      color: "#F8AF3F",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <FavoriteIcon />
                </IconButton>

                <Divider
                  color="#F8AF3F"
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
              </>
            {/* )} */}

            <IconButton
              color="inherit"
              id="account-button"
              onClick={handleAccountClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{
                "&:hover": {
                  color: "#F8AF3F",
                  backgroundColor: "transparent",
                },
              }}
            >
              <AccountCircleIcon />
              <KeyboardArrowDownIcon />

              {/* {/* Display user's name if logged in */}
              {/* {isLoggedIn && <span>{userName}</span>} */}
            </IconButton>
          </Stack>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
              "aria-labelledby": "account-button",
            }}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuList dense>
              {/* {!isLoggedIn && ( // Render only if not logged in */}
                <MenuItem onClick={handleClose}>
                  <Link href="/login" underline="none">
                    Login
                  </Link>
                </MenuItem>
              {/* )} */}

              {/* These options will be hidden when logged out */}
              {/* {isLoggedIn && ( // Render only if logged in */}
                <>
                  <MenuItem onClick={handleClose}>
                    <Link href="/profile" color="#0E2728" underline="none">
                      Profile
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <Link href="/settings" color="#0E2728" underline="none">
                      Account Settings
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Link href="/logout" color="#0E2728" underline="none">
                      Logout
                    </Link>
                  </MenuItem>
                </>
              {/* )} */}
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
