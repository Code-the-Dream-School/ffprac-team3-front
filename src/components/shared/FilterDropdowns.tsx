import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Typography,
  Stack,
} from "@mui/material";
import initialAnimals from "./PetData";

interface Location {
  state: string;
  city: string;
  zip: string;
}

interface FilterDropdownsProps {
  type: string;
  sex: string;
  age: string;
  location: Location;
  handleTypeChange: (event: SelectChangeEvent<string>) => void;
  handleSexChange: (event: SelectChangeEvent<string>) => void;
  handleAgeChange: (event: SelectChangeEvent<string>) => void;
  handleLocationChange: (event: SelectChangeEvent<string>) => void;
  handleClearFilters: () => void;
}

const FilterDropdowns: React.FC<FilterDropdownsProps> = ({
  type,
  sex,
  age,
  location,
  handleTypeChange,
  handleSexChange,
  handleAgeChange,
  handleLocationChange,
  handleClearFilters,
}) => {
  const types = [...new Set(initialAnimals.map((animal) => animal.type))];
  const sexes = [...new Set(initialAnimals.map((animal) => animal.sex))];
  const ages = [...new Set(initialAnimals.map((animal) => animal.age))];
  const states = [
    ...new Set(
      initialAnimals.flatMap((animal) =>
        Array.isArray(animal.location)
          ? animal.location.map((loc) => loc.state)
          : [animal.location.state]
      )
    ),
  ];

  //   Location filter - removed to allow for State Filters
  //   const locationNames = [
  //     ...new Set(
  //       initialAnimals.flatMap((animal) =>
  //         Array.isArray(animal.location)
  //           ? animal.location.map((loc) => `${loc.city}, ${loc.state}`)
  //           : [`${animal.location.city}, ${animal.location.state}`]
  //       )
  //     ),
  //   ];

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const selectedState = event.target.value;
    const filteredCities = initialAnimals
      .flatMap((animal) =>
        Array.isArray(animal.location)
          ? animal.location.filter((loc) => loc.state === selectedState)
          : animal.location.state === selectedState
          ? [animal.location]
          : []
      )
      .map((loc) => loc.city);

    if (filteredCities.length === 0) {
      alert("Sorry, no results for this state.");
    } else {
      handleLocationChange(event);
    }
  };

  return (
    <FormControl variant="outlined" sx={{ gap: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#F8AF3F", pl: 1 }}>
        Filters
      </Typography>
      <Stack sx={{ gap: 2, px: 6 }}>
        <Select
          value={location.state}
          onChange={handleStateChange}
          displayEmpty
          inputProps={{ "aria-label": "State" }}
          sx={{ backgroundColor: "#fff" }}
        >
          <MenuItem value="" disabled>
            <Typography variant="subtitle2" component="body">
              State
            </Typography>
          </MenuItem>
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>

        <DropdownSelect
          label="Species"
          value={type}
          onChange={handleTypeChange}
          options={[...types, "Clear Filters"]}
        />
        <DropdownSelect
          label="Sex"
          value={sex}
          onChange={handleSexChange}
          options={[...sexes, "Clear Filters"]}
        />
        <DropdownSelect
          label="Age"
          value={age}
          onChange={handleAgeChange}
          options={[...ages, "Clear Filters"]}
        />
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

interface DropdownSelectProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: string[];
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <FormControl variant="outlined">
    <Select
      value={value}
      onChange={(event: SelectChangeEvent<string>) => onChange(event)} // Pass the event object directly to the onChange handler
      displayEmpty
      inputProps={{ "aria-label": label }}
      sx={{ backgroundColor: "#fff" }}
    >
      <MenuItem value="">
        <Typography variant="subtitle2" component="body">
          {label}
        </Typography>
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default FilterDropdowns;
