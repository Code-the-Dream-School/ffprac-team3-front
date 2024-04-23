import React, { useState, useRef, useEffect } from "react";
import initialAnimals from "../../util/PetData/PetData";
import PetCard from "../PetCardComponent/PetCard";
import { Container, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Animal {
  id: number;
  type: string;
  age: string;
  sex: string;
  name: string;
  description: string;
  isFavorite: boolean;
  imageUrl: string;
}

export const PetSliderCarousel: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>(
    initialAnimals.filter((animal) => animal.isFavorite)
  );

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState<boolean>(false);
  const [showRightScroll, setShowRightScroll] = useState<boolean>(false);

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

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const clientWidth = containerRef.current.clientWidth;
      setShowLeftScroll(containerRef.current.scrollLeft > 0);
      setShowRightScroll(
        scrollWidth > clientWidth + containerRef.current.scrollLeft
      );
    }
  }, [scrollPosition]);

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
    <Container fixed id="favorites">
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
            <PetCard
              key={animal.id}
              animal={animal}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
          <Box
            sx={{
              display: "flex",
            }}
          >
            <IconButton
              onClick={handleScrollLeft}
              disableRipple
              sx={{
                color: "#EE633E",
                position: "absolute",
                alignSelf: "center",
                left: "2.5rem",
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
                right: "2.5rem",
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
      </Box>
    </Container>
  );
};
