// components/SearchOverlay.tsx
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
    // Close on Esc key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex flex-col"
                >
                    {/* Top Bar */}
                    <div className="flex justify-between items-center px-6 py-4">
                        <img src="/Mercedes-Benz.png" alt="Logo" width={30} height={30} />
                        <button
                            onClick={onClose}
                            className="text-gray-300 hover:text-white text-sm flex items-center gap-1"
                        >
                            Close Search <X size={16} />
                        </button>
                    </div>

                    {/* Search Box */}
                    <div className="flex justify-center items-start mt-12 px-4">
                        <div className="w-full max-w-xl flex items-center border-b border-gray-500 pb-2">
                            <Search size={18} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search for..."
                                className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
                            />
                            <button className="ml-4 px-4 py-1 bg-white text-black rounded-full text-sm font-semibold">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Suggested Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300 mt-16 px-12 max-w-6xl mx-auto text-sm">
                        <div>
                            <h4 className="font-semibold text-white mb-2">Vehicles</h4>
                            <p>New Cars</p>
                            <p>Configurator</p>
                            <p>Test Drive</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Mercedes-Benz Museum</h4>
                            <p>Museum</p>
                            <p>Exhibition</p>
                            <p>Visitor Information</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Company</h4>
                            <p>Overview</p>
                            <p>Careers</p>
                            <p>Investors</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
