import { useState, useEffect } from "react";
import { fuels, yearsOfProduction } from "../../constants/constant";
import { CarCard, CustomFilter, SearchBar } from "./utils";
import { Footer, NavBar } from "../../Home";
import NotFound from "../Products/pages/NotFound.tsx";
import { CarProps } from "../../Types/Type.ts";
import HeroProducts from "./components/HeroProducts.tsx";

const ProductCard = () => {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const carsPerPage = 6;

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                // Dummy data - replace with actual API call in production
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
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleShowMore = () => {
        setPageNumber(prev => prev + 1);
    };

    const handleShowLess = () => {
        setPageNumber(1);
    };

    const isNext = pageNumber * carsPerPage < cars.length;
    const isExpanded = pageNumber > 1;

    return (
        <>
            <NavBar />
            <main className='overflow-hidden'>
                <HeroProducts />

                <div className='mt-12 padding-x padding-y max-width' id='discover'>
                    <div className='home__text-container'>
                        <h1 className='text-4xl font-extrabold text-black dark:text-white'>Car Catalogue</h1>
                        <p className='text-black dark:text-white'>Explore our cars you might like</p>
                    </div>

                    <div className='home__filters'>
                        <SearchBar />
                        <div className='home__filter-container'>
                            <CustomFilter title='Fuel Type' options={fuels} />
                            <CustomFilter title='Year' options={yearsOfProduction} />
                        </div>
                    </div>

                    <section>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <NotFound />
                        ) : (
                            <>
                                <div className='home__cars-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                                    {cars.length > 0 ? (
                                        cars
                                            .slice(0, pageNumber * carsPerPage)
                                            .map((car: CarProps) => (
                                                <CarCard key={car.id} car={car} />
                                            ))
                                    ) : (
                                        <p className="text-center col-span-full">No cars available</p>
                                    )}
                                </div>

                                <div className="w-full flex-center mt-10 gap-4">
                                    {isNext && (
                                        <button
                                            onClick={handleShowMore}
                                            className="bg-primary-blue text-white rounded-full px-6 py-3 hover:bg-blue-600 transition-all"
                                        >
                                            Show More
                                        </button>
                                    )}
                                    {isExpanded && (
                                        <button
                                            onClick={handleShowLess}
                                            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full px-6 py-3 hover:bg-gray-300 dark:hover:bg-gray-500 transition-all"
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
        </>
    );
};

export default ProductCard;