import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, User, X } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { navlists_mercedes } from "../../../../constants/constant";

const NavBar_Mercedes = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const lastScrollY = useRef(0);
    const navbarRef = useRef(null);
    const miniNavbarRef = useRef(null);
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    // Animate logo after video
    useEffect(() => {
        if (isNavbarVisible) {
            gsap.fromTo("#logo-img",
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
            );
        }
    }, [isNavbarVisible]);

    // Focus search input when opened
    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Handle scroll navbar behavior
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up";

            if (navbarRef.current && miniNavbarRef.current) {
                if (scrollDirection === "down" && currentScrollY > 100) {
                    gsap.to(navbarRef.current, { y: "-100%", opacity: 0, duration: 0.6 });
                    gsap.to(miniNavbarRef.current, { y: "0%", opacity: 1, duration: 0.4 });
                } else if (scrollDirection === "up" && currentScrollY > 50) {
                    gsap.to(navbarRef.current, { y: "0%", opacity: 1, duration: 0.6 });
                    gsap.to(miniNavbarRef.current, { y: "-100%", opacity: 0, duration: 0.4 });
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality here
        console.log("Searching for:", searchQuery);
    };

    return (
        <>
            {/* Video Intro */}
            {isVideoPlaying && (
                <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
                    <video
                        id="intro-video"
                        src="/animation%20of%20Mercedes-Benz%20logo.mp4"
                        className="w-[400px] h-[400px] object-contain"
                        autoPlay
                        muted
                        onEnded={() => {
                            setIsVideoPlaying(false);
                            setIsNavbarVisible(true);
                        }}
                    />
                </div>
            )}

            {/* Search Overlay */}
            {isSearchOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 text-white"
                    ref={searchRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Top Bar */}
                    <div className="flex justify-between items-center px-4 py-4">
                        <img
                            src="/Mercedes-Benz.png"
                            alt="Logo"
                            className="w-4 h-4 object-contain block mx-auto"
                        />
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="text-gray-300 hover:text-white text-sm flex items-center gap-2 transition-colors"
                        >
                            <span>Close</span>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="flex justify-center items-start mt-12 px-6">
                        <div className="w-full max-w-2xl flex items-center border-b border-gray-600 pb-3">
                            <Search size={22} className="text-gray-400 mr-4" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for..."
                                className="w-full bg-transparent text-white placeholder-gray-500 text-xl focus:outline-none tracking-wide"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="ml-6 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Link Groups */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-300 mt-20 px-12 max-w-6xl mx-auto">
                        <div>
                            <h4 className="font-medium text-white text-lg mb-4 tracking-wide">Vehicles</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li>
                                    <button
                                        className="w-full text-left hover:text-white cursor-pointer transition-colors duration-200 focus:outline-none"
                                        onClick={() => console.log("New Cars clicked")}
                                    >
                                        New Cars
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="w-full text-left hover:text-white cursor-pointer transition-colors duration-200 focus:outline-none"
                                        onClick={() => console.log("Configurator clicked")}
                                    >
                                        Configurator
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="w-full text-left hover:text-white cursor-pointer transition-colors duration-200 focus:outline-none"
                                        onClick={() => console.log("Test Drive clicked")}
                                    >
                                        Test Drive
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-white text-lg mb-4 tracking-wide">Mercedes-Benz Museum</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li>
                                    <button
                                        className="w-full text-left hover:text-white cursor-pointer transition-colors duration-200 focus:outline-none"
                                        onClick={() => console.log("Museum clicked")}
                                    >
                                        Museum
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="w-full text-left hover:text-white cursor-pointer transition-colors duration-200 focus:outline-none"
                                        onClick={() => console.log("Exhibition clicked")}
                                    >
                                        Exhibition
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="w-full text-left hover:text-white cursor-pointer transition-colors duration-200 focus:outline-none"
                                        onClick={() => console.log("Visitor Information clicked")}
                                    >
                                        Visitor Information
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-white text-lg mb-4 tracking-wide">Company</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li>
                                    <button
                                        className="w-full text-left hover:text-white cursor-pointer transition-colors duration-200 focus:outline-none"
                                        onClick={() => console.log("Overview clicked")}
                                    >
                                        Overview
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="w-full text-left hover:text-white cursor-pointer transition-colors duration-200 focus:outline-none"
                                        onClick={() => console.log("Careers clicked")}
                                    >
                                        Careers
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="w-full text-left hover:text-white cursor-pointer transition-colors duration-200 focus:outline-none"
                                        onClick={() => console.log("Investors clicked")}
                                    >
                                        Investors
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Main Navbar */}
            {isNavbarVisible && (
                <motion.header
                    ref={navbarRef}
                    id="Navbar_Mercedes"
                    className="navbar w-full fixed top-0 z-20 bg-black text-white"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                    <div className="flex justify-between items-center px-8 py-6 text-gray-400 text-sm">
                        <div className="flex gap-4 text-[12px]">
                            <span className="cursor-pointer hover:text-white">Deutsch</span>
                            <span className="cursor-pointer hover:text-white">|</span>
                            <span className="cursor-pointer text-white">English</span>
                        </div>
                        <div className="flex gap-6 items-center text-[12px]">
                            <button
                                className="flex items-center cursor-pointer hover:text-white transition-colors"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <Search size={16} className="mr-1" /> Search
                            </button>
                            <Link to="/login" className="flex items-center text-gray-400 hover:text-white transition">
                                <User size={16} className="mr-1" /> Login
                            </Link>
                        </div>
                    </div>

                    {/* Logo */}
                    <nav className="flex flex-col items-center scroll-py-1">
                        <Link to="/">
                            <motion.img
                                id="logo-img"
                                src="/Mercedes-Benz.png"
                                alt="Mercedes-Benz Logo"
                                className="w-20 h-20 object-contain"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </Link>
                    </nav>

                    {/* Navbar links */}
                    <motion.div
                        id="NavLinks"
                        className="w-full max-w-[900px] mx-auto flex justify-between text-white py-8 font-bold"
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {navlists_mercedes.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Link to={item.link} className="nav-item hover:text-gray-400 transition-colors duration-200">
                                    {item.text}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.header>
            )}

            {/* Mini Navbar */}
            <div
                ref={miniNavbarRef}
                className="fixed top-0 w-full h-16 bg-black text-white py-4 px-8 flex items-center justify-between transition-all z-20"
                style={{ transform: "translateY(-100%)", opacity: 0 }}
            >
                {/* Left Links */}
                <div className="flex gap-8">
                    <Link to="/vehicles" className="text-sm text-gray-300 hover:text-white transition-colors">
                        Vehicles
                    </Link>
                    <Link to="/design" className="text-sm text-gray-300 hover:text-white transition-colors">
                        Design
                    </Link>
                    <Link to="/innovation" className="text-sm text-gray-300 hover:text-white transition-colors">
                        Innovation
                    </Link>
                </div>

                {/* Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link to="/">
                        <img
                            src="/Mercedes-Benz.png"
                            alt="Mercedes-Benz Logo"
                            className="w-12 h-12 object-contain"
                        />
                    </Link>
                </div>

                {/* Right Controls */}
                <div className="flex gap-6 items-center">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        <Search size={18} />
                    </button>
                    <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavBar_Mercedes;