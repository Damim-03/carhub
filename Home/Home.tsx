import React from 'react'
import { NavBar, Footer, Hero, Newspaper } from '../Home'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

const Home = () => {
  useGSAP(() => {
    gsap.to('#title', { opacity: 1, y: 0 });
  }, []);
  return (
    <>
      <div className="bg-white dark:bg-slate-800">
       <NavBar />
         <main className="overflow-hidden">
           <Hero />
            <div
              className="mt-12 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto"
              id="discover"
            >
              <div className="text-center sm:text-left">
                <h1 id="title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold opacity-0 dark:text-white">
                  Our Cars !!
                </h1>
                <p className="mt-4 text-base sm:text-lg lg:text-xl dark:text-gray-300">
                  Explore our collection of cars you might like
                </p>
              </div>
            </div>
              <Newspaper />
          </main>
        <Footer />
      </div>
    </>
  )
}

export default Home