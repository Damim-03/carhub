import { useState, useCallback } from "react";
import { ProductImage } from "../data/productData";
import { ImageGalleryProps } from '../data/productData'
import { cn } from "../lib/utils";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useIsMobile } from "../hooks/use-mobile";

interface ImageGalleryProps {
    images: ProductImage[];
    className?: string;
}

const ImageGallery = ({ images, className }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const isMobile = useIsMobile();

    const handleImageHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed || isMobile) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));

        setZoomPosition({ x, y });
    }, [isZoomed, isMobile]);

    const handleImageSelect = useCallback((image: ProductImage) => {
        setSelectedImage(image);
        setIsZoomed(false);
    }, []);

    if (!images || images.length === 0) {
        return (
            <div className={cn("flex items-center justify-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-md", className)}>
                <p className="text-gray-500 dark:text-gray-400">No images available</p>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col md:flex-row gap-4 dark:bg-slate-800", className)}>
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-y-auto md:max-h-[500px] md:min-w-[90px] md:w-[90px] scrollbar-hide">
                {images.map((image) => (
                    <button
                        key={image.id}
                        className={cn(
                            "flex-shrink-0 min-w-[60px] w-[60px] h-[60px] md:min-w-[80px] md:w-[80px] md:h-[80px]",
                            "rounded-md overflow-hidden cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
                            selectedImage.id === image.id
                                ? "border-2 border-red-500"
                                : "border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                        )}
                        onClick={() => handleImageSelect(image)}
                        aria-label={`View ${image.alt}`}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 order-1 md:order-2">
                <Dialog>
                    <div
                        className="relative overflow-hidden rounded-md bg-white dark:bg-gray-900 h-[300px] sm:h-[400px] md:h-[500px] cursor-zoom-in"
                        onMouseMove={handleImageHover}
                        onMouseEnter={() => !isMobile && setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        aria-label="Product image zoom area"
                    >
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            className={cn(
                                "w-full h-full object-contain transition-transform duration-200",
                                isZoomed && !isMobile ? "scale-125" : "scale-100"
                            )}
                            style={{
                                transformOrigin: isZoomed && !isMobile
                                    ? `${zoomPosition.x}% ${zoomPosition.y}%`
                                    : "center"
                            }}
                        />

                        {/* Fullscreen Button */}
                        <DialogTrigger asChild>
                            <button
                                className="absolute bottom-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                                aria-label="View image in fullscreen"
                                title="View full screen"
                            >
                                <Maximize2 className="h-5 w-5 text-gray-800 dark:text-white" />
                            </button>
                        </DialogTrigger>
                    </div>

                    {/* Fullscreen Image Modal */}
                    <DialogContent className="max-w-5xl w-[95vw] h-[80vh] p-2 flex items-center justify-center bg-white dark:bg-gray-900">
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-full object-contain"
                            loading="eager"
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ImageGallery;