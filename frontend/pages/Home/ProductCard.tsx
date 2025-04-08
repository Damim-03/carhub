import { useState, useEffect, SetStateAction} from "react";
import {fuels, yearsOfProduction} from "../../constants/constant";
import {CarCard, CustomFilter, SearchBar} from "./utils";
import {Footer, NavBar} from "../../Home";
import NotFound from "../Products/pages/NotFound";
import {CarProps} from "../../Types/Type";
import HeroProducts from "./components/HeroProducts";

const ProductCard = () => {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [filteredCars, setFilteredCars] = useState<CarProps[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [fuelFilter, setFuelFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const carsPerPage = 6;

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const dummyData = [
                    {
                        id: 1,
                        make: "Tesla",
                        model: "Model S",
                        fuel_type: "Electric",
                        year: 2023,
                        city_mpg: 120,
                        transmission: "a",
                        drive: "AWD",
                        class: "Sedan",
                        combination_mpg: 118,
                        cylinders: 0,
                        displacement: 0.0,
                        highway_mpg: 115
                    },
                    {
                        id: 2,
                        make: "BMW",
                        model: "M3",
                        fuel_type: "Petrol",
                        year: 2021,
                        city_mpg: 25,
                        transmission: "m",
                        drive: "RWD",
                        class: "Sedan",
                        combination_mpg: 22,
                        cylinders: 6,
                        displacement: 3.0,
                        highway_mpg: 30
                    },
                    {
                        id: 3,
                        make: "Audi",
                        model: "RS5",
                        fuel_type: "Petrol",
                        year: 2022,
                        city_mpg: 22,
                        transmission: "a",
                        drive: "AWD",
                        class: "Coupe",
                        combination_mpg: 24,
                        cylinders: 6,
                        displacement: 2.9,
                        highway_mpg: 28
                    },
                    {
                        id: 4,
                        make: "Mercedes",
                        model: "EQS",
                        fuel_type: "Electric",
                        year: 2023,
                        city_mpg: 130,
                        transmission: "a",
                        drive: "AWD",
                        class: "Sedan",
                        combination_mpg: 125,
                        cylinders: 0,
                        displacement: 0.0,
                        highway_mpg: 122
                    },
                    {
                        id: 5,
                        make: "Porsche",
                        model: "911",
                        fuel_type: "Petrol",
                        year: 2022,
                        city_mpg: 20,
                        transmission: "m",
                        drive: "RWD",
                        class: "Sports",
                        combination_mpg: 22,
                        cylinders: 6,
                        displacement: 3.0,
                        highway_mpg: 28
                    },
                    {
                        id: 6,
                        make: "Ford",
                        model: "Mustang Mach-E",
                        fuel_type: "Electric",
                        year: 2023,
                        city_mpg: 110,
                        transmission: "a",
                        drive: "AWD",
                        class: "SUV",
                        combination_mpg: 105,
                        cylinders: 0,
                        displacement: 0.0,
                        highway_mpg: 100
                    },
                    {
                        id: 7,
                        make: "Toyota",
                        model: "Supra",
                        fuel_type: "Petrol",
                        year: 2023,
                        city_mpg: 24,
                        transmission: "a",
                        drive: "RWD",
                        class: "Sports",
                        combination_mpg: 26,
                        cylinders: 6,
                        displacement: 3.0,
                        highway_mpg: 31
                    },
                    {
                        id: 8,
                        make: "Lamborghini",
                        model: "Huracan",
                        fuel_type: "Petrol",
                        year: 2023,
                        city_mpg: 14,
                        transmission: "a",
                        drive: "AWD",
                        class: "Sports",
                        combination_mpg: 16,
                        cylinders: 10,
                        displacement: 5.2,
                        highway_mpg: 20
                    },
                    {
                        id: 9,
                        make: "Ferrari",
                        model: "Roma",
                        fuel_type: "Petrol",
                        year: 2023,
                        city_mpg: 18,
                        transmission: "a",
                        drive: "RWD",
                        class: "Sports",
                        combination_mpg: 20,
                        cylinders: 8,
                        displacement: 3.9,
                        highway_mpg: 24
                    },
                    {
                        id: 10,
                        make: "Tesla",
                        model: "Model S",
                        fuel_type: "Electric",
                        year: 2023,
                        city_mpg: 120,
                        transmission: "a",
                        drive: "AWD",
                        class: "Sedan",
                        combination_mpg: 118,
                        cylinders: 0,
                        displacement: 0.0,
                        highway_mpg: 115
                    },
                    {
                        id: 11,
                        make: "BMW",
                        model: "M3",
                        fuel_type: "Petrol",
                        year: 2021,
                        city_mpg: 25,
                        transmission: "m",
                        drive: "RWD",
                        class: "Sedan",
                        combination_mpg: 22,
                        cylinders: 6,
                        displacement: 3.0,
                        highway_mpg: 30
                    },
                    {
                        id: 12,
                        make: "Audi",
                        model: "RS5",
                        fuel_type: "Petrol",
                        year: 2022,
                        city_mpg: 22,
                        transmission: "a",
                        drive: "AWD",
                        class: "Coupe",
                        combination_mpg: 24,
                        cylinders: 6,
                        displacement: 2.9,
                        highway_mpg: 28
                    },
                    {
                        id: 13,
                        make: "Mercedes",
                        model: "EQS",
                        fuel_type: "Electric",
                        year: 2023,
                        city_mpg: 130,
                        transmission: "a",
                        drive: "AWD",
                        class: "Sedan",
                        combination_mpg: 125,
                        cylinders: 0,
                        displacement: 0.0,
                        highway_mpg: 122
                    },
                    {
                        id: 14,
                        make: "Porsche",
                        model: "911",
                        fuel_type: "Petrol",
                        year: 2022,
                        city_mpg: 20,
                        transmission: "m",
                        drive: "RWD",
                        class: "Sports",
                        combination_mpg: 22,
                        cylinders: 6,
                        displacement: 3.0,
                        highway_mpg: 28
                    },
                    {
                        id: 15,
                        make: "Ford",
                        model: "Mustang Mach-E",
                        fuel_type: "Electric",
                        year: 2023,
                        city_mpg: 110,
                        transmission: "a",
                        drive: "AWD",
                        class: "SUV",
                        combination_mpg: 105,
                        cylinders: 0,
                        displacement: 0.0,
                        highway_mpg: 100
                    },
                    {
                        id: 16,
                        make: "Toyota",
                        model: "Supra",
                        fuel_type: "Petrol",
                        year: 2023,
                        city_mpg: 24,
                        transmission: "a",
                        drive: "RWD",
                        class: "Sports",
                        combination_mpg: 26,
                        cylinders: 6,
                        displacement: 3.0,
                        highway_mpg: 31
                    },
                    {
                        id: 17,
                        make: "Lamborghini",
                        model: "Huracan",
                        fuel_type: "Petrol",
                        year: 2023,
                        city_mpg: 14,
                        transmission: "a",
                        drive: "AWD",
                        class: "Sports",
                        combination_mpg: 16,
                        cylinders: 10,
                        displacement: 5.2,
                        highway_mpg: 20
                    },
                    {
                        id: 18,
                        make: "Ferrari",
                        model: "Roma",
                        fuel_type: "Petrol",
                        year: 2023,
                        city_mpg: 18,
                        transmission: "a",
                        drive: "RWD",
                        class: "Sports",
                        combination_mpg: 20,
                        cylinders: 8,
                        displacement: 3.9,
                        highway_mpg: 24
                    }
                ];

                setCars(dummyData);
                setFilteredCars(dummyData);
            } catch (err) {
                setError(true);
                console.error("Failed to fetch cars:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        let results = [...cars]; // Create a copy of the original array

        if (searchTerm) {
            results = results.filter(car =>
                `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (fuelFilter) {
            results = results.filter(car =>
                fuelFilter === "" || car.fuel_type.toLowerCase() === fuelFilter.toLowerCase()
            );
        }

        if (yearFilter) {
            results = results.filter(car =>
                yearFilter === "" || car.year.toString() === yearFilter
            );
        }

        setFilteredCars(results);
        setPageNumber(1); // Reset to first page when filters change
    }, [cars, searchTerm, fuelFilter, yearFilter]);

    const handleShowMore = () => {
        setPageNumber(prev => prev + 1);
    };

    const handleShowLess = () => {
        setPageNumber(1);
    };

    const isNext = pageNumber * carsPerPage < filteredCars.length;
    const isExpanded = pageNumber > 1;
    const visibleCars = filteredCars.slice(0, pageNumber * carsPerPage);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            <NavBar/>
            <main className="flex-grow">
                <HeroProducts/>

                <div className="mt-12 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto" id="discover">
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                            Car Catalogue
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Explore our cars you might like
                        </p>
                    </div>

                    <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
                        <SearchBar
                            onSearch={(term) => setSearchTerm(term)}
                            className="w-full sm:w-1/2"
                        />
                        <div className="flex flex-col sm:flex-row gap-4">
                            <CustomFilter<string>
                                title="Fuel Type"
                                options={fuels}
                                onSelect={(value: never) => {
                                    setFuelFilter(value || "");  // Handle undefined/null cases
                                    // Optional: Add URL parameter update here if needed
                                }}
                            />

                            <CustomFilter<number>
                                title="Year"
                                options={yearsOfProduction}
                                onSelect={(value: { toString: () => SetStateAction<string>; }) => {
                                    setYearFilter(value ? value.toString() : "");  // Convert number to string
                                    // Optional: Add URL parameter update here if needed
                                }}
                            />
                        </div>
                    </div>

                    <section>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
                            </div>
                        ) : error ? (
                            <NotFound />
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {visibleCars.length > 0 ? (
                                        visibleCars.map((car) => (
                                            <CarCard
                                                key={`${car.id}-${car.make}-${car.model}`}
                                                car={car}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center">
                                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                                No cars found
                                            </h3>
                                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                                Try adjusting your search or filters
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-center mt-10 gap-4">
                                    {isNext && (
                                        <button
                                            onClick={handleShowMore}
                                            className="bg-primary-blue text-white rounded-full px-6 py-3 hover:bg-primary-blue-dark transition-colors duration-200"
                                        >
                                            Show More
                                        </button>
                                    )}
                                    {isExpanded && (
                                        <button
                                            onClick={handleShowLess}
                                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full px-6 py-3 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                                        >
                                            Show Less
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductCard;