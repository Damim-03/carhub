import { useEffect, useState, useRef } from "react";
import { Navbar_Mercedes } from "./utils";

const MercedesHome = () => {
    const [activeSection, setActiveSection] = useState(0);
    const containerRef = useRef(null);

    const sections = [
        {
            title: "The new EQS.",
            subtitle: "Electric luxury redefined.",
            background: "bg-black",
            video: "../mercedes-maybach-gls-trailer.mp4", // Now pointing to public/videos
            textColor: "text-white"
        },
        {
            title: "Performance. Perfected.",
            subtitle: "Discover the AMG lineup",
            background: "bg-gray-900",
            image: "/images/amg-gt-desktop.jpg", // Example if you also want local images
            textColor: "text-white"
        },
        {
            title: "Innovation that excites.",
            subtitle: "Experience MBUX Hyperscreen",
            background: "bg-white",
            video: "/Mercedes.jpg",
            textColor: "text-black"
        },
        {
            title: "Sustainable Luxury",
            subtitle: "Explore our electric future",
            background: "bg-gray-100",
            image: "/images/eqs-sustainability.jpg",
            textColor: "text-gray-900"
        }
    ];

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;

            // Calculate active section based on scroll position
            const windowHeight = window.innerHeight;
            const newActiveSection = Math.floor(position / windowHeight);
            if (newActiveSection !== activeSection) {
                setActiveSection(newActiveSection);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeSection]);

    // Scroll to section function
    const scrollToSection = (index: number) => {
        window.scrollTo({
            top: index * window.innerHeight,
            behavior: "smooth"
        });
    };

    return (
        <div className="relative" ref={containerRef}>
            <Navbar_Mercedes activeSection={activeSection} scrollToSection={scrollToSection} />

            {sections.map((section, index) => (
                <section
                    key={index}
                    className={`h-screen w-full flex items-center justify-center relative 
                    overflow-hidden ${section.background} transition-colors duration-500`}
                >
                    {/* Video background if available */}
                    {section.video && (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute w-full h-full object-cover opacity-80"
                        >
                            <source src={section.video} type="video/mp4" />
                        </video>
                    )}

                    {/* Image background if no video */}
                    {section.image && (
                        <div
                            className="absolute w-full h-full bg-cover bg-center opacity-90"
                            style={{ backgroundImage: `url(${section.image})` }}
                        />
                    )}

                    {/* Content */}
                    <div className={`relative z-10 text-center px-4 ${section.textColor}`}>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
                            {section.title}
                        </h1>
                        <p className="text-xl md:text-3xl mb-8 animate-fade-in delay-100">
                            {section.subtitle}
                        </p>
                        <button className="px-8 py-3 border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 animate-fade-in delay-200">
                            Discover More
                        </button>
                    </div>

                    {/* Scroll indicator */}
                    {index === activeSection && (
                        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <button
                                onClick={() => scrollToSection(index + 1)}
                                className="text-white p-2 focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </button>
                        </div>
                    )}
                </section>
            ))}

            {/* Floating navigation dots */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
                {sections.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSection(index)}
                        className={`block w-0.5 h-12 rounded-full my-6 focus:outline-none transition-all duration-300 ${
                            index === activeSection ? "bg-white scale-150" : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default MercedesHome;