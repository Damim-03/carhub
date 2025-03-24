import { useState, useEffect } from "react";
import { fuels, yearsOfProduction } from "../../constants/constant";
import { CarCard, CustomFilter, SearchBar, ShowMore } from "./utils";
import {Footer, Hero, NavBar} from "../../Home";
import NotFound from "../Products/pages/NotFound.tsx";
import {CarProps} from "../../Types/Type.ts";

const ProductCard = () => {

    const [cars, setCars] = useState<CarProps[]>([]); // ✅ Define type explicitly
    const [error, setError] = useState(false);

    useEffect(() => {
        // Otherwise, set the dummy data
        setCars([
            {
                id: 1,
                make: "Tesla",
                model: "Model S",
                fuel_type: "Electric",  // ✅ Changed from `fuel` to `fuel_type`
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
                fuel_type: "Petrol",  // ✅ Changed from `fuel` to `fuel_type`
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
                make: "BMW",
                model: "M3",
                fuel_type: "Petrol",  // ✅ Changed from `fuel` to `fuel_type`
                year: 2021,
                city_mpg: 25,
                transmission: "m",
                drive: "RWD",
                class: "Sedan",
                combination_mpg: 22,
                cylinders: 6,
                displacement: 3.0,
                highway_mpg: 30
            }
        ]);

    }, []);


    return (
        <>
            <NavBar/>
            <main className='overflow-hidden'>
                <Hero/>

                <div className='mt-12 padding-x padding-y max-width' id='discover'>
                    <div className='home__text-container'>
                        <h1 className='text-4xl font-extrabold text-black dark:text-white'>Car Catalogue</h1>
                        <p className={'text-black dark:text-white'}>Explore our cars you might like</p>
                    </div>

                    <div className='home__filters'>
                        <SearchBar />

                        <div className='home__filter-container'>
                            <CustomFilter title='Fuel Type' options={fuels}/>
                            <CustomFilter title='Year' options={yearsOfProduction}/>
                        </div>
                    </div>

                    <section>
                        <div className='home__cars-wrapper'>
                            {error ? (
                                    <NotFound />
                            ) : (
                                cars.length > 0 ? (
                                    cars.map((car: CarProps) => <CarCard key={car.id} car={car} />)
                                ) : (
                                    <p className="text-center">No cars available</p>
                                )
                            )}
                        </div>

                        {cars.length > 0 ? (
                            <ShowMore pageNumber={0} isNext={false} />
                        ) : (
                            <p className='text-center'>No cars available</p>
                        )}
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProductCard;