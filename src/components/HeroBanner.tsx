import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Grid, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

interface Location {
  state: string;
  city: string;
  zip: string;
}

export const HeroBanner: React.FC = () => {
  const [searchPets, setSearchPets] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value.toLowerCase());
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleButtonClick = () => {
    let searchQuery = "";

    // Handle keyword
    if (keyword.trim()) {
      searchQuery += `keyword=${encodeURIComponent(
        pluralizeSingularKeyword(keyword)
      )}&`;
    }

    // Handle location
    if (location.trim()) {
      const locationParts = location.split(",").map((part) => part.trim());
      const newLocation: any = { state: "", city: "", zip: "" };
      locationParts.forEach((part) => {
        if (/^[a-zA-Z]{2}$/.test(part)) {
          newLocation.state = part;
        } else if (/^\d{5}$/.test(part)) {
          newLocation.zip = part;
        } else {
          newLocation.city += part + " ";
        }
      });

      newLocation.city = newLocation.city.trim();

      // Add separate query parameters for state, city, and zip
      if (newLocation.state) {
        searchQuery += `state=${encodeURIComponent(newLocation.state)}&`;
      }
      if (newLocation.city) {
        searchQuery += `city=${encodeURIComponent(newLocation.city)}&`;
      }
      if (newLocation.zip) {
        searchQuery += `zip=${encodeURIComponent(newLocation.zip)}&`;
      }
    }

    // Remove trailing "&" if it exists
    searchQuery = searchQuery.replace(/&$/, "");
    console.log("Search query:", searchQuery);

    // Navigate to the search page with the constructed query string
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  useEffect(() => {
    if (searchPets) {
      window.location.href = "/search";
      console.log("Button clicked!");
    }
  }, [searchPets]);

  const handleSearchPets = () => {
    setSearchPets(true);
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
              onClick={handleSearchPets}
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
