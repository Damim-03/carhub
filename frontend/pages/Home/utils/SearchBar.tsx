import { Image } from "../../../Home/components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchManufacturer from "./SearchManufacturer";
import SearchModel from "./SearchModel";

interface SearchBarProps {
  onSearch?: (term: string) => void;
  className?: string;
}

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button
        type='submit'
        className={`-ml-3 z-10 ${otherClasses}`}
        aria-label="Search"
    >
      <Image
          src={"/magnifying-glass.svg"}
          alt={"Search"}
          width={40}
          height={40}
          className='object-contain dark:invert'
      />
    </button>
);

const SearchBar = ({ onSearch, className = "" }: SearchBarProps) => {
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());

    // Call the onSearch callback if provided
    if (onSearch) {
      const searchTerm = `${manufacturer} ${model}`.trim();
      onSearch(searchTerm);
    }
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(newPathname);
  };

  return (
      <form
          className={`searchbar flex flex-col sm:flex-row gap-4 items-center sm:items-stretch justify-center px-4 sm:px-6 lg:px-8 ${className}`}
          onSubmit={handleSearch}
      >
        {/* Manufacturer Search */}
        <div className="searchbar__item flex items-center relative w-full sm:w-auto">
          <SearchManufacturer
              manufacturer={manufacturer}
              setManuFacturer={setManuFacturer}
          />
        </div>

        {/* Model Search */}
        <div className="searchbar__item flex items-center relative w-full sm:w-auto">
          <SearchModel
              model={model}
              setModel={setModel}
          />
        </div>

        <SearchButton otherClasses="hidden sm:flex sm:ml-4" />
      </form>
  );
};

export default SearchBar;