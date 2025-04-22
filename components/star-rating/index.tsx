import { Button } from "@heroui/button";
import { useState } from "react";

import { Star } from "../icons";

type StarRatingProps = {
  rating?: number;
  setRating?: (rating: number) => void;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
};

export default function StarRating({
  rating = 0,
  setRating,
  maxStars = 5,
  size = "md",
  disabled = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleClick = (starValue: number) => {
    if (!disabled && setRating) {
      setRating(starValue);
    }
  };

  const handleMouseEnter = (starValue: number) => {
    if (!disabled) {
      setHoverRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = hoverRating
          ? starValue <= hoverRating
          : starValue <= rating;

        return (
          <Button
            key={index}
            className={`${sizeClasses[size]} ${!disabled ? "cursor-pointer" : "cursor-default"} data-[hover]:bg-transparent`}
            onPress={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            isIconOnly
            isDisabled={disabled}
            size="sm"
            variant="light"
            aria-label={`Rate ${starValue} out of ${maxStars}`}
          >
            <Star
              fill={isFilled ? "currentColor" : "none"}
              className={`${isFilled ? "text-yellow-400" : "text-gray-300"}`}
            />
          </Button>
        );
      })}
    </div>
  );
}
