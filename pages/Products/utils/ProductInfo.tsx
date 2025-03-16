
import { useState } from "react";
import { cn } from "../lib/utils";
import { ProductDetails, ProductColor } from "../data/productData";
import Rating from "./Rating.tsx";
import { Heart, ShoppingCart, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";

interface ProductInfoProps {
    product: ProductDetails;
    className?: string;
}

const ProductInfo = ({ product, className }: ProductInfoProps) => {
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { toast } = useToast();

    const discountPercentage = product.discountPrice
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

    const handleAddToCart = () => {
        toast({
            title: "Added to cart",
            description: `${quantity} x ${product.name} has been added to your cart.`,
        });
    };

    const handleBuyNow = () => {
        toast({
            title: "Proceeding to checkout",
            description: "Taking you to the checkout page...",
        });
    };

    const handleQuantityChange = (value: number) => {
        const newQuantity = Math.max(1, Math.min(value, product.inStock));
        setQuantity(newQuantity);
    };

    return (
        <div className={cn("flex flex-col", className)}>
            {/* Product Title */}
            <h1 className="text-xl md:text-2xl
              font-semibold text-ali-text mb-2
              dark:text-white"
            >
                {product.name}
            </h1>

            {/* Ratings & Orders */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <Rating value={product.rating} showValue size="md" className={'dark:text-white'}/>
                    <span className="text-ali-text-light text-sm dark:text-white">
                        {product.reviewCount} Reviews
                    </span>
                </div>
                <span className="text-ali-text-light text-sm dark:text-white">
                    {product.orders} Orders
                </span>
            </div>

            {/* Price Section */}
            <div className="bg-ali-light-gray p-4 rounded-md mb-6 ">
                <div className="flex items-baseline gap-2 mb-1">
                    {product.discountPrice ? (
                        <>
                           <span className="text-ali-red text-2xl font-bold text-red-400 dark:text-red-400">
                              ${product.discountPrice.toFixed(2)}
                           </span>
                            <span className="price-strike text-ali-text-light text-base text-black dark:text-white">
                              ${product.price.toFixed(2)}
                            </span>
                            <Badge className="bg-ali-red text-white ml-2">
                                {discountPercentage}% OFF
                            </Badge>
                        </>
                    ) : (
                        <span className="text-ali-red text-2xl font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-ali-text font-medium mb-2 text-black dark:text-white">Color:</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                            <button
                                key={color.id}
                                className={cn(
                                    "p-0.5 rounded-md transition-all " +
                                    "hover:border-ali-red w-14 h-14 flex items-center " +
                                    "justify-center border-2 dark:border-0",
                                    selectedColor?.id === color.id
                                        ? "border-ali-red"
                                        : "border-ali-border"
                                )}
                                onClick={() => setSelectedColor(color)}
                                title={color.name}
                            >
                                <div
                                    className="h-full w-full rounded"
                                    style={{ backgroundColor: color.code }}
                                >
                                    <span className="sr-only">{color.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                    {selectedColor && (
                        <p className="text-sm text-ali-text-light mt-1 text-black dark:text-white">
                            Selected: {selectedColor.name}
                        </p>
                    )}
                </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
                <h3 className="text-ali-text font-medium mb-2 text-black dark:text-white">Quantity:</h3>
                <div className="flex items-center">
                    <button
                        className="w-8 h-8 border border-ali-border rounded-l-md
                        flex items-center justify-center bg-ali-light-gray text-black
                        dark:text-white"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="w-16 h-8 border-y text-center outline-none
                        text-ali-text text-black dark:text-black"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                        min="1"
                        max={product.inStock}
                    />
                    <button
                        className="w-8 h-8 border border-ali-border rounded-r-md
                        flex items-center justify-center bg-ali-light-gray text-black
                        dark:text-white"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.inStock}
                    >
                        +
                    </button>
                    <span className="ml-4 text-sm text-ali-text-light text-black dark:text-white">
                        {product.inStock} available
                    </span>
                </div>
            </div>

            {/* Shipping Options */}
            <div className="mb-6">
                <h3 className="text-ali-text font-medium mb-2 text-black dark:text-white">Shipping:</h3>
                <div className="flex flex-col gap-2">
                    {product.shipping.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center text-sm p-2 rounded-md"
                        >
                            <Truck className="w-4 h-4 text-ali-text-light mr-2" />
                            <div className="flex-1">
                                <span className="font-medium text-black dark:text-white">{option.method}:</span>{" "}
                                <span className="text-ali-text-light text-black dark:text-white">{option.estimatedDelivery}</span>
                            </div>
                            <div className="text-ali-red font-medium text-black dark:text-white">
                                {option.cost === 0
                                    ? "Free"
                                    : `$${option.cost.toFixed(2)}`}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                    className="flex-1 bg-ali-orange
                    text-white hover:bg-ali-light-orange bg-amber-600 dark:text-white
                    dark:bg-amber-600"
                    size="lg"
                    onClick={handleBuyNow}
                >
                    Buy Now
                </Button>
                <Button
                    className="flex-1 bg-white text-ali-orange border
                    border-ali-orange hover:bg-ali-light-gray dark:text-black"
                    size="lg"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-ali-border"
                >
                    <Heart className="h-5 w-5 text-ali-red text-black dark:text-white" />
                </Button>
            </div>
        </div>
    );
};

export default ProductInfo;
