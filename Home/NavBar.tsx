import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { X } from 'lucide-react';
import { Image } from './components';
import RegisterButton from './components/RegisterButton';
import ToggleButton from './components/ToggleButton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { navLists } from '../constants/constant';

const NavBar = () => {
  useGSAP(() => {
    gsap.to('#Navbar', { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' });
  }, [])
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  let scrollTimeout: number | undefined;
  let lastScrollPosition: number = window.scrollY; // Renamed to avoid redeclaration error

  const controlNavbar = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout); // Prevent undefined timeout issues

    if (window.scrollY > lastScrollPosition) {
      // Scrolling down -> Hide navbar immediately
      gsap.to('.navbar', { y: '-100%', duration: 0.01 });
      setIsVisible(false);
    } else {
      // Scrolling up -> Wait until scrolling stops before showing navbar
      scrollTimeout = window.setTimeout(() => {
        gsap.to('.navbar', { y: '0%', duration: 0.5 });
        setIsVisible(true);
      }, 150);
    }

    lastScrollPosition = window.scrollY; // Update last scroll position
  };

// Attach event listener with passive mode for better performance
  window.addEventListener('scroll', controlNavbar, { passive: true });


  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`navbar w-full fixed top-0 z-20 bg-transparent transition-transform duration-300 ${
          isVisible ? '-translate-y-px' : '-translate-y-full'
        }`}
      >
        <nav id='Navbar' className="max-w-[1550px] mx-auto flex items-center opacity-0 justify-between px-4 sm:px-16 py-5 relative">
          <button
            className="flex md:hidden text-black dark:text-white"
            aria-label="Toggle Menu"
            onClick={toggleSidebar}
          >
            <BsReverseLayoutTextSidebarReverse className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="logo"
              width={118}
              height={18}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-28">
            {navLists.map((item) => (
              <Link
              to={`${item.link}`}
              className="text-black font-semibold 
              hover:text-blue-500 transition duration-200 
              dark:text-white"
            >
              {item.text}
            </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-6">
            <RegisterButton
              title="Register"
              btnType="button"
              containerStyles={`hidden md:block text-primary-blue rounded-full 
              bg-white min-w-[100px] md:min-w-[130px] px-4 py-2 dark:text-black`}
            />
            <ToggleButton darkMode={theme === 'dark'} toggleTheme={toggleTheme} />
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
              {navLists.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="text-gray-800 font-semibold hover:text-blue-500 transition duration-200 dark:text-gray-200"
                >
                  {item.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      </header>
    </>
  );
};

//Hello World

export default NavBar;