import React, { useState, useEffect } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import SearchInput from "./shared/SearchInput";
import initialAnimals from "./shared/PetData/PetData";
import PetCard from "./shared/PetCard";
import { useLocation, useNavigate } from "react-router-dom";
import { parseLocation } from "./shared/utils";

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
  breed: string;
  description: string;
  isFavorite: boolean;
  location: Location;
}
interface SearchPetsProps {
  keyword: string;
  location: string;
}

export const SearchPets: React.FC<SearchPetsProps> = ({
  keyword: propKeyword,
  location: propLocation,
}) => {
  const [pageTitle, setPageTitle] = useState<string>("Search Results"); // State to hold the title
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const initialKeyword = propKeyword || searchParams.get("keyword") || ""; // Define initialKeyword
  const initialLocation = propLocation || searchParams.get("location") || ""; // Define initialLocation

  const [filters, setFilters] = useState<{
    keyword: string;
    type: string;
    sex: string;
    age: string;
    breed: string;
    location: Location;
    favorite: boolean;
  }>({
    keyword: propKeyword || "",
    type: "",
    sex: "",
    age: "",
    breed: "",
    location: parseLocation(propLocation || ""),
    favorite: searchParams.get("favorites") === "true",
  });

  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [filteredAnimals, setFilteredAnimals] =
    useState<Animal[]>(initialAnimals);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [noResults, setNoResults] = useState(false); // State to track if no results found
  const navigate = useNavigate();

  // Function to handle changes in filter values
  const handleFilterChange = (newFilters: {
    keyword: string;
    type: string;
    sex: string;
    age: string;
    breed: string;
    location: Location;
    favorite: boolean;
  }) => {
    setFilters(newFilters);
  };

  // Function to filter animals based on the current filters
  const applyFilters = (animalsToFilter: Animal[] = animals): Animal[] => {
    const { keyword, type, sex, age, breed, location, favorite } = filters;

    const filtered = animalsToFilter.filter((animal) => {
      // Check if the keyword represents a location
      const isLocationKeyword =
        location.city.toLowerCase() === keyword.toLowerCase() ||
        location.state.toLowerCase() === keyword.toLowerCase() ||
        location.zip.toLowerCase() === keyword.toLowerCase();

      // Check if animal matches all filter criteria
      const nameAndTypeMatches =
        animal.name.toLowerCase().includes(keyword.toLowerCase()) ||
        animal.type.toLowerCase().includes(keyword.toLowerCase()) ||
        animal.type
          .toLowerCase()
          .includes(pluralizeKeyword(keyword).toLowerCase());

      const typeFilterMatches =
        !type || animal.type.toLowerCase() === type.toLowerCase();
      const sexMatches = !sex || animal.sex.toLowerCase() === sex.toLowerCase();
      const ageMatches = !age || checkAgeGroup(animal, age);
      const breedMatches =
        !breed || animal.breed.toLowerCase() === breed.toLowerCase();

      const locationMatches =
        // Check if location is not empty before filtering
        (!location.state ||
          animal.location.state.toLowerCase() ===
            location.state.toLowerCase()) &&
        (!location.city ||
          animal.location.city.toLowerCase() === location.city.toLowerCase()) &&
        (!location.zip ||
          animal.location.zip.toLowerCase() === location.zip.toLowerCase());

      const favoriteMatches = !favorite || animal.isFavorite === true;

      return (
        (isLocationKeyword || nameAndTypeMatches) &&
        typeFilterMatches &&
        sexMatches &&
        ageMatches &&
        breedMatches &&
        locationMatches &&
        favoriteMatches
      );
    });

    // Set filtered animals and available states
    setFilteredAnimals(filtered);
    const states = [
      ...new Set(filtered.map((animal) => animal.location.state)),
    ];
    setAvailableStates(states.filter(Boolean)); // Filter out undefined values
    setNoResults(filtered.length === 0);

    return filtered;
  };

  // Function to update the location state immutably
  const updateLocation = (newLocation: Location) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: {
        ...prevFilters.location,
        ...newLocation,
      },
    }));
  };

  // Function to check if the animal's age matches the selected age group
  const checkAgeGroup = (animal: Animal, selectedAgeGroup: string) => {
    const age = parseFloat(animal.age);
    switch (selectedAgeGroup) {
      case "Young":
        return age >= 0 && age <= 1;
      case "Adult":
        return age >= 2 && age <= 5;
      case "Senior":
        return age > 5;
      default:
        return true; // Return true by default if no age group is selected
    }
  };

  // Function to toggle favorite status of an animal
  const handleToggleFavorite = (id: number) => {
    const updatedAnimals = animals.map((animal) =>
      animal.id === id ? { ...animal, isFavorite: !animal.isFavorite } : animal
    );
    setAnimals(updatedAnimals);

    // Update filtered animals based on the current filters
    const filtered = applyFilters(updatedAnimals);
    setFilteredAnimals(filtered);
  };

  // Function to pluralize search keyword
  const pluralizeKeyword = (keyword: string): string => {
    if (keyword.endsWith("s")) {
      return keyword; // Keep plural form if it's already plural
    }
    return `${keyword}s`; // Add "s" to make it plural
  };

  // Function to update the title based on user input
  const updateTitle = () => {
    let title = "Search Results"; // Default title
    if (filters.keyword) {
      const pluralizedKeyword = pluralizeKeyword(filters.keyword);
      title = `${pluralizedKeyword}`; // Customize title based on pluralized keyword
    }
    // Update title if the favorite filter is selected
    if (filters.favorite) {
      title = "Viewing Favorites";
    }
    setPageTitle(title);
  };

  useEffect(() => {
    applyFilters();
    updateTitle(); // Call the function to update title whenever filters change
    setLoading(false); // Set loading to false after filtering
  }, [filters, animals]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: propKeyword || "",
      location: parseLocation(propLocation || ""),
    }));
  }, [propKeyword, propLocation]);

  useEffect(() => {}, [filters.favorite, navigate, searchParams]);

  return (
    <Box component="form">
      {loading ? (
        <Typography variant="h3" align="center" gutterBottom>
          Loading...
        </Typography>
      ) : (
        <>
          <Typography variant="h3" align="center" gutterBottom>
            {filters.keyword &&
              !filters.favorite &&
              `Search Results for "${pageTitle}"`}
            {filters.favorite && !filters.keyword && "Viewing Favorites"}
          </Typography>

          <Grid container>
            <Grid item xs={12} md={4}>
              <SearchInput
                onFilterChange={handleFilterChange}
                availableStates={availableStates}
                initialAnimals={initialAnimals}
                initialKeyword={initialKeyword}
                initialLocation={initialLocation}
              />
            </Grid>
            <Grid item xs={10} md={8}>
              <Stack
                direction="column"
                sx={{
                  width: "90%",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: 2,
                  p: 4,
                  marginTop: "4rem",
                }}
              >
                {filteredAnimals.map((animal) => (
                  <PetCard
                    key={animal.id}
                    animal={animal}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};
