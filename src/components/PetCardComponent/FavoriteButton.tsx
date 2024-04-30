import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ObjectId } from 'mongodb';

interface FavoriteButtonProps {
  onToggleFavorite: Function;
  animalId: ObjectId;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = (
  {
    onToggleFavorite,
    animalId
  }
) => {
  const [isHovered, setIsHovered] = useState(false);
  const favoriteAnimalsStorage = localStorage.getItem('favoriteAnimals')

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box>
      <IconButton
        onClick={() => onToggleFavorite(animalId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        { favoriteAnimalsStorage?.includes(animalId.toString()) ? (
          <FavoriteIcon
            sx={{
              color: "#F8AF3F",
            }}
          />
        ) : (
          <FavoriteIcon
            sx={{
              color: "#cdcccd",
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default FavoriteButton;
