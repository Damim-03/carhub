
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const videos = [
  {
    id: 1,
    title: "Tesla Model S",
    src: "https://player.vimeo.com/video/423648863?h=b361788848&autoplay=1&loop=1&muted=1",
  },
  {
    id: 2,
    title: "BMW M3 Performance",
    src: "https://player.vimeo.com/video/538934163?h=7a43bc4efa&autoplay=1&loop=1&muted=1",
  },
  {
    id: 3,
    title: "Mercedes AMG GT",
    src: "https://player.vimeo.com/video/539018423?h=20b19b8fd4&autoplay=1&loop=1&muted=1",
  },
];

const CarHero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-b from-blue-900 to-black"
    >
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-[70vh] flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Experience Our Premium Fleet
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Watch high-performance cars in action and find your perfect match
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem key={video.id} className="md:basis-2/3 lg:basis-1/2">
                <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      src={video.src}
                      className="absolute top-0 left-0 w-full h-full rounded-t-xl"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={video.title}
                    ></iframe>
                  </div>
                  <div className="p-4 bg-white/10 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white">{video.title}</h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 text-white" />
          <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 text-white" />
        </Carousel>
      </div>
    </section>
  );
};

export default CarHero;