import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleButton = ({ darkMode, toggleTheme }) => {
  return (
    <div
      className={`btn relative w-16 h-8 sm:w-20 sm:h-10 rounded-full flex items-center cursor-pointer transition-all duration-300 ${
        darkMode ? "shadow-[inset_0px_8px_60px_rgba(0,0,0,0.3)]" : ""
      }`}
      onClick={toggleTheme}
    >
      <div
        className={`btn__indicator absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-[0_8px_10px_rgba(0,0,0,0.2)] transition-transform duration-300 ${
          darkMode ? "translate-x-8 sm:translate-x-10 bg-gray-800 shadow-[0_8px_40px_rgba(0,0,0,0.3)]" : "translate-x-0"
        }`}
      >
        <div className="btn__icon-container bg-white rounded-full w-full h-full flex justify-center items-center">
          {darkMode ? (
            <FaMoon className="btn__icon text-gray-200 text-xl sm:text-2xl"/>
          ) : (
            <FaSun className="btn__icon text-yellow-500 text-xl sm:text-2xl"/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;