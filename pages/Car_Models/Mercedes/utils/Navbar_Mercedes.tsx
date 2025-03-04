import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { navlists_mercedes } from "../../../../constants/constant";

const NavBar_Mercedes = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const lastScrollY = useRef(0);
    const navbarRef = useRef(null);
    const miniNavbarRef = useRef(null);

    // Animate logo appearance after video ends
    useEffect(() => {
        if (isNavbarVisible) {
            gsap.fromTo("#logo-img",
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
            );
        }
    }, [isNavbarVisible]);

    // Handle Navbar Scroll Animation
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up";

            if (navbarRef.current && miniNavbarRef.current) {
                if (scrollDirection === "down" && currentScrollY > 100) {
                    // Hide Main Navbar & Show Mini Navbar
                    gsap.to(navbarRef.current, { y: "-100%", opacity: 0, duration: 0.6, ease: "power2.out" });
                    gsap.to(miniNavbarRef.current, { y: "0%", opacity: 1, duration: 0.4, ease: "power2.out" });
                } else if (scrollDirection === "up" && currentScrollY > 50) {
                    // Show Main Navbar when scrolling up (smooth transition)
                    gsap.to(navbarRef.current, { y: "0%", opacity: 1, duration: 0.6, ease: "power2.out" });
                    gsap.to(miniNavbarRef.current, { y: "-100%", opacity: 0, duration: 0.4, ease: "power2.out" });
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Video plays first, blocking everything else */}
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
                    <div className="flex justify-between items-center px-8 py-8 text-gray-400 text-sm">
                        <div className="flex gap-4 text-[12px]">
                            <span className="cursor-pointer hover:text-white">Deutsch</span>
                            <span className="cursor-pointer hover:text-white">|</span>
                            <span className="cursor-pointer text-white">English</span>
                        </div>
                        <div className="flex gap-6 items-center text-[12px]">
                            <div className="flex items-center cursor-pointer hover:text-white">
                                <Search size={16} className="mr-1" /> Search
                            </div>
                            <Link to="/login" className="flex items-center text-gray-400 hover:text-white transition">
                                <User size={16} className="mr-1" /> Login
                            </Link>
                        </div>
                    </div>

                    {/* Logo in Navbar */}
                    <nav className="flex flex-col items-center scroll-py-1">
                        <Link to="/">
                            <motion.img
                                id="logo-img"
                                src="/Mercedes-Benz.png"
                                alt="Mercedes-Benz Logo"
                                width={80}
                                height={80}
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
                                <Link to={item.link} className="nav-item hover:text-gray-400 transition">
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
                className="fixed top-0 w-full h-16  /* Adjust height */
    bg-black text-white py-4 px-8 /* Increased padding */
    flex items-center justify-between transition-all z-20"
                style={{ transform: "translateY(-100%)", opacity: 0 }}
            >
                {/* Left Side Links */}
                <div className="flex gap-8">
                    <Link to="/vehicles" className="text-sm text-gray-300 hover:text-white transition">
                        Vehicles
                    </Link>
                    <Link to="/design" className="text-sm text-gray-300 hover:text-white transition">
                        Design
                    </Link>
                    <Link to="/innovation" className="text-sm text-gray-300 hover:text-white transition">
                        Innovation
                    </Link>
                </div>

                {/* Centered Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link to="/">
                        <img src="/Mercedes-Benz.png" alt="Mercedes-Benz Logo" width={50} height={50} />
                    </Link>
                </div>

                {/* Right Side (Search & Login) */}
                <div className="flex gap-6">
                    <Search size={18} className="cursor-pointer text-gray-300 hover:text-white" />
                    <Link to="/login" className="text-sm text-gray-300 hover:text-white transition">
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavBar_Mercedes;
