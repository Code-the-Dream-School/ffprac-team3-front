import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Menu,
  MenuItem,
  Link,
  MenuList,
  Typography,
} from "@mui/material";
import { PetLogoIcon } from "../img/icons/PetLogoIcon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
    const storedUserName = localStorage.getItem("firstName");

    if (jwtToken) {
      setIsLoggedIn(true);
      setUserName(storedUserName || "");
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [isLoggedIn]);

  const handleAccountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    localStorage.clear();
    window.location.href = "/";
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
            <>
              {isLoggedIn && (
                <IconButton
                  id="favorites"
                  color="inherit"
                  onClick={(event) => {
                    navigate("/search?favorites=true");
                  }}
                  sx={{
                    "&:hover": {
                      color: "#F8AF3F",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              )}
            </>
            <Divider
              color="#F8AF3F"
              orientation="vertical"
              variant="middle"
              flexItem
            />

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
              <AccountCircleIcon sx={{ pr: ".5rem" }} />
              {/* {/* Display user's name if logged in */}
              {isLoggedIn && (
                <Typography variant="overline">{userName}</Typography>
              )}
              <KeyboardArrowDownIcon />
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
              {/* Render only if not logged in */}
              {!isLoggedIn && (
                <MenuItem onClick={handleClose}>
                  <Link href="/login" underline="none">
                    Login
                  </Link>
                </MenuItem>
              )}

              {/* These options will be hidden when logged out */}

              {isLoggedIn && (
                <MenuItem onClick={handleClose}>
                  <Link href="/profile" color="#0E2728" underline="none">
                    Profile
                  </Link>
                </MenuItem>
              )}

              {isLoggedIn && (
                <MenuItem onClick={handleClose}>
                  <Link
                    href="/profile/#settings"
                    color="#0E2728"
                    underline="none"
                  >
                    Account Settings
                  </Link>
                </MenuItem>
              )}

              {isLoggedIn && <Divider />}

              {isLoggedIn && (
                <MenuItem onClick={handleLogOut}>
                  <Link color="#0E2728" underline="none">
                    Logout
                  </Link>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
