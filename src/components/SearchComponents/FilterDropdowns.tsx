//FILTERS

import React, { useState, useEffect, useMemo } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Typography,
  Stack,
} from "@mui/material";

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

interface AgeGroup {
  young: Animal[];
  adult: Animal[];
  senior: Animal[];
}

function groupPetsByAge(pets: Animal[]): AgeGroup {
  const ageGroups: AgeGroup = {
    young: [],
    adult: [],
    senior: [],
  };

  pets.forEach((pet) => {
    const age = parseFloat(pet.age);
    if (age >= 0 && age <= 1) {
      ageGroups.young.push(pet);
    } else if (age >= 2 && age <= 5) {
      ageGroups.adult.push(pet);
    } else {
      ageGroups.senior.push(pet);
    }
  });
  return ageGroups;
}

// Define the checkAgeGroup function
const checkAgeGroup = (animal: Animal, age: string): boolean => {
  const ageValue = parseFloat(animal.age);
  switch (age) {
    case "Young":
      return ageValue >= 0 && ageValue <= 1;
    case "Adult":
      return ageValue >= 2 && ageValue <= 5;
    case "Senior":
      return ageValue > 5;
    default:
      return false;
  }
};

interface FilterDropdownsProps {
  type: string;
  sex: string;
  age: string;
  breed: string;
  location: Location;
  favorite: boolean;
  handleTypeChange: (event: SelectChangeEvent<string>) => void;
  handleSexChange: (event: SelectChangeEvent<string>) => void;
  handleBreedChange: (event: SelectChangeEvent<string>) => void;
  handleAgeChange: (
    event: SelectChangeEvent<string>,
    filteredPets: Animal[]
  ) => void;
  handleFavoriteChange: (event: SelectChangeEvent<string>) => void;
  handleClearFilters: () => void;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>; // Add setPageTitle
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  availableStates: string[];
  initialAnimals: Animal[];
}

const FilterDropdowns: React.FC<FilterDropdownsProps> = ({
  type,
  sex,
  age,
  breed,
  location,
  favorite,
  handleTypeChange,
  handleSexChange,
  handleBreedChange,
  handleAgeChange,
  handleFavoriteChange,
  // handleClearFilters,
  setLocation,
  initialAnimals,
}) => {
  const [typeCounts, setTypeCounts] = useState<{ [key: string]: number }>({});
  const [breedCounts, setBreedCounts] = useState<{ [key: string]: number }>({});
  const [sexCounts, setSexCounts] = useState<{ [key: string]: number }>({});
  const [ageCounts, setAgeCounts] = useState<{ [key: string]: number }>({});
  const [stateCounts, setStateCounts] = useState<{ [key: string]: number }>({});
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  // Memoize available states
  const availableStates = useMemo(
    () => [...new Set(initialAnimals.map((animal) => animal.location.state))],
    [initialAnimals]
  );

  // Memoize types and breeds
  const types = useMemo(
    () => [...new Set(initialAnimals.map((animal) => animal.type))],
    [initialAnimals]
  );
  const breeds = useMemo(() => {
    if (!type) return [];
    const typeBreeds = initialAnimals
      .filter((animal) => animal.type === type)
      .map((animal) => animal.breed);
    return [...new Set(typeBreeds)];
  }, [type, initialAnimals]);

  // Memoize filtered animals by type
  const filteredAnimalsByType = useMemo(() => {
    if (!type) return initialAnimals;
    return initialAnimals.filter((animal) => animal.type === type);
  }, [type, initialAnimals]);

  // Memoize age groups
  const ageGroups = useMemo(
    () => groupPetsByAge(initialAnimals),
    [initialAnimals]
  );

  // Memoize filter counts
  useEffect(() => {
    setTypeCounts(
      countFilterOptions(initialAnimals.map((animal) => animal.type))
    );
    setBreedCounts(
      countFilterOptions(initialAnimals.map((animal) => animal.breed))
    );
    setSexCounts(
      countFilterOptions(filteredAnimalsByType.map((animal) => animal.sex))
    );
    setAgeCounts(
      countAgeGroups(filteredAnimalsByType.map((animal) => animal.age))
    );
    setFavoriteCount(
      initialAnimals.filter((animal) => animal.isFavorite).length
    );
    setStateCounts(
      countFilterOptions(initialAnimals.map((animal) => animal.location.state))
    );
  }, [initialAnimals, filteredAnimalsByType]);

  // Function to count occurrences for filter options
  const countFilterOptions = (items: string[]) => {
    return items.reduce((counts: { [key: string]: number }, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});
  };

  // Function to count occurrences for age groups
  const countAgeGroups = (ages: string[]) => {
    return ages.reduce(
      (counts: { [key: string]: number }, age) => {
        const ageValue = parseFloat(age);
        if (ageValue >= 0 && ageValue <= 1) {
          counts["Young"] = (counts["Young"] || 0) + 1;
        } else if (ageValue >= 2 && ageValue <= 5) {
          counts["Adult"] = (counts["Adult"] || 0) + 1;
        } else {
          counts["Senior"] = (counts["Senior"] || 0) + 1;
        }
        return counts;
      },
      { Young: 0, Adult: 0, Senior: 0 }
    );
  };

  // Function to handle age change
  const handleAgeChangeWithEvent = (event: SelectChangeEvent<string>) => {
    const selectedAge = event.target.value;
    let filteredPets: Animal[] = [];

    switch (selectedAge) {
      case "Young":
        filteredPets = ageGroups.young;
        break;
      case "Adult":
        filteredPets = ageGroups.adult;
        break;
      case "Senior":
        filteredPets = ageGroups.senior;
        break;
      default:
        filteredPets = [];
        break;
    }

    handleAgeChange(event, filteredPets);
  };

  const handleBreedChangeWithFilters = (event: SelectChangeEvent<string>) => {
    const selectedBreed = event.target.value.split(" (")[0]; // Extract breed name without count
    handleBreedChange(event);
  };

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const selectedState = event.target.value;
    setLocation((prevLocation) => ({
      ...prevLocation,
      state: selectedState,
    }));

    handleFilterCounts(selectedState);
  };

  const handleFilterCounts = (selectedState: string) => {
    // Update filter counts based on selected state
    const filteredAnimalsByState = initialAnimals.filter(
      (animal) => animal.location.state === selectedState
    );
    const filteredAnimalsByType = filteredAnimalsByState.filter(
      (animal) => !type || animal.type === type
    );

    setTypeCounts(
      countFilterOptions(filteredAnimalsByState.map((animal) => animal.type))
    );
    setBreedCounts(
      countFilterOptions(filteredAnimalsByState.map((animal) => animal.breed))
    );
    setSexCounts(
      countFilterOptions(filteredAnimalsByType.map((animal) => animal.sex))
    );
    setAgeCounts(
      countAgeGroups(filteredAnimalsByType.map((animal) => animal.age))
    );

    const favoriteCount = filteredAnimalsByState.filter(
      (animal) => animal.isFavorite
    ).length;
    setFavoriteCount(favoriteCount);

    // Update state counts
    setStateCounts(
      countFilterOptions(
        filteredAnimalsByState.map((animal) => animal.location.state)
      )
    );
  };
  // Function to reset filter counts
  const resetFilterCounts = () => {
    // Reset filter counts to initial values
    setTypeCounts(
      countFilterOptions(initialAnimals.map((animal) => animal.type))
    );
    setBreedCounts(
      countFilterOptions(initialAnimals.map((animal) => animal.breed))
    );
    setSexCounts(
      countFilterOptions(initialAnimals.map((animal) => animal.sex))
    );
    setAgeCounts(countAgeGroups(initialAnimals.map((animal) => animal.age)));

    // Reset favorite count
    setFavoriteCount(
      initialAnimals.filter((animal) => animal.isFavorite).length
    );

    // Reset state counts
    setStateCounts(
      countFilterOptions(initialAnimals.map((animal) => animal.location.state))
    );
  };

  const handleClearFilters = () => {
    // Reset all filter values
    handleTypeChange({ target: { value: "" } } as SelectChangeEvent<string>);
    handleSexChange({ target: { value: "" } } as SelectChangeEvent<string>);
    handleBreedChange({ target: { value: "" } } as SelectChangeEvent<string>);
    handleAgeChange({ target: { value: "" } } as SelectChangeEvent<string>, []); // Reset age and filteredPets
    handleFavoriteChange({
      target: { value: "" },
    } as SelectChangeEvent<string>);
    setLocation({ state: "", city: "", zip: "" }); // Reset location state

    // Reset filter counts
    resetFilterCounts();
  };

  useEffect(() => {
    // Calculate the favorite count based on the filtered animals
    const filteredAnimals = initialAnimals.filter(
      (animal) =>
        (type === "" || animal.type === type) &&
        (sex === "" || animal.sex === sex) &&
        (age === "" || checkAgeGroup(animal, age)) &&
        (breed === "" || animal.breed === breed) &&
        (location.state === "" || animal.location.state === location.state) &&
        (favorite || !favorite || animal.isFavorite)
    );
    const favoriteCount = filteredAnimals.filter(
      (animal) => animal.isFavorite
    ).length;
    setFavoriteCount(favoriteCount);
 // Update the filter counts only if there are filtered animals
  if (filteredAnimals.length > 0) {
    setTypeCounts(
      countFilterOptions(filteredAnimals.map((animal) => animal.type))
    );
    setBreedCounts(
      countFilterOptions(filteredAnimals.map((animal) => animal.breed))
    );
    setSexCounts(
      countFilterOptions(filteredAnimals.map((animal) => animal.sex))
    );
    setAgeCounts(
      countAgeGroups(filteredAnimals.map((animal) => animal.age))
    );
    setStateCounts(
      countFilterOptions(filteredAnimals.map((animal) => animal.location.state))
    );
  }


  }, [type, sex, age, breed, location, favorite, initialAnimals]);

  return (
    <FormControl variant="outlined" sx={{ gap: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#F8AF3F", pl: 1 }}>
        Filters
      </Typography>

      <Stack sx={{ gap: 2, px: 6 }}>
        <FormControl>
          <Select
            value={location.state}
            onChange={handleStateChange}
            displayEmpty
            inputProps={{ "aria-label": "State" }}
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value="" disabled>
              State
            </MenuItem>
            {availableStates.map((state) => (
              <MenuItem key={state} value={state} disabled={state === ""}>
                {`${state} (${stateCounts[state] || 0})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Select
            label="Species"
            value={type}
            onChange={handleTypeChange}
            displayEmpty
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value="" disabled>
              Species
            </MenuItem>
            {types.map((type) => (
              <MenuItem key={type} value={type} disabled={!typeCounts[type]}>
                {`${type} (${typeCounts[type] || 0})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {breeds.length > 0 && (
          <FormControl>
            <Select
              label="Breed"
              value={breed}
              onChange={handleBreedChangeWithFilters}
              displayEmpty
              sx={{ backgroundColor: "#fff" }}
            >
              <MenuItem value="" disabled>
                Breed
              </MenuItem>
              {breeds.map((breed) => (
                <MenuItem
                  key={breed}
                  value={breed}
                  disabled={!breedCounts[breed]}
                >
                  {`${breed} (${breedCounts[breed] || 0})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControl>
          <Select
            label="Sex"
            value={sex}
            onChange={handleSexChange}
            displayEmpty
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value="" disabled>
              Sex
            </MenuItem>
            {Object.entries(sexCounts).map(([sex, count]) => (
              <MenuItem key={sex} value={sex}>
                {`${sex} (${sexCounts[sex]})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Select
            label="Age"
            value={age}
            onChange={handleAgeChangeWithEvent}
            displayEmpty
            name="age"
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value="" disabled>
              Age
            </MenuItem>
            {Object.entries(ageCounts).map(([ageGroup, count]) => (
              <MenuItem key={ageGroup} value={ageGroup}>
                {`${ageGroup} (${ageCounts[ageGroup]})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Select
            label="Favorites"
            value={favorite ? "true" : ""}
            onChange={handleFavoriteChange}
            displayEmpty
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value="" disabled>
              Favorites
            </MenuItem>

            <MenuItem value="true">{`Favorites (${favoriteCount})`}</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Typography
        variant="subtitle2"
        onClick={handleClearFilters}
        style={{
          cursor: "pointer",
          color: "#F8AF3F",
          textAlign: "right",
          paddingRight: "2rem",
        }}
      >
        Clear Filters
      </Typography>
    </FormControl>
  );
};

export default FilterDropdowns;
