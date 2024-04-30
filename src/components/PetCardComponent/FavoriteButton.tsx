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
  //const favoriteAnimals = JSON.parse(favoriteAnimalsStorage)

  // Load favorite status from localStorage on component mount
  //useEffect(() => {
    //const storedFavorites = localStorage.getItem("favoriteAnimals");
      //if (favorites.includes(animalId)) {
        // Update local state only if the favorite status has changed
        //if (isFavorite) {
          //onToggleFavorite(animalId); // Mark as favorite if found in localStorage
        //}
      //}
    //}
  //}, [animalId, isFavorite, onToggleFavorite]);

  //const handleToggleFavorite = () => {
    //onToggleFavorite(animalId); // Pass the new state and animalId to onToggleFavorite

    // Update localStorage with the new list of favorites
    //const storedFavorites = localStorage.getItem("favorites");
    //let favorites: ObjectId[] = [];
    //if (storedFavorites) {
     // favorites = JSON.parse(storedFavorites);
    //}
    //if (!isFavorite) {
      // If the animal is unliked, remove it from favorites
     // favorites = favorites.filter((_id: ObjectId) => _id !== animalId);
    //} else {
      //favorites.push(animalId);
    //}
    //localStorage.setItem("favorites", JSON.stringify(favorites));
  //};

  //const handleToggleFavorite = (_id: ObjectId) => {

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
