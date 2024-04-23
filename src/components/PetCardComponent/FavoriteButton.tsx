import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: (newState: boolean, animalId: number) => void;
  animalId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggleFavorite,
  animalId,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Load favorite status from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites: number[] = JSON.parse(storedFavorites);
      if (favorites.includes(animalId)) {
        // Update local state only if the favorite status has changed
        if (isFavorite) {
          onToggleFavorite(true, animalId); // Mark as favorite if found in localStorage
        }
      }
    }
  }, [animalId, isFavorite, onToggleFavorite]);

  const handleToggleFavorite = () => {
    onToggleFavorite(!isFavorite, animalId); // Pass the new state and animalId to onToggleFavorite

    // Update localStorage with the new list of favorites
    const storedFavorites = localStorage.getItem("favorites");
    let favorites: number[] = [];
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }
    if (!isFavorite) {
      // If the animal is unliked, remove it from favorites
      favorites = favorites.filter((id: number) => id !== animalId);
    } else {
      favorites.push(animalId);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box>
      <IconButton
        onClick={handleToggleFavorite}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isFavorite ? (
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
