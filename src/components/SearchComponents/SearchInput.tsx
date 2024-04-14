import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Card } from "@mui/material";
import Alert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";
import FilterDropdowns from "./FilterDropdowns";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

interface Location {
  state: string;
  city: string;
  zip: string;
}
interface Animal {
  id: number;
  type: string;
  age: string;
  sex: string;
  name: string;
  description: string;
  isFavorite: boolean;
  location: Location;
  breed: string;
}
interface SearchInputProps {
  onFilterChange: (filters: {
    keyword: string;
    location: Location;
    type: string;
    sex: string;
    age: string;
    breed: string;
    favorite: boolean;
  }) => void;
  availableStates: string[];
  initialAnimals: Animal[];
  initialKeyword: string; //  initialKeyword prop from homepage search
  initialLocation: string; // initialLocation prop from homepage search
}

const SearchInput: React.FC<SearchInputProps> = ({
  onFilterChange,
  availableStates,
  initialAnimals,
  initialKeyword,
  initialLocation,
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState<Location>({
    state: "",
    city: "",
    zip: "",
  });
  const [type, setType] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Split initialLocation and map each item to trim leading/trailing whitespaces
    const locationParts = initialLocation.split(",").map((part) => part.trim());
    // Create a copy of the current location state
    const newLocation = { ...location };
    // Iterate over each location part and update the corresponding property in the location state
    locationParts.forEach((part) => {
      // Check format of a state abbreviation
      if (/^[a-zA-Z]{2}$/.test(part)) {
        newLocation.state = part;
      }
      // Check format of a ZIP code
      else if (/^\d{5}$/.test(part)) {
        newLocation.zip = part;
      }
      // Assume it's part of the city
      else {
        newLocation.city += part + " ";
      }
    });
    // Trim any trailing whitespaces from the city
    newLocation.city = newLocation.city.trim();
    // Update the location state with the new values
    setLocation(newLocation);
  }, [initialLocation]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "keyword") {
      setKeyword(value);
    } else {
      setLocation((prevLocation) => ({
        ...prevLocation,
        [name]: value, // Dynamically update the location state based on the input name
      }));
    }
  };

  const handleBreedChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setBreed(value);
  };

  const handleFavoriteChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value === "true";
    setFavorite(value);
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string>,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { name, value } = event.target;
    setFunction(value);
    if (name === "age") {
      onFilterChange({
        keyword,
        location,
        type,
        sex,
        age: value,
        breed,
        favorite,
      });
    }
  };

  const clearFilters = () => {
    setKeyword("");
    setLocation({ state: "", city: "", zip: "" });
    setType("");
    setSex("");
    setAge("");
    setBreed("");
    setFavorite(false);
    onFilterChange({
      keyword: "",
      location: { state: "", city: "", zip: "" },
      type: "",
      sex: "",
      age: "",
      breed: "",
      favorite: false,
    });
    navigate("/search"); // Reset URL to default after clearing filters
  };

  useEffect(() => {
    onFilterChange({
      keyword,
      location,
      type,
      sex,
      age,
      breed,
      favorite,
    });
  }, [keyword, location, type, sex, age, breed, favorite]);

  return (
    <Box sx={{ mx: "1rem" }}>
      <Stack spacing={2} sx={{ ml: "1rem", pt: "2rem" }}>
        <TextField
          variant="outlined"
          id="search-by-keyword"
          name="keyword"
          label="Search by Keyword"
          fullWidth
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
      </Stack>

      <Button
        variant="contained"
        size="small"
        onClick={clearFilters}
        aria-label="Clear Filters"
        sx={{
          mt: 2,
          ml: "1rem",
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

      <Card
        sx={{ marginTop: "2rem", py: 5, px: 3, backgroundColor: "#0E2728" }}
      >
        <Stack gap={3}>
          <FilterDropdowns
            type={type}
            sex={sex}
            age={age}
            breed={breed}
            location={location}
            favorite={favorite}
            handleTypeChange={(event) => handleSelectChange(event, setType)}
            handleSexChange={(event) => handleSelectChange(event, setSex)}
            handleAgeChange={(event) => handleSelectChange(event, setAge)}
            handleBreedChange={handleBreedChange}
            handleFavoriteChange={handleFavoriteChange}
            handleClearFilters={clearFilters}
            setLocation={setLocation}
            availableStates={availableStates}
            initialAnimals={initialAnimals}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default SearchInput;
