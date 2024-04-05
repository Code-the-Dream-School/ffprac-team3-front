import React, { useState, useEffect } from "react";
import { Box, IconButton, Button, Stack, TextField, Card } from "@mui/material";
import Alert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";
import FilterDropdowns from "./FilterDropdowns";
import { SelectChangeEvent } from "@mui/material/Select";

interface Location {
  state: string;
  city: string;
  zip: string;
}

interface SearchInputProps {
  onFilterChange: (filters: {
    keyword: string;
    location: Location;
    type: string;
    sex: string;
    age: string;
  }) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState<Location>({
    state: "",
    city: "",
    zip: "",
  });
  const [type, setType] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    onFilterChange({
      keyword,
      location,
      type,
      sex,
      age,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "keyword") {
      setKeyword(value);
    } else if (name === "location") {
      setLocation((prevLocation) => ({
        ...prevLocation,
        [name]: value,
      }));
    }
  };

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      city: value,
    }));
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = event.target;
    setFunction(value);
  };

  const clearFilters = () => {
    setKeyword("");
    setLocation({ state: "", city: "", zip: "" });
    setType("");
    setSex("");
    setAge("");
    onFilterChange({
      keyword: "",
      location: { state: "", city: "", zip: "" },
      type: "",
      sex: "",
      age: "",
    });
  };

  useEffect(() => {
    onFilterChange({
      keyword,
      location,
      type,
      sex,
      age,
    });
  }, [keyword, location, type, sex, age, onFilterChange]);

  return (
    <Box component="form">
      <Stack spacing={4} sx={{ pt: "2rem" }}>
        {/* <Stack spacing={2} direction="row"> */}
        <TextField
          variant="outlined"
          id="search-by-keyword"
          name="keyword"
          label="Search by Keyword"
          value={keyword}
          onChange={handleInputChange}
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

        {/* SEARCH BY LOCATION - Not working at the moment
        <TextField
            variant="outlined"
            id="search-by-location"
            name="location"
            label="Enter City, State, or ZIP"
            value={location.city || location.state || location.zip}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <SearchIcon
                  sx={{
                    color: "#506C60",
                  }}
                />
              ),
            }}
          /> */}

        {/* <IconButton
            type="submit"
            aria-label="Search"
            sx={{
              color: "#F8AF3F",
              backgroundColor: "transparent",
              "&:hover": {
                color: "#EE633E",
                backgroundColor: "transparent",
              },
            }}
          >
            <SearchIcon />
          </IconButton> */}
        {/* </Stack> */}
      </Stack>
      <Button
        variant="contained"
        size="small"
        onClick={clearFilters}
        aria-label="Clear Filters"
        sx={{
          mt: 2,
          px: 3,
          py: 1,
          alignSelf: "center",
          fontWeight: 500,
          color: "#F7F4F0",
          backgroundColor: "#EE633E",
          "&:hover": {
            backgroundColor: "#F8AF3F",
          },
        }}
      >
        New Search
      </Button>

      <Card sx={{ marginTop: "2rem", p: 2, backgroundColor: "#0E2728" }}>
        <Stack gap={2}>
          <FilterDropdowns
            type={type}
            sex={sex}
            age={age}
            location={location}
            handleTypeChange={(event) => handleSelectChange(event, setType)}
            handleSexChange={(event) => handleSelectChange(event, setSex)}
            handleAgeChange={(event) => handleSelectChange(event, setAge)}
            handleLocationChange={handleLocationChange}
            handleClearFilters={clearFilters}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default SearchInput;
