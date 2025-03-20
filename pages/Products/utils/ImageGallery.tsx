import { useState } from "react";
import { ProductImage } from "../data/productData.ts";
import { cn } from "../lib/utils";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog.tsx";
import { useIsMobile } from "../hooks/use-mobile.tsx";

interface ImageGalleryProps {
    images: ProductImage[];
    className?: string;
}

const ImageGallery = ({ images, className }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const isMobile = useIsMobile();

    const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed || isMobile) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({ x, y });
    };

    return (
        <div className={cn("flex flex-col md:flex-row gap-4 dark:bg-slate-800", className)}>
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-y-auto md:max-h-[500px] md:min-w-[90px] md:w-[90px] scrollbar-hide">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "min-w-[60px] w-[60px] h-[60px] md:min-w-[80px] md:w-[80px] md:h-[80px] " +
                            "rounded-md overflow-hidden cursor-pointer transition-all",
                            selectedImage.id === image.id ? "border-2 border-red-500" : "border border-gray-300 dark:border-gray-600"
                        )}
                        onClick={() => setSelectedImage(image)}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
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
                    >
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            className={cn(
                                "w-full h-full object-contain transition-transform duration-200",
                                isZoomed && !isMobile && "scale-125"
                            )}
                            style={
                                isZoomed && !isMobile
                                    ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                                    : undefined
                            }
                        />
                        {/* Fullscreen Button */}
                        <DialogTrigger asChild>
                            <button
                                className="absolute bottom-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition"
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
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ImageGallery;
