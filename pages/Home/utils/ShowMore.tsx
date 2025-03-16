
import { ShowMoreProps } from "../../../Types/Type";
import { updateSearchParams } from "../../../Data/data";
import { CustomButton } from "../utils";
import React from "react";
import { Navigate } from "react-router-dom";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathname = updateSearchParams("limit", `${newLimit}`);
    
    Navigate(newPathname);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;