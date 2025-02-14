import React from 'react'
import { CustomButton, Image } from './components'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, y: 0 });
    gsap.to('#hero_png', { opacity: 1, y: 0 })
  }, [])
  const handleScroll = () => {
    const discoverSection = document.getElementById('discover'); 
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <>
        <div className="hero">
        <div className="flex-1 pt-36 px-4 sm:px-6 lg:px-8">
    <h1 id="hero" className="hero__title opacity-0 dark:text-white text-center dark:opacity-0 sm:text-left">
      Find, book, rent a car—quick and super easy!
    </h1>

    <p className="hero__subtitle dark:text-white text-center sm:text-left mt-4">
      Streamline your car rental experience with our effortless booking process.
    </p>

    <CustomButton
      title="Explore Cars"
      containerStyles="bg-primary-blue text-white rounded-full mt-10 dark:text-black"
      handleClick={handleScroll}
    />
  </div>
  <div className="hero__image-container">
    <div id='hero_png' className="hero__image opacity-0">
      <Image 
        src="/hero.png" 
        alt="hero" 
        fill 
        className="object-contain w-full h-full max-w-screen-2xl" 
      />
    </div>
    <div className="hero__image-overlay" />
  </div>
</div>
    </>
  )
}

export default Hero
