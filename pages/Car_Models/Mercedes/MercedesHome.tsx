import {useEffect, useState} from "react";
import {Navbar_Mercedes} from "./utils";

const MercedesHome = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Interpolating background color based on scroll position
    const backgroundColor = `rgb(${Math.min(255, scrollPosition)}, ${Math.min(
        255,
        scrollPosition
    )}, ${Math.min(255, scrollPosition)})`;
  return (
    <>
        <div
            className="min-h-screen transition-colors duration-700"
            style={{ backgroundColor }}
        >
            <Navbar_Mercedes />

            <div className="h-screen flex items-center justify-center text-black text-4xl">
                Welcome to the Light Page
            </div>

            <div className="h-screen flex items-center justify-center text-black text-4xl">
                Welcome to the Light Page
            </div>
        </div>

    </>
  );
}

export default MercedesHome;
