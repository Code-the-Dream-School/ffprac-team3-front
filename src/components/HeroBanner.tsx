import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { parseLocation } from "./shared/utils";

export const HeroBanner: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleButtonClick = () => {
    let searchQuery = "";
    if (keyword.trim()) {
      searchQuery += `keyword=${encodeURIComponent(
        pluralizeSingularKeyword(keyword)
      )}`;
    }
    if (location.trim()) {
      const parsedLocation = parseLocation(location);
      if (parsedLocation.city || parsedLocation.state || parsedLocation.zip) {
        searchQuery += `&location=${encodeURIComponent(
          parsedLocation.state || parsedLocation.city || parsedLocation.zip
        )}`;
      }
    }
    console.log("Search query:", searchQuery);
    navigate(searchQuery ? `/search?${searchQuery}` : "/search");

    // Reset the search fields
    setKeyword("");
    setLocation("");
  };

  const pluralizeSingularKeyword = (keyword: string): string => {
    if (keyword.endsWith("s")) {
      return keyword.slice(0, -1); // Remove "s" to get singular form
    }
    return keyword;
  };

  const pluralizeKeyword = (keyword: string): string => {
    if (!keyword.endsWith("s")) {
      return keyword + "s"; // Add "s" to make it plural
    }
    return keyword;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignSelf="center"
      color="#0F2117"
      sx={{ my: "4rem", mx: "8rem" }}
    >
      <Box sx={{ my: "1rem" }}>
        <Stack>
          <Typography variant="h1" sx={{ letterSpacing: 1, fontWeight: 600 }}>
            Simplified
          </Typography>
          <Typography
            variant="h1"
            sx={{ letterSpacing: 1, fontWeight: 600, minWidth: 0 }}
            gutterBottom
          >
            Pet Adoption
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} md={7} lg={7}>
            <Typography
              variant="body1"
              component="h6"
              sx={{ mr: 5, whiteSpace: "pre-line" }}
              gutterBottom
            >
              PetPals is an innovative full-stack web application crafted to
              streamline the pet adoption process with finesse. PetPals
              seamlessly connects prospective pet parents with adorable
              adoptable pets, harnessing the power of advanced keyword search
              functionality and customizable location preferences. PetPals is
              dedicated to enhancing the pet adoption journey by centralizing
              crucial pet information, ensuring a smoother and more enjoyable
              experience for all involved.
            </Typography>
          </Grid>

          <Grid item xs={12} md={5} sx={{ mt: 1 }}>
            <Grid item>
              <TextField
                variant="outlined"
                id="search-by-keyword"
                label="Search by Keyword"
                fullWidth
                value={keyword}
                onChange={handleKeywordChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <SearchIcon
                      sx={{
                        color: "#506C60",
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                id="search-by-location"
                label="Enter City, State, or ZIP"
                fullWidth
                value={location}
                onChange={handleLocationChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <SearchIcon
                      sx={{
                        color: "#506C60",
                      }}
                    />
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              href="/search"
              sx={{
                mt: 3,
                py: 2,
                color: "#F7F4F0",
                backgroundColor: "#EE633E",
                "&:hover": {
                  backgroundColor: "#F8AF3F",
                },
              }}
            >
              browse pets
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
