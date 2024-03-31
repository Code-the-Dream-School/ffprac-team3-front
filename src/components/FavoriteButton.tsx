import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: (newState: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggleFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleFavorite = () => {
    onToggleFavorite(!isFavorite);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <IconButton
        sx={{
          color: isHovered ? "#f7f4f0" : "#F8AF3F",
          "&:hover": {
            color: isHovered ? "#f7f4f0" : "#F8AF3F",
          },
        }}
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
          <FavoriteBorderIcon
            sx={{
              color: "#f7f4f0",
            }}
          />
        )}
      </IconButton>
    </>
  );
};

export default FavoriteButton;
