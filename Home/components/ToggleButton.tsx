import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToggleButtonProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ darkMode, toggleTheme }) => {
    return (
        <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            whileTap={{ scale: 0.9 }}
        >
            <motion.div
                key={darkMode ? 'sun' : 'moon'}
                initial={{ opacity: 0, scale: 0.5, rotate: darkMode ? -90 : 90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: darkMode ? 90 : -90 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                {darkMode ? (
                    <Sun className="h-6 w-6 text-yellow-400" />
                ) : (
                    <Moon className="h-6 w-6 text-gray-700" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ToggleButton;