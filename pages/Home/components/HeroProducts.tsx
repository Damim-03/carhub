import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroProducts = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Sample car images data
    const carSlides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "Premium Collection",
            subtitle: "Luxury Redefined"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1494976388901-750342ad5036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
            title: "Sports Edition",
            subtitle: "Performance Meets Style"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
            title: "Electric Future",
            subtitle: "Sustainable Innovation"
        }
    ];

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === carSlides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [carSlides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === carSlides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? carSlides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-[70vh] overflow-hidden">
            {/* Slides */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {carSlides.map((slide) => (
                    <div
                        key={slide.id}
                        className="w-full flex-shrink-0 relative"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        </div>

                        {/* Content */}
                        <div className="relative h-[70vh] flex flex-col justify-center items-center text-center px-4 text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 animate-fadeIn">
                                {slide.subtitle}
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                                Explore Collection
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all z-10"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all z-10"
            >
                <ChevronRight size={32} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {carSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroProducts;