import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import gsap from "gsap";

const HeroBanner = ({ heroBanner  }) => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
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

  return (
      <>
    <div className="hero-banner-container dark:bg-slate-700">
      <div>
        <p className="beats-solo dark:text-slate-300">Hello</p>
        <h3>Hello</h3>
        <h1>Hello</h1>
        <img src='/hero.png' alt="headphones" className="hero-banner-image" />

        <div>
          <Link to={`/product`}>
            <button type="button">Hello</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>Hello</p>
          </div>
        </div>
      </div>
    </div>
      </>
  )
}

export default HeroBanner
