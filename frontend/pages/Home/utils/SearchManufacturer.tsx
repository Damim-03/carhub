import { Image } from "../../../Home/components";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import { manufacturers } from "../../../constants/constant";
import { SearchManuFacturerProps } from "../../../Types/Type";
import React from "react";

const SearchManufacturer = ({ manufacturer, setManuFacturer }: SearchManuFacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer w-full">
  <Combobox value={manufacturer} onChange={setManuFacturer}>
    <div className="relative w-full">
      {/* Combobox Button */}
      <Combobox.Button className="absolute top-[14px] left-4">
        <Image
          src="/car-logo.svg"
          width={20}
          height={20}
          className="object-contain"
          alt="car logo"
        />
      </Combobox.Button>

      {/* Input Field */}
      <Combobox.Input
        className="search-manufacturer__input w-full py-2 pl-12 pr-4 border 
        border-gray-300 rounded-full focus:ring-2 focus:ring-primary-blue 
        focus:outline-none text-sm md:text-base dark:placeholder:text-white"
        displayValue={(item: string) => item}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Volkswagen..."
      />

      {/* Dropdown Options */}
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
      >
        <Combobox.Options
          className="absolute z-10 mt-2 max-h-60 w-full 
          overflow-auto rounded-md bg-white py-2 shadow-lg 
          ring-1 ring-black ring-opacity-5 focus:outline-none 
          text-sm md:text-base"
        >
          {filteredManufacturers.length === 0 && query !== "" ? (
            <Combobox.Option
              value={query}
              className="search-manufacturer__option px-4 py-2 
              text-gray-900 hover:bg-primary-blue 
              hover:text-white cursor-pointer"
            >
              Create "{query}"
            </Combobox.Option>
          ) : (
            filteredManufacturers.map((item) => (
              <Combobox.Option
                key={item}
                className={({ active }) =>
                  `relative px-4 py-2 search-manufacturer__option cursor-pointer ${
                    active ? "bg-primary-blue text-white" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item}
                    </span>
                    {selected && (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-primary-purple"
                        }`}
                      ></span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </div>
  </Combobox>
</div>
  );
};

export default SearchManufacturer;