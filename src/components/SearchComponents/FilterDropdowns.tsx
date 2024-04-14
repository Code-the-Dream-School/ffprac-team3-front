import React, { useState, useEffect } from "react";
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
  // handleLocationChange: (event: SelectChangeEvent<string>) => void;
  handleFavoriteChange: (event: SelectChangeEvent<string>) => void;
  handleClearFilters: () => void;
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
  handleClearFilters,
  setLocation,
  availableStates,
  initialAnimals,
}) => {
  const types = [...new Set(initialAnimals.map((animal) => animal.type))];
  const [ageGroups, setAgeGroups] = useState<AgeGroup>({
    young: [],
    adult: [],
    senior: [],
  });

  const [breeds, setBreeds] = useState<string[]>([]);
  const [typeCounts, setTypeCounts] = useState<{ [key: string]: number }>({});
  const [breedCounts, setBreedCounts] = useState<{ [key: string]: number }>({});
  const [stateCounts, setStateCounts] = useState<{ [key: string]: number }>({});
  const [sexCounts, setSexCounts] = useState<{ [key: string]: number }>({});
  const [ageCounts, setAgeCounts] = useState<{ [key: string]: number }>({});
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  useEffect(() => {
    const groupedPets = groupPetsByAge(initialAnimals);
    setAgeGroups((prevAgeGroups) => ({ ...prevAgeGroups, ...groupedPets }));
  }, []);

  useEffect(() => {
    setAgeCounts({
      Young: ageGroups.young.length,
      Adult: ageGroups.adult.length,
      Senior: ageGroups.senior.length,
    });
  }, [ageGroups]);

  // Update breeds when pet type changes
  useEffect(() => {
    const typeBreeds = initialAnimals
      .filter((animal) => animal.type === type)
      .map((animal) => animal.breed);
    setBreeds([...new Set(typeBreeds)]);
  }, [type]);

  // Filter Counts
  useEffect(() => {
    setBreedCounts(
      countFilterOptions(
        initialAnimals.map((animal) => animal.breed),
        "breed"
      )
    );
    setStateCounts(
      countFilterOptions(
        initialAnimals.map((animal) => animal.location.state),
        "state"
      )
    );
    setTypeCounts(
      countFilterOptions(
        initialAnimals.map((animal) => animal.type),
        "type"
      )
    );

    let filteredAnimalsByType = initialAnimals;
    if (type) {
      filteredAnimalsByType = initialAnimals.filter(
        (animal) => animal.type === type
      );
    }

    setSexCounts(
      countFilterOptions(
        filteredAnimalsByType.map((animal) => animal.sex),
        "sex"
      )
    );

    // Calculate age counts for filtered animals
    const filteredAges = filteredAnimalsByType.map((animal) => animal.age);
    const ageCountsByType = countAgeGroups(filteredAges);
    setAgeCounts(ageCountsByType);
    const favoriteCount = initialAnimals.filter(
      (animal) => animal.isFavorite
    ).length;
    setFavoriteCount(favoriteCount);
  }, [type, initialAnimals]);

  // Function to count occurrences for filter options
  const countFilterOptions = (items: string[], key: string) => {
    const counts: { [key: string]: number } = {};
    items.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });
    return counts;
  };

  // Function to count occurrences for age groups
  const countAgeGroups = (ages: string[]): { [key: string]: number } => {
    const counts: { [key: string]: number } = { Young: 0, Adult: 0, Senior: 0 };
    ages.forEach((age) => {
      const ageValue = parseFloat(age);
      if (ageValue >= 0 && ageValue <= 1) {
        counts["Young"]++;
      } else if (ageValue >= 2 && ageValue <= 5) {
        counts["Adult"]++;
      } else {
        counts["Senior"]++;
      }
    });
    return counts;
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
  // Function to handle breed change
  const handleBreedChangeWithFilters = (event: SelectChangeEvent<string>) => {
    const selectedBreed = event.target.value.split(" (")[0]; // Extract breed name without count
    handleBreedChange(event);
  };

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const selectedState = event.target.value;
    setLocation((prevLocation) => ({
      ...prevLocation,
      
      state: selectedState, // Update the state in the location object
    }));

    // Update filter counts based on selected state
    const filteredAnimalsByState = initialAnimals.filter(
      (animal) => animal.location.state === selectedState
    );
    setTypeCounts(
      countFilterOptions(
        filteredAnimalsByState.map((animal) => animal.type),
        "type"
      )
    );
    setBreedCounts(
      countFilterOptions(
        filteredAnimalsByState.map((animal) => animal.breed),
        "breed"
      )
    );
    let filteredAnimalsByType = filteredAnimalsByState;
    if (type) {
      filteredAnimalsByType = filteredAnimalsByState.filter(
        (animal) => animal.type === type
      );
    }

    setSexCounts(
      countFilterOptions(
        filteredAnimalsByType.map((animal) => animal.sex),
        "sex"
      )
    );

    // Calculate age counts for filtered animals
    const filteredAges = filteredAnimalsByType.map((animal) => animal.age);
    const ageCountsByType = countAgeGroups(filteredAges);
    setAgeCounts(ageCountsByType);

    const favoriteCount = filteredAnimalsByState.filter(
      (animal) => animal.isFavorite
    ).length;
    setFavoriteCount(favoriteCount);
  };

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
                {`${sex} (${count})`}
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
                {`${ageGroup} (${count})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Select
            label="Favorites"
            value={favorite ? "true" : ""}
            onChange={handleFavoriteChange} // New favorite filter change handler
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
