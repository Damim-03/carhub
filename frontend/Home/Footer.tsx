
import { Image } from './components'
import { footerLinks } from '../constants/constant'
import { Link } from 'react-router-dom'
import { FaAngleDoubleUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100 dark:bg-slate-800">
  <div className="flex flex-col md:flex-row flex-wrap justify-between gap-8 px-4 sm:px-6 lg:px-16 py-10">
    <div className="flex flex-col justify-start items-start gap-4">
      <Image 
        src="/logo.svg" 
        alt="logo" 
        width={118} 
        height={18} 
        className="object-contain" 
      />
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Carhub 2023 <br />
        All Rights Reserved &copy;
      </p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto">
      {footerLinks.map((item) => (
        <div key={item.title} className="min-w-[120px]">
          <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
          <div className="flex flex-col gap-2 mt-4">
            {item.links.map((link) => (
              <Link
                key={link.title}
                to={link.url}
                className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>

  <div 
    className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t border-gray-100 sm:px-6 lg:px-16 px-4 py-6 dark:border-gray-700"
  >
    <p className="text-sm text-gray-500 dark:text-gray-300 text-center sm:text-left">
      &copy; 2023 CarHub. All rights reserved.
    </p>
    <div className="flex gap-8 mt-4 sm:mt-0">
      <Link 
        to="/privacy-policy" 
        className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm"
      >
        Privacy & Policy
      </Link>
      <Link 
        to="/terms-conditions" 
        className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm"
      >
        Terms & Conditions
      </Link>
    </div>

    {/* Scroll-to-Top Button */}
    <button 
      className="mt-6 sm:mt-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-blue text-white hover:bg-blue-600 transition duration-300"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaAngleDoubleUp size={24} />
    </button>
  </div>
</footer>
  )
}

export default Footer