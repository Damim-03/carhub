import { useRef } from 'react';
import { NavBar, Footer, Hero, Newspaper } from '../Home';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

const Home = () => {
    const logoContainerRef = useRef<HTMLDivElement>(null);
    const logos = [
        { name: 'Tesla', src: '/tesla.png' },
        { name: 'BMW', src: '/BWM.png' },
        { name: 'Audi', src: '/Audi.png' },
        { name: 'Mercedes', src: '/Mercedes-Benz.png' },
        { name: 'Porsche', src: '/porsche.png' },
        { name: 'Rolls-Royce', src: '/rolls royce.png' },
        { name: 'Toyota', src: '/toyota.png' },
        { name: 'Lamborghini', src: '/lamborghini.png' },
        { name: 'Volkswagen', src: '/volkswagen.png' },
        { name: 'Ferrari', src: '/ferrari.png' },
        { name: 'Fiat', src: '/fiat.png' },
    ];

    // Duplicate logos for seamless looping
    const duplicatedLogos = [...logos, ...logos];

    useGSAP(() => {
        gsap.to('#title', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        });

        if (logoContainerRef.current) {
            const container = logoContainerRef.current;
            const logos = container.querySelectorAll('.logo-item');
            const logoWidth = logos[0].clientWidth + 50; // Adjusted spacing
            const totalWidth = logoWidth * logos.length;

            // Duplicate logos for seamless looping
            const clones: Node[] = [];
            logos.forEach(logo => {
                const clone = logo.cloneNode(true);
                container.appendChild(clone);
                clones.push(clone);
            });

            // Set initial positions
            gsap.set([...logos, ...clones], {
                x: (i) => i * logoWidth
            });

            // Create the animation
            const animation = gsap.to([...logos, ...clones], {
                x: `-=${totalWidth}`,
                duration: logos.length * 2, // Adjust speed as needed
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: (x) => {
                        // Reset position when logos move completely out of view
                        const xNum = parseFloat(x);
                        return (xNum % totalWidth) + 'px';
                    }
                }
            });

            // Cleanup function
            return () => {
                animation.kill();
                clones.forEach(clone => container.removeChild(clone));
            };
        }
    }, []);

    return (
        <div className="bg-white dark:bg-slate-800">
            <NavBar />
            <main className="overflow-hidden">
                <Hero />
                <div className="mt-12 px-6 sm:px-8 lg:px-10 py-10 max-w-7xl mx-auto" id="discover">
                    <div className="text-center sm:text-left space-y-3">
                        <h1 id="title" className="text-4xl sm:text-5xl lg:text-6xl font-bold opacity-0 translate-y-10 dark:text-white">
                            Our Cars !!
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
                            Explore our collection of cars you might like
                        </p>
                    </div>
                </div>
                <Newspaper />

                <section className="py-10 bg-white dark:bg-slate-800">
                    <div className="max-w-10xl mx-auto px-2">
                        <div className="mb-16 text-center space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
                                Trusted by the best brands
                            </h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400">
                                Leading automotive manufacturers we work with
                            </p>
                        </div>
                        <div className="relative h-32 overflow-hidden">
                            <div
                                ref={logoContainerRef}
                                className="absolute flex items-center h-full gap-20 px-10"
                            >
                                {duplicatedLogos.map((logo, index) => (
                                    <div
                                        key={`${logo.name}-${index}`}
                                        className="logo-item flex-shrink-0 flex items-center justify-center"
                                    >
                                        <img
                                            src={logo.src}
                                            alt={logo.name}
                                            className="h-16 sm:h-20 md:h-24 w-auto opacity-90 hover:opacity-100
                                            transition-opacity duration-300 grayscale hover:grayscale-0"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
