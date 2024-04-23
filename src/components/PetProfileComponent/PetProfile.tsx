import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Stack,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";
import initialAnimals from "../../util/PetData/PetData";
import FavoriteButton from "../PetCardComponent/FavoriteButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";

interface Location {
  state: string;
  city: string;
  zip: string;
}

interface Animal {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  sex: string;
  description: string;
  isFavorite: boolean;
  imageUrl: string;
}

interface PetCardProps {
  animal: Animal;
  onToggleFavorite: (id: number) => void;
}

export const PetProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | undefined>();
  const navigate = useNavigate();

  const formatAge = (age: string) => {
    const ageNum = parseFloat(age);
    if (ageNum >= 2) {
      return age + " years";
    } else if (ageNum === 1) {
      return age + " year";
    } else {
      const months = ageNum * 12;
      return months + " months";
    }
  };

  useEffect(() => {
    // Fetch animal details based on the ID from the URL
    const selectedAnimal = initialAnimals.find(
      (animal) => animal.id === Number(id)
    );
    if (selectedAnimal) {
      // Check if the favorite status is stored in localStorage
      const storedFavorite = localStorage.getItem(`favorite_${id}`);
      if (storedFavorite !== null) {
        selectedAnimal.isFavorite = JSON.parse(storedFavorite);
      }
      setAnimal(selectedAnimal);
      setLoading(false);
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Refresh favorite status on component mount
    const storedFavorite = localStorage.getItem(`favorite_${id}`);
    if (storedFavorite !== null) {
      setAnimal((prevAnimal) => {
        if (prevAnimal) {
          return { ...prevAnimal, isFavorite: JSON.parse(storedFavorite) };
        }
        return prevAnimal;
      });
    }
  }, []);

  useEffect(() => {
    // Remember scroll position when component unmounts
    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Scroll to the remembered position when component mounts
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    if (animal) {
      const newFavoriteState = !animal.isFavorite;
      setAnimal({ ...animal, isFavorite: newFavoriteState });
      // Store the favorite status in localStorage
      localStorage.setItem(
        `favorite_${animal.id}`,
        JSON.stringify(newFavoriteState)
      );
    }
  };

  if (loading) {
    // Handle case when animal is still loading or not found
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#EE633E" }} />
      </Box>
    );
  }
  if (!animal) {
    // Handle case when animal is not found
    return (
      <Typography variant="h2" align="center">
        Animal not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#0E2728",
        width: "100vw",
        py: "8rem",
        ml: "-8px",
        pr: "8px",
      }}
    >
      <Card
        sx={{
          mx: "4rem",
          p: { xs: "2rem", md: "4rem" },
          border: "1px solid #0E2728",
          borderRadius: "5px",
          backgroundColor: "#F4F2EA",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            variant="text"
            onClick={handleGoBack}
            sx={{
              color: "#0E2728",
              boxShadow: "none",
              backgroundColor: "transparent",
              fontSize: "1rem",
              "&:hover": {
                color: "#506C60",
                boxShadow: "none",
                backgroundColor: "transparent",
              },
            }}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Breadcrumbs>

        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "40% 60%" }, // Single column on small screens
            gap: 4,
          }}
        >
          <CardMedia
            sx={{
              height: 450,
              minHeight: 300,
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "1rem",
              mt: "2rem",
            }}
            image={animal.imageUrl}
            title={animal.name}
          />
          <Stack
            sx={{
              order: { xs: 2, md: 1 }, // Change order on smaller screens
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "#EE633E",
                fontWeight: 600,
                pt: { xs: 0, md: "2rem" },
                letterSpacing: 1,
                display: "flex",
              }}
            >
              {animal.name}

              <FavoriteButton
                isFavorite={animal.isFavorite}
                onToggleFavorite={handleToggleFavorite}
                animalId={animal.id}
              />
            </Typography>

            <Typography
              variant="h5"
              sx={{ color: "#0E2728", fontWeight: 400, pt: "1.5rem" }}
            >
              {animal.type} &nbsp;|&nbsp; {animal.breed}
              &nbsp;|&nbsp; {formatAge(animal.age)} &nbsp;|&nbsp; {animal.sex}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#0F2117",
                my: "1rem",
                mr: { xs: "0", md: "3rem" },
              }}
            >
              {animal.description}
            </Typography>
            <CardActions
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mt: "3rem",
                mb: "2rem",
              }}
            >
              <Button
                variant="contained"
                size="large"
                aria-label="adopt pet"
                sx={{
                  backgroundColor: "#EE633E",
                  py: "1rem",
                  "&:hover": {
                    backgroundColor: "#df522d",
                  },
                }}
              >
                start adoption inquiry
              </Button>
              <Button
                variant="contained"
                size="large"
                aria-label="sponsor pet"
                sx={{
                  backgroundColor: "#F8AF3F",
                  py: "1rem",
                  "&:hover": { backgroundColor: "#eea535" },
                }}
              >
                sponsor this pet
              </Button>
            </CardActions>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
