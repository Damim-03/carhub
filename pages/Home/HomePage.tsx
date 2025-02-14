import React, { useEffect, useState } from 'react';
import { NavBar, Footer } from '../../Home';
import { SearchBar, CustomFilter, ShowMore, CarCard, HeroBanner } from '../Home/utils';
import { fuels, yearsOfProduction } from '../../constants/constant';
import { HomeProps } from '../../Types/Type';
//import { fetchCars } from '../../Data/data';
import '../Home/Styles/global.css';
import gsap from "gsap";

const HomePage = ({ searchParams }: HomeProps): JSX.Element => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    gsap.to('body', {
      backgroundColor: newTheme === 'dark' ? '#1a202c' : '#ffffff',
      color: newTheme === 'dark' ? '#ffffff' : '#000000',
      duration: 0.5,
      onComplete: () => {
        setTheme(newTheme);
        document.documentElement.className = newTheme;
        localStorage.setItem('theme', newTheme);
      },
    });
  };

  /*useEffect(() => {
    let isMounted = true; // To prevent state updates if the component unmounts

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const cars = await fetchCars({
          manufacturer: searchParams.manufacturer || "",
          year: searchParams.year || 2022,
          fuel: searchParams.fuel || "",
          limit: searchParams.limit || 10,
          model: searchParams.model || "",
        });

        if (isMounted) {
          setAllCars(cars);
          setIsDataEmpty(!cars || cars.length === 0);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        if (isMounted) {
          setAllCars([]);
          setIsDataEmpty(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to avoid state updates after unmount
    };
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }*/

  return (
    <>
      <NavBar />
      <div className="hero dark:bg-slate-800">
        <div className="flex-1 pt-36 padding-x">
          <div className="home__text-container text-center sm:text-left px-4 py-8 sm:px-6 lg:px-0">
            <div className="home__filters">
              <SearchBar />
              <div className="home__filter-container flex px-3 flex-row sm:flex-row gap-8 sm:gap-4">
                <CustomFilter title="Fuel" options={fuels} />
                <CustomFilter title="Year" options={yearsOfProduction} />
              </div>
            </div>
            <HeroBanner heroBanner={undefined} />
          </div>

          {!isDataEmpty ? (
              <section>
                <div className="home__cars-wrapper">
                  {allCars.map((car) => (
                      <CarCard car={car} />
                  ))}
                </div>
                <ShowMore
                    pageNumber={(searchParams.limit || 10) / 10}
                    isNext={(searchParams.limit || 10) > allCars.length}
                />
              </section>
          ) : (
              <div className="home__error-container">
                <h2 className="text-black text-xl font-bold">Oops, no results</h2>
                <p>{allCars?.message || "No cars available at the moment."}</p>
              </div>
          )}
          <div className='hero__image-container'>
            <div className="hero__image-overlay" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;