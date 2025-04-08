import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from '../../../Home/components'
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { X } from 'lucide-react'

const NavbarLoginSignup = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0); 
  const [showNavbar, setShowNavbar] = useState(true); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    setLastScrollY(window.scrollY); 
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  return (
    <>
      <header
  className={`w-full fixed top-0 z-20 bg-transparent transition-all duration-300 ${
    showNavbar ? 'top-0' : '-top-[80px]'
  }`}
>
  <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 sm:px-16 py-5">
    <button
      className="flex md:hidden text-black dark:text-white"
      aria-label="Toggle Menu"
      onClick={toggleSidebar}
    >
      <BsReverseLayoutTextSidebarReverse className="h-6 w-6" />
    </button>

    {/* Logo */}
    <Link to="/" className="flex justify-center sm:left-1/2 transform sm:-translate-x-1/2">
      <Image
        src="/logo.svg"
        alt="logo"
        width={118}
        height={18}
        className="object-contain"
      />
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-8 lg:gap-32 justify-center flex-grow ml-[10px]"> {/* Add margin-left */}
      <Link
        to="/ProductDetails"
        className="text-black font-semibold hover:text-blue-500 transition duration-200 dark:text-white"
      >
        Home
      </Link>
      <Link
        to="/"
        className="text-black font-semibold hover:text-blue-500 transition duration-200 dark:text-white"
      >
        Services
      </Link>
      <Link
        to="/Product"
        className="text-black font-semibold hover:text-blue-500 transition duration-200 dark:text-white"
      >
        Products
      </Link>
      <Link
        to="/"
        className="text-black font-semibold hover:text-blue-500 transition duration-200 dark:text-white"
      >
        About Us
      </Link>
    </div>
  </nav>

  {/* Mobile Sidebar */}
  {isSidebarOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
      <div
        className="fixed left-0 top-0 h-full w-3/4 max-w-xs 
          bg-white dark:bg-slate-800 z-30 shadow-lg p-6 
          transform transition-transform duration-300 ease-in-out"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-800 dark:text-gray-200"
          aria-label="Close Menu"
          onClick={toggleSidebar}
        >
          <X className="h-6 w-6 dark:text-white" />
        </button>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-6 mt-12">
        <Link 
          to="/" 
          className="flex justify-center items-center absolute top-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full sm:w-auto"
        >
           <Image
             src="/logo.svg"
             alt="logo"
             width={118}
             height={18}
             className="object-contain"
            />
          </Link>
          <Link
            to="/ProductDetails"
            className="text-black font-semibold hover:text-blue-500 transition duration-200 dark:text-white"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-black font-semibold hover:text-blue-500 transition duration-200 dark:text-white"
            onClick={toggleSidebar}
          >
            Services
          </Link>
          <Link
            to="/Product"
            className="text-black font-semibold hover:text-blue-500 transition duration-200 dark:text-white"
            onClick={toggleSidebar}
          >
            Products
          </Link>
          <Link
            to="/"
            className="text-black font-semibold hover:text-blue-500 transition duration-200 dark:text-white"
            onClick={toggleSidebar}
          >
            About Us
          </Link>
        </nav>
      </div>
    </div>
  )}
</header>

    </>
  )
}

export default NavbarLoginSignup


