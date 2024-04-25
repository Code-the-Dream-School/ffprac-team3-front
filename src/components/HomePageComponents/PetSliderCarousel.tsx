import React, { useState, useRef, useEffect } from "react";
import PetCard from "../PetCardComponent/PetCard";
import { Container, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getAllPetData } from "../../util/index";
import { ObjectId } from 'mongodb';
import  getBreedListByType from '../PetComponents/PetData/PetData'

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

interface Location {
  state: string;
  city: string;
  zip: string;

}

export const PetSliderCarousel: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    animals.forEach((animal) => {
      if (animal.isFavorite === true) {
        favoriteAnimals.push(animal)
      }
    })
  }, [animals])

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
    };

    fetchingData(); 
  }, []); 


  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState<boolean>(false);
  const [showRightScroll, setShowRightScroll] = useState<boolean>(false);

  const handleToggleFavorite = (_id: ObjectId) => {

    const updatedAnimals = animals.map((animal) =>
      animal._id === _id ? { ...animal, isFavorite: !animal.isFavorite } : animal
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
    <Container fixed sx={{ pb: "2rem" }}>
      <Box sx={{ p: "2rem" }}>
        <Typography
          variant="h3"
          component="h2"
          color="#0F2117"
          textAlign="center"
          sx={{ fontWeight: 600, mt: "2rem", pb: "1rem" }}
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
              key={parseInt(animal._id.toString(), 16)}
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
