
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { navLists } from '../../../constants/constant';
import {RegisterButton} from "../../../Home/components";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div 
      className={`fixed top-0 left-0 h-screen w-72 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" onClick={toggleSidebar}>
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </Link>
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex flex-col space-y-6">
          {navLists.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              onClick={toggleSidebar}
              className="text-gray-800 dark:text-white text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400"
            >
              {item.text}
            </Link>
          ))}
        </div>
        
        <div className="mt-12">
          <RegisterButton
            title="Register"
            btnType="button"
            containerStyles="w-full text-white bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-center font-medium transition duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
