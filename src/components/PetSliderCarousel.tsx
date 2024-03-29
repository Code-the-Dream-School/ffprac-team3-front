import React, { useState, useRef } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import { Button, IconButton, Typography, Box } from "@mui/material";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import FavoriteButton from "./FavoriteButton";
import PetsIcon from "@mui/icons-material/Pets";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Animal {
  id: number;
  type: string;
  age: string;
  gender: string;
  name: string;
  description: string;
  isFavorite: boolean;
}

const initialAnimals: Animal[] = [
  {
    id: 0,
    type: "Dog",
    age: "7yrs",
    gender: "Female",
    name: "Pip",
    description: "Pip is an amazing dog...",
    isFavorite: true,
  },
  {
    id: 1,
    type: "Cat",
    age: "9yrs",
    gender: "Male",
    name: "Kelvin",
    description: "Kelvin is a great lap cat...",
    isFavorite: true,
  },
  {
    id: 2,
    type: "Cat",
    age: "Young",
    gender: "Male",
    name: "Toast",
    description: "Toast is a nervous kitty...",
    isFavorite: true,
  },
  {
    id: 3,
    type: "Cat",
    age: "Young",
    gender: "Female",
    name: "Maus",
    description: "Maus is a very vocal kitty...",
    isFavorite: true,
  },
  {
    id: 4,
    type: "Dog",
    age: "Senior",
    gender: "Male",
    name: "Cooper",
    description: "Cooper is a mommy's boy...",
    isFavorite: true,
  },
];

export const PetSliderCarousel: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>(
    initialAnimals.filter((animal) => animal.isFavorite)
  );

  const handleToggleFavorite = (id: number) => {
    const updatedAnimals = animals.map((animal) =>
      animal.id === id ? { ...animal, isFavorite: !animal.isFavorite } : animal
    );
    setAnimals(updatedAnimals);

    const updatedFavoriteAnimals = updatedAnimals.filter(
      (animal) => animal.isFavorite
    );
    setFavoriteAnimals(updatedFavoriteAnimals);
  };

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      const newScrollPosition = Math.max(0, scrollLeft - scrollWidth / 2);
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      setScrollPosition(newScrollPosition);
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      const newScrollPosition = Math.min(
        scrollWidth,
        scrollLeft + scrollWidth / 2
      );
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      setScrollPosition(newScrollPosition);
    }
  };

  return (
    <>
      <Box sx={{ p: 5 }}>
        <Typography
          variant="h3"
          component="h2"
          color="#0F2117"
          textAlign="center"
          sx={{ fontWeight: 600 }}
          gutterBottom
        >
          Favorited Pets
        </Typography>

        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            gap: 2,
            py: 2,
            overflow: "auto",
            width: 7 / 8,
            m: "auto",
            scrollSnapType: "x mandatory",
            "& > *": {
              scrollSnapAlign: "center",
            },
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {favoriteAnimals.map((animal) => (
            <Card
              variant="plain"
              key={animal.id}
              orientation="vertical"
              size="lg"
              sx={{ width: "auto" }}
            >
              <>
                <AspectRatio ratio="1" sx={{ width: 200 }}>
                  <img
                    src="https://https://cdn.mos.cms.futurecdn.net/ASHH5bDmsp6wnK6mEfZdcU-1200-80.jpg"
                    srcSet="https://cdn.mos.cms.futurecdn.net/ASHH5bDmsp6wnK6mEfZdcU-1200-80.jpg 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>

                <IconButton
                  onClick={() => handleToggleFavorite(animal.id)}
                  aria-label="heart icon"
                  sx={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    "&:hover": {
                      color: "#F8AF3F",
                    },
                  }}
                >
                  <FavoriteButton
                    isFavorite={animal.isFavorite}
                    onToggleFavorite={() => handleToggleFavorite(animal.id)}
                  />
                </IconButton>
              </>
              <CardContent
                sx={{
                  pb: 2,
                  color: "#0F2117",
                }}
              >
                <Typography variant="h6" component="h5">
                  {animal.name}
                </Typography>

                <Typography variant="overline">
                  {animal.type} &nbsp;|&nbsp; {animal.age} &nbsp;|&nbsp;{" "}
                  {animal.gender}
                </Typography>
                <Typography variant="body2">{animal.description}</Typography>

                <Button
                  href="/pet-profile"
                  variant="contained"
                  size="medium"
                  aria-label="pet profile"
                  endIcon={<PetsIcon />}
                  sx={{
                    mt: 2,
                    px: 5,
                    alignSelf: "center",
                    fontWeight: 500,
                    color: "#F7F4F0",
                    backgroundColor: "#EE633E",

                    "&:hover": {
                      backgroundColor: "#F8AF3F",
                    },
                  }}
                >
                  Profile
                </Button>
              </CardContent>
            </Card>
          ))}

          <IconButton
            onClick={handleScrollLeft}
            disableRipple
            sx={{
              color: "#EE633E",
              position: "absolute",
              alignSelf: "center",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              "&:hover ": {
                color: "#F8AF3F",
                backgroundColor: "transparent",
              },
            }}
          >
            <ArrowBackIosIcon fontSize="large" />
          </IconButton>
          <IconButton
            disableRipple
            onClick={handleScrollRight}
            sx={{
              color: "#EE633E",
              position: "absolute",
              alignSelf: "center",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              "&:hover": {
                color: "#F8AF3F",
                backgroundColor: "transparent",
              },
            }}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
