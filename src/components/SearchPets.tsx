import React, { useState, useEffect } from "react";
import PetCard from "./shared/PetCard";
import initialAnimals from "./shared/PetData";
import { Grid, Stack } from "@mui/material";
import SearchInput from "./shared/SearchInput";

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
}

export const SearchPets = () => {
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [filteredAnimals, setFilteredAnimals] =
    useState<Animal[]>(initialAnimals);
  const [filters, setFilters] = useState<{
    keyword: string;
    type: string;
    sex: string;
    age: string;
    location: Location;
  }>({
    keyword: "",
    type: "",
    sex: "",
    age: "",
    location: {
      state: "",
      city: "",
      zip: "",
    },
  });

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    const filtered = animals.filter((animal) => {
      const { keyword, type, sex, age, location } = filters;
      const nameAndTypeMatches =
        animal.name.toLowerCase().includes(keyword.toLowerCase()) ||
        animal.type.toLowerCase().includes(keyword.toLowerCase());
      const typeFilterMatches =
        !type || animal.type.toLowerCase() === type.toLowerCase();
      const sexMatches = !sex || animal.sex.toLowerCase() === sex.toLowerCase();
      const ageMatches = !age || animal.age.toLowerCase() === age.toLowerCase();
      const locationMatches =
        (!location.state ||
          animal.location.state
            .toLowerCase()
            .includes(location.state.toLowerCase())) &&
        (!location.city ||
          animal.location.city
            .toLowerCase()
            .includes(location.city.toLowerCase())) &&
        (!location.zip ||
          animal.location.zip
            .toLowerCase()
            .includes(location.zip.toLowerCase()));
      return (
        nameAndTypeMatches &&
        typeFilterMatches &&
        sexMatches &&
        ageMatches &&
        locationMatches
      );
    });
    setFilteredAnimals(filtered);
  };

  const handleFilterChange = (filters: {
    keyword: string;
    type: string;
    sex: string;
    age: string;
    location: Location;
  }) => {
    setFilters(filters);
  };

  const handleToggleFavorite = (id: number) => {
    const updatedAnimals = animals.map((animal) =>
      animal.id === id ? { ...animal, isFavorite: !animal.isFavorite } : animal
    );
    setAnimals(updatedAnimals);
    setFilteredAnimals(updatedAnimals);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <SearchInput onFilterChange={handleFilterChange} />
      </Grid>
      <Grid item xs={8} md={8}>
        <Stack
          direction="column"
          sx={{
            width: "90%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 3,
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
  );
};
