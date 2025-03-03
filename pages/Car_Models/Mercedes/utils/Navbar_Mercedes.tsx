import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X, User } from "lucide-react";
import { Image } from "../../../../Home/components";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navlists_mercedes } from "../../../../constants/constant";

const NavBar_Mercedes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    let lastScrollY = window.scrollY;

    useGSAP(() => {
        gsap.to("#Navbar_Mercedes", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
        });
    }, []);

    useGSAP(() => {
        gsap.from("#NavLinks", {
            opacity: 0,
            y: 20,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
        });
    }, []);

    useEffect(() => {
        gsap.fromTo("#logo",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out", onComplete: () => {
                    gsap.to("#logo", {
                        y: "-38.5vh",
                        scale: 0.66,
                        duration: 2,
                        ease: "power2.inOut",
                        onComplete: () => setIsLoading(false)
                    });
                }}
        );
    }, []);

    useEffect(() => {
        document.body.style.overflow = isSearchOpen ? "hidden" : "auto";
    }, [isSearchOpen]);

    const controlNavbar = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            gsap.to(".navbar", { y: "-100%", duration: 0.3, ease: "power2.out" });
            gsap.to("#NavLinks", { opacity: 0, y: -20, duration: 0.3, ease: "power2.out" });
            gsap.to("#navbar-logo", { opacity: 0, duration: 0.3, ease: "power2.out" });
            setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
            gsap.to(".navbar", { y: "0%", duration: 0.5, ease: "power2.out" });
            gsap.to("#NavLinks", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            gsap.to("#navbar-logo", { opacity: 1, duration: 0.5, ease: "power2.inOut" });
            setIsVisible(true);
        }
        lastScrollY = currentScrollY;
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, []);

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
                    <Image id="logo" src="/Mercedes-Benz.png" alt="logo" width={120} height={120} className="object-contain" />
                </div>
            )}

            {!isLoading && (
                <header
                    className={`navbar w-full fixed top-0 z-20 bg-black text-white transition-transform duration-300 ${
                        isVisible ? "translate-y-0" : "-translate-y-full"
                    }`}
                >
                    <div className="flex justify-between items-center px-8 py-8 text-gray-400 text-sm">
                        <div className="flex gap-4">
                            <span className="cursor-pointer hover:text-white">Deutsch</span>
                            <span className="cursor-pointer hover:text-white">|</span>
                            <span className="cursor-pointer text-white">English</span>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="flex items-center cursor-pointer hover:text-white" onClick={() => setIsSearchOpen(true)}>
                                <Search size={16} className="mr-1" /> Search
                            </div>
                            <Link to="/login" className="flex items-center text-gray-400 hover:text-white transition">
                                <User size={16} className="mr-1" /> Login
                            </Link>
                        </div>
                    </div>

                    {isSearchOpen && (
                        <div className="fixed inset-0 bg-gradient-to-b from-black to-gray-900 bg-opacity-95 backdrop-blur-xl z-50 flex flex-col items-center pt-16">
                            <div className="relative w-[600px] max-w-full flex items-center bg-transparent border-b border-gray-500 px-4 py-2">
                                <Search size={20} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for..."
                                    className="flex-1 px-4 py-2 outline-none bg-transparent text-white text-lg"
                                />
                                <button className="bg-white text-black px-6 py-2 rounded-full shadow-md">Search</button>
                            </div>

                            <div className="mt-10 text-white font-semibold grid grid-cols-3 gap-20 text-left">
                                <div>
                                    <span className="text-gray-300">Vehicles</span>
                                    <ul className="mt-2 space-y-2 text-gray-400">
                                        <li>New Cars</li>
                                        <li>Configurator</li>
                                        <li>Test Drive</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="text-gray-300">Mercedes-Benz Museum</span>
                                    <ul className="mt-2 space-y-2 text-gray-400">
                                        <li>Museum</li>
                                        <li>Exhibition</li>
                                        <li>Visitor Information</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="text-gray-300">Company</span>
                                    <ul className="mt-2 space-y-2 text-gray-400">
                                        <li>Overview</li>
                                        <li>Careers</li>
                                        <li>Investors</li>
                                    </ul>
                                </div>
                            </div>

                            <button
                                className="absolute top-6 right-8 text-white text-lg flex items-center"
                                onClick={() => setIsSearchOpen(false)}
                            >
                                Close Search <X size={20} className="ml-2" />
                            </button>
                        </div>
                    )}

                    <nav className="flex flex-col items-center py-2">
                        <Link to="/">
                            <Image id="navbar-logo" src="/Mercedes-Benz.png" alt="logo" width={80} height={80} className="object-contain" />
                        </Link>
                    </nav>

                    <div id={'NavLinks'} className="w-full max-w-[900px] mx-auto flex justify-between text-white py-8 font-bold">
                        {navlists_mercedes.map((item) => (
                            <Link key={item.id} to={item.link} className="nav-item hover:text-gray-400 transition">
                                {item.text}
                            </Link>
                        ))}
                    </div>
                </header>
            )}
        </>
    );
};

export default NavBar_Mercedes;
