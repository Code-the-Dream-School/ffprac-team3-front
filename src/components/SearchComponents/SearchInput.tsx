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
  filters: {
    keyword: string;
    location: Location;
    type: string;
    sex: string;
    age: string;
    breed: string;
    favorite: boolean;
  };
}

const SearchInput: React.FC<SearchInputProps> = ({
  onFilterChange,
  availableStates,
  initialAnimals,
  filters,
}) => {
  const [keyword, setKeyword] = useState(filters.keyword);
  const [location, setLocation] = useState<Location>(filters.location);
  const [type, setType] = useState(filters.type);
  const [sex, setSex] = useState(filters.sex);
  const [age, setAge] = useState(filters.age);
  const [breed, setBreed] = useState(filters.breed);
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the initial location data from filters.location
    const { state, city, zip } = filters.location;
    setLocation({ state: state || "", city: city || "", zip: zip || "" });
  }, [filters.location]);

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
        location: { state: "", city: "", zip: "" },
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

  useEffect(() => {
    // Parse the initial location data from filters.location
    const { state, city, zip } = filters.location;
    setLocation({ state: state || "", city: city || "", zip: zip || "" });
  }, [filters.location]);

  useEffect(() => {
    setKeyword(filters.keyword);
    setLocation(filters.location);
    setType(filters.type);
    setSex(filters.sex);
    setAge(filters.age);
    setBreed(filters.breed);
    setFavorite(filters.favorite);
  }, [filters]);

  
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
