import React, { useState, useEffect } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import SearchInput from "./SearchInput";
import PetCard from "../PetComponents/PetCard";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPetData } from "../../util/index.js";
import { ObjectId } from 'mongodb';
import  getBreedListByType from '../../components/PetComponents/PetData/PetData.js'
import CircularProgress from "@mui/material/CircularProgress";


interface Location {
  state: string;
  city: string;
  zip: string;
}

interface Animal {
  _id: ObjectId;
  type: string;
  breed: string;
  age: string;
  sex: string;
  name: string;
  description: string;
  isFavorite: boolean;
  fileImages: FileImages;
  location: Location; 
}

interface FileImages {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  id: ObjectId;
  filename: string;
  metadata: null;
  bucketName: string;
  chunkSize: number;
  size: number;
  uploadDate: Date;
  contentType: string;
}

interface SearchPetsProps {
  keyword: string;
}

export const SearchPets: React.FC<SearchPetsProps> = () => {
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState<string>("Search Results"); // State to hold the title
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] =
    useState<Animal[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [noResults, setNoResults] = useState(false); // State to track if no results found
  const navigate = useNavigate();

  useEffect(() => {
    const fetchingData = async () => {
      const response = await getAllPetData();
      const animalData = response.data.petData.map((animal) => ({
        ...animal,
        breed: getBreedListByType(animal.type).includes(animal.breed)
          ? animal.breed
          : "", // If the breed is not found in the breed list, set it to an empty string
      }));
      setAnimals(animalData);
      setFilteredAnimals(animalData)
    };

    fetchingData(); 
  }, []); 

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const initialKeyword = searchParams.get("keyword") || "";
  const location: Location = {
    state: searchParams.get("state") || "",
    city: searchParams.get("city") || "",
    zip: searchParams.get("zip") || "",
  };

  const [filters, setFilters] = useState<{
    keyword: string;
    type: string;
    sex: string;
    age: string;
    breed: string;
    location: Location;
    favorite: boolean;
  }>({
    keyword: initialKeyword,
    type: "",
    sex: "",
    age: "",
    breed: "",
    location: location,
    favorite: searchParams.get("favorites") === "true",
  });

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
    // Check if any new filters are active
    const filtersActive =
      newFilters.keyword ||
      newFilters.type ||
      newFilters.sex ||
      newFilters.age ||
      newFilters.breed ||
      newFilters.location.city ||
      newFilters.location.state ||
      newFilters.location.zip ||
      newFilters.favorite;

    // Check if filters are different from current and if any filter is active
    if (
      filtersActive &&
      JSON.stringify(newFilters) !== JSON.stringify(filters)
    ) {
      setFilters(newFilters);
      updateUrl(newFilters); // Call to update URL with new filters

      // Apply filters and update filtered animals
      const filtered = applyFilters(); // Apply filters to animal list
      setFilteredAnimals(filtered); // Update the filtered animals state
      updateTitle(); // Update the page title
    } else {
      // Reset animals when filters are cleared or new search is performed
      setPageTitle("");
      if (!filtersActive) {
        // Update filtered animals only if there are active filters
        setFilteredAnimals(animals);
        // Clear the URL when filters are cleared
        navigate("/search", { replace: true });
      }
      updateTitle(); // Call to update title, clearing it
    }
    setPageTitle("");
  };

  // Function to pluralize the keyword if more than one matching animal
  const pluralizeKeyword = (keyword: string, count: number): string => {
    return count === 1 ? keyword : `${keyword}s`;
  };

  // Function to update the title based on user input
  const updateTitle = () => {
    let title = ""; // Default title

    // Check if no results found
    if (noResults && !loading) {
      title = "Sorry, no results found";
    } else if (filters.keyword && !loading) {
      // Check if the keyword matches any animal type
      const matchingAnimals = filteredAnimals.filter(
        (animal) => animal.type.toLowerCase() === filters.keyword.toLowerCase()
      );
      if (matchingAnimals.length > 0) {
        if (matchingAnimals.length > 1) {
          title = pluralizeKeyword(filters.keyword, matchingAnimals.length); // Pluralize the keyword if more than one matching animal
        } else {
          title = filters.keyword; // Use the keyword as it is if only one matching animal
        }
      }
    }

    // Update title if the favorite filter is selected
    if (filters.favorite) {
      title = "Viewing Favorites";
    }

    // Reset title to "Search Results" if no keyword and favorite filter is not active
    if (!filters.keyword && !filters.favorite) {
      setPageTitle(title);
    }

    // Append active filters to the title when viewing favorites
    if (filters.favorite) {
      const activeFilters = Object.entries(filters)
        .filter(([key, value]) => key !== "favorite" && value !== "")
        .map(([key, value]) => `${key}: ${value}`);
      if (activeFilters.length > 0) {
        title = `${title} (${activeFilters.join(", ")})`;
      }
    }

    setPageTitle(title);
  };

  const updateUrl = (newFilters: {
    keyword: string;
    type: string;
    sex: string;
    age: string;
    breed: string;
    location: Location;
    favorite: boolean;
  }) => {
    const params = new URLSearchParams();
    if (newFilters.keyword) params.set("keyword", newFilters.keyword);
    if (newFilters.type) params.set("type", newFilters.type);
    if (newFilters.sex) params.set("sex", newFilters.sex);
    if (newFilters.age) params.set("age", newFilters.age);
    if (newFilters.breed) params.set("breed", newFilters.breed);
    if (newFilters.location.city) params.set("city", newFilters.location.city);
    if (newFilters.location.state)
      params.set("state", newFilters.location.state);
    if (newFilters.location.zip) params.set("zip", newFilters.location.zip);
    if (newFilters.favorite)
      params.set("favorites", newFilters.favorite.toString());
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Function to filter animals based on the current filters
  const applyFilters = (animalsToFilter: Animal[] = animals): Animal[] => {
    const { keyword, type, sex, age, breed, location, favorite } = filters;

    const filtered = animalsToFilter.filter((animal) => {
      // Check if the keyword represents a location
      const isLocationKeyword =
        location.city.toLowerCase() === keyword.toLowerCase() ||
        location.state.toLowerCase() === keyword.toUpperCase() ||
        location.zip.toLowerCase() === keyword.toLowerCase();
      // console.log("Location:", location);

      // Check if animal matches all filter criteria
      const nameAndTypeMatches =
        animal.name.toLowerCase().includes(keyword.toLowerCase()) ||
        animal.type.toLowerCase().includes(keyword.toLowerCase());
      // console.log("Keyword:", animal);

      const typeFilterMatches =
        !type || animal.type.toLowerCase() === type.toLowerCase();
      const sexMatches = !sex || animal.sex.toLowerCase() === sex.toLowerCase();
      const ageMatches = !age || checkAgeGroup(animal, age);
      const breedMatches =
        !breed || animal.breed.toLowerCase() === breed.toLowerCase();

      const locationMatches =
        // Check if location is not empty before filtering
        (!location.city ||
          animal.location.city
            .toLowerCase()
            .includes(location.city.toLowerCase())) &&
        (!location.state ||
          animal.location.state
            .toLowerCase()
            .includes(location.state.toLowerCase())) &&
        (!location.zip ||
          animal.location.zip
            .toLowerCase()
            .includes(location.zip.toLowerCase()));
      console.log("Location Matches:", locationMatches);

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
  const handleToggleFavorite = (_id: ObjectId) => {
    const updatedAnimals = animals.map((animal) =>
      animal._id === _id ? { ...animal, isFavorite: !animal.isFavorite } : animal
    );
    setAnimals(updatedAnimals);

    // Update filtered animals based on the current filters
    const filtered = applyFilters(updatedAnimals);
    setFilteredAnimals(filtered);
  };

  useEffect(() => {
    applyFilters();
    updateTitle(); // Call the function to update title whenever filters change
    setLoading(false); // Set loading to false after filtering
    console.log("Filters State:", filters);
  }, [filters]);

  return (
    <Box component="form" sx={{ mt: "5rem" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "78vh",
          }}
        >
          <CircularProgress
            disableShrink
            sx={{
              color: "#EE633E",
            }}
          />
        </Box>
      ) : (
        <>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              mt: "3rem",
            }}
          >
            {noResults && pageTitle !== ""
              ? pageTitle // Display pageTitle directly when noResults is true
              : filters.keyword && !filters.favorite && pageTitle !== ""
              ? `Search Results for "${pageTitle}"`
              : filters.favorite && !filters.keyword && pageTitle !== ""
              ? "Viewing Favorites"
              : ""}
          </Typography>

          <Grid container>
            <Grid item xs={12} md={3} lg={3}>
              <SearchInput
                filters={filters}
                onFilterChange={handleFilterChange}
                availableStates={availableStates}
                animals={animals}
                initialKeyword={initialKeyword}
                location={location}
                setPageTitle={setPageTitle}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Stack
                direction="column"
                sx={{
                  width: "auto",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: 3,
                  px: "5rem",
                  mt: "4rem",
                  mb: "4rem",
                }}
              >
                {filteredAnimals?.map((animal) => (
                  <PetCard
                    key={parseInt(animal._id.toString(), 16)}
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
