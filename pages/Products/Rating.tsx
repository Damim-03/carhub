
import { cn } from "./lib/utils";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    showValue?: boolean;
    className?: string;
}

const Rating = ({
                    value,
                    max = 5,
                    size = "md",
                    showValue = false,
                    className,
                }: RatingProps) => {
    // Determine the number of full stars and whether there should be a half star
    const fullStars = Math.floor(value);
    const hasHalfStar = value - fullStars >= 0.5;

    // Size mappings
    const sizeMap = {
        sm: {
            star: "w-3 h-3",
            text: "text-xs",
        },
        md: {
            star: "w-4 h-4",
            text: "text-sm",
        },
        lg: {
            star: "w-5 h-5",
            text: "text-base",
        },
    };

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <div className="flex">
                {Array.from({ length: max }).map((_, i) => {
                    // For each position, determine if we need a full, half, or empty star
                    if (i < fullStars) {
                        // Full star
                        return (
                            <Star
                                key={i}
                                className={cn(
                                    sizeMap[size].star,
                                    "fill-ali-star text-ali-star"
                                )}
                            />
                        );
                    } else if (i === fullStars && hasHalfStar) {
                        // Half star
                        return (
                            <StarHalf
                                key={i}
                                className={cn(
                                    sizeMap[size].star,
                                    "fill-ali-star text-ali-star"
                                )}
                            />
                        );
                    } else {
                        // Empty star
                        return (
                            <Star
                                key={i}
                                className={cn(
                                    sizeMap[size].star,
                                    "text-gray-300"
                                )}
                            />
                        );
                    }
                })}
            </div>

            {showValue && (
                <span className={cn("text-ali-text", sizeMap[size].text)}>
          {value.toFixed(1)}
        </span>
            )}
        </div>
    );
};

export default Rating;
