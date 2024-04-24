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
  filters: {
    keyword: string;
    type: string;
    sex: string;
    age: string;
    breed: string;
    location: Location;
    favorite: boolean;
  };
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
  location: Location; // location prop from homepage search
  setPageTitle: React.Dispatch<React.SetStateAction<string>>; // Define setPageTitle prop
}

const SearchInput: React.FC<SearchInputProps> = ({
  filters,
  onFilterChange,
  availableStates,
  initialAnimals,
  initialKeyword,
  setPageTitle,
}) => {
  const [keyword, setKeyword] = useState(
    initialKeyword || filters.keyword || ""
  );
  const [location, setLocation] = useState<Location>(filters.location || "");
  const [type, setType] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "keyword") {
      setKeyword(value);
      onFilterChange({
        keyword: value,
        location,
        type,
        sex,
        age,
        breed,
        favorite,
      });
    } else {
      setLocation((prevLocation) => ({
        ...prevLocation,
        [name]: value, // Dynamically update the location state based on the input name
      }));
      onFilterChange({
        keyword,
        location: {
          ...location,
          [name]: value, // Dynamically update the location state based on the input name
        },
        type,
        sex,
        age,
        breed,
        favorite,
      });
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
    console.log("Clearing Filters...");
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
    navigate("/search", { replace: true }); // Reset URL to default after clearing filters
    setPageTitle(""); // Reset the page title
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
    <Box sx={{ mx: "1rem", mb: "3rem" }}>
      <Stack
        spacing={2}
        sx={{ width: { xs: "80vw", md: "50vw" }, ml: "1rem", pt: "2rem" }}
      >
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
          mt: "1rem",
          ml: "1rem",
          px: "2rem",
          py: ".65rem",
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
        sx={{
          mt: "2rem",
          py: "3rem",
          px: "1.5rem",
          backgroundColor: "#0E2728",
        }}
      >
        <Stack gap={4}>
          <FilterDropdowns
            type={type}
            breed={breed}
            sex={sex}
            age={age}
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
            setPageTitle={setPageTitle}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default SearchInput;
