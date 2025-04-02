import { Fragment, useState } from "react";
import { Image } from "../../../Home/components";
import { Listbox, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { CustomFilterProps } from "../../../Types/Type";
import { updateSearchParams } from "../../../Data/data";

export default function CustomFilter<T>({ title, options, onSelect }: CustomFilterProps<T>) {
    const [selected, setSelected] = useState(options[0]);
    const navigate = useNavigate();

    const handleUpdateParams = (value: T) => {
        const newPathName = updateSearchParams(title, String(value).toLowerCase());
        navigate(newPathName);
        if (onSelect) {
            onSelect(value);
        }
    };

    return (
        <div className="w-fit">
            <Listbox
                value={selected}
                onChange={(e) => {
                    setSelected(e);
                    handleUpdateParams(e.value);
                }}
            >
                <div className="relative w-fit z-10">
                    {/* Button for the listbox */}
                    <Listbox.Button className="custom-filter__btn bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-left shadow-sm hover:shadow-md transition-shadow duration-200">
            <span className="block truncate text-gray-900 dark:text-white">
              {selected.title}
            </span>
                        <Image
                            src="/chevron-up-down.svg"
                            width={20}
                            height={20}
                            className="ml-4 object-contain dark:invert"
                            alt={`${title} filter dropdown`}
                        />
                    </Listbox.Button>

                    {/* Transition for displaying the options */}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="custom-filter__options absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.title}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 px-4 ${
                                            active
                                                ? "bg-primary-blue text-white"
                                                : "text-gray-900 dark:text-gray-100"
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <span
                                            className={`block truncate ${
                                                selected ? "font-medium" : "font-normal"
                                            }`}
                                        >
                      {option.title}
                    </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}