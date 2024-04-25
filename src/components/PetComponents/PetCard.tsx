import React from "react";
import {
  IconButton,
  CardActions,
  CardActionArea,
  Typography,
  Button,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import FavoriteButton from "../PetCardComponent/FavoriteButton";
import PetsIcon from "@mui/icons-material/Pets";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { ObjectId } from 'mongodb';

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

interface PetCardProps {
  animal: Animal;
  onToggleFavorite: (_id: ObjectId) => void;
}



const PetCard: React.FC<PetCardProps> = ({ animal, onToggleFavorite }) => {
  
  const handleToggleFavorite = () => {
    onToggleFavorite(animal._id);
  };



  return (
    <Card
      variant="plain"
      orientation="vertical"
      size="lg"
      sx={{ width: "auto", alignItems: "center" }}
    >
      <AspectRatio ratio="1" sx={{ width: 200 }}>
        <img
          src={'http://localhost:8000/api/v1/pets/uploads/' + animal.fileImages.filename}
          loading="lazy"
          alt={animal.name}
        />
        <IconButton
          onClick={handleToggleFavorite}
          aria-label="heart icon"
          sx={{
            position: "absolute",
            right: "0.1rem",
            zIndex: 1,
            "&:hover": {
              color: "#F8AF3F",
            },
          }}
        />
        <FavoriteButton
          isFavorite={animal.isFavorite}
          onToggleFavorite={handleToggleFavorite}
          animalId={animal._id}
        />
      </AspectRatio>

      <CardContent
        sx={{
          pb: 2,
          color: "#0F2117",
          backgroundColor: "#FBFCFE",
        }}
      >
        <CardActionArea>
          <Typography variant="h6" component="h5">
            {animal.name}
          </Typography>

          <Typography
            variant="overline"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {animal.type} &nbsp;|&nbsp; {animal.age} &nbsp;|&nbsp; {animal.sex}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 1, // Limit to 2 lines
            }}
          >
            {animal.description}
          </Typography>
        </CardActionArea>
        <CardActions sx={{ position: "relative" }}>
          <Button
            href="/pet-profile"
            variant="contained"
            size="medium"
            aria-label="pet profile"
            endIcon={<PetsIcon />}
            sx={{
              mt: 2,
              px: 6,
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
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PetCard;
