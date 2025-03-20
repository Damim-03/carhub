import { RelatedProduct } from "../data/productData";
import { Card, CardContent } from "../ui/card";
import Rating from "./Rating.tsx";
import { cn } from "../lib/utils";
import { useIsMobile } from "../hooks/use-mobile";

interface RelatedProductsProps {
    products: RelatedProduct[];
    className?: string;
}

const RelatedProducts = ({ products, className }: RelatedProductsProps) => {
    const isMobile = useIsMobile();

    return (
        <div className={cn("space-y-4", className)}>
            <span className="block w-full border-t-2 border-white"></span>
            <h2 className="text-xl font-semibold py-5 text-center text-black dark:text-white">
                You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {products.slice(0, isMobile ? 4 : 10).map((product) => (
                    <Card
                        key={product.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow rounded-xl p-3"
                    >
                        <div className="relative aspect-square overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 rounded-lg"
                                loading="lazy"
                            />
                        </div>
                        <CardContent className="p-3">
                            <h3 className="text-sm md:text-base font-medium line-clamp-2 mb-2 text-black dark:text-white">
                                {product.name}
                            </h3>
                            <p className="text-sm md:text-base font-semibold mb-2 text-red-500 dark:text-red-400">
                                ${product.price?.toFixed(2)}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                                <Rating value={product.rating} size="sm" className="text-yellow-400 dark:text-yellow-400" />
                                <span className="text-gray-500 dark:text-gray-400">{product.sales} sold</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
