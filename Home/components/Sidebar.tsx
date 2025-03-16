import { Link } from "react-router-dom";
import { X } from "lucide-react"; // Ensure you have Lucide icons installed
import { navLists } from "../../constants/constant";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div
            className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={toggleSidebar}
        >
            {/* Sidebar Content */}
            <div
                className={`fixed left-0 top-0 h-full w-3/4 max-w-xs bg-white dark:bg-slate-800 shadow-lg p-6 
        transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 p-2 text-black dark:text-white hover:text-red-500"
                    onClick={toggleSidebar}
                    aria-label="Close Sidebar"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Sidebar Links */}
                <nav className="flex flex-col gap-6 mt-12">
                    {navLists.map((item) => (
                        <Link
                            key={item.id}
                            to={item.link}
                            className="text-lg font-medium text-black dark:text-white hover:text-blue-500 transition duration-200"
                            onClick={toggleSidebar} // Close sidebar when a link is clicked
                        >
                            {item.text}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
