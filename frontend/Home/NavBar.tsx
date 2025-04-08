import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import Sidebar from './components/Sidebar';
import { Image } from './components';
import RegisterButton from './components/RegisterButton';
import ToggleButton from './components/ToggleButton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { navLists } from '../constants/constant';
import { User } from "../Types/Type.ts";

const NavBar = () => {
  useGSAP(() => {
    gsap.to('#Navbar', { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' });
  }, []);

  const getInitialTheme = () => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(prevScrollY > currentScrollY || currentScrollY < 10);
      setPrevScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    // Simulate fetching user data from an API
    setTimeout(() => {
      setUser({ id: 1, name: 'John Doe', picture: '/me.jpg' });
    }, 1000);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    gsap.to(document.documentElement, {
      backgroundColor: newTheme === 'dark' ? '#1a202c' : '#ffffff',
      color: newTheme === 'dark' ? '#ffffff' : '#000000',
      duration: 0.3,
      onComplete: () => {
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      },
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
      <header
          className={`navbar w-full fixed top-0 z-50 bg-white dark:bg-slate-900 shadow-md transition-transform duration-300 ${
              isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <nav id="Navbar" className="max-w-[1550px] mx-auto flex items-center justify-between px-4 sm:px-16 py-5 relative">
          {isMobile && (
              <button
                  className="flex text-black dark:text-white"
                  aria-label="Toggle Menu"
                  onClick={toggleSidebar}
              >
                <BsReverseLayoutTextSidebarReverse className="h-6 w-6" />
              </button>
          )}
          <Link to="/" className="flex justify-center items-center">
            <Image src="/logo.svg" alt="logo" width={118} height={18} className="object-contain" />
          </Link>
          {!isMobile && (
              <div className="flex items-center gap-8 lg:gap-28">
                {navLists.map((item) => (
                    <Link
                        key={item.id}
                        to={item.link}
                        className="text-black font-semibold hover:text-blue-500 transition duration-200 dark:text-white"
                    >
                      {item.text}
                    </Link>
                ))}
              </div>
          )}
          <div className="flex items-center gap-6">
            {user ? (
                <Link to={'/me'}>
                  <img src={user.picture} alt="User" className="w-10 h-10 rounded-full" />
                </Link>
            ) : (
                !isMobile && (
                    <RegisterButton
                        title="Register"
                        btnType="button"
                        containerStyles="text-primary-blue rounded-full bg-white min-w-[100px] md:min-w-[130px] px-4 py-2 border bg-gray-400 dark:text-primary-blue"
                    />
                )
            )}
            <ToggleButton darkMode={theme === 'dark'} toggleTheme={toggleTheme} />
          </div>
        </nav>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </header>
  );
};

export default NavBar;
