import React, { useState } from "react";
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

export const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAccountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: "6rem" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#506c60",
          borderColor: "none",
          color: "#f7f4f0",
        }}
      >
        <Toolbar>
          <Button
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
          </Button>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ flexGrow: 1 }}
          >
            <IconButton
              id="favorites"
              color="inherit"
              href="/favorites"
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
            <>
              <Button
                color="inherit"
                id="account-button"
                onClick={handleAccountClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  "&:hover": {
                    color: "#F8AF3F",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <AccountCircleIcon />
              </Button>
            </>
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
              <MenuItem onClick={handleClose}>
                <Link href="/login" underline="none">
                  Login
                </Link>
              </MenuItem>

              {/* These options will be hidden when logged out */}
              <MenuItem onClick={handleClose}>
                <Link href="/about" color="#0E2728" underline="none">
                  About Me
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/adopter-profile" color="#0E2728" underline="none">
                  Adopter Profile
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
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
