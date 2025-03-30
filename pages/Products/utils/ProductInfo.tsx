import { useState } from "react";
import { cn } from "../lib/utils";
import { ProductDetails, ProductColor } from "../data/productData";
import Rating from "./Rating";
import { Heart, ShoppingCart, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";

interface ProductInfoProps {
    product: ProductDetails;
    className?: string;
}

const ProductInfo = ({ product, className }: ProductInfoProps) => {
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
        product.colors.length > 0 ? product.colors[0] : null
    );
    const [quantity, setQuantity] = useState(1);
    const { toast } = useToast();

    const discountPercentage = product.discountPrice
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

    const handleAddToCart = () => {
        toast({
            title: "Added to cart",
            description: `${quantity} x ${product.name}${
                selectedColor ? ` (${selectedColor.name})` : ""
            } has been added to your cart.`,
        });
    };

    const handleBuyNow = () => {
        toast({
            title: "Proceeding to checkout",
            description: `${quantity} x ${product.name}${
                selectedColor ? ` (${selectedColor.name})` : ""
            } - Ready for purchase`,
            variant: "success",
        });
    };

    const handleQuantityChange = (value: number) => {
        const newQuantity = Math.max(1, Math.min(value, product.inStock));
        setQuantity(newQuantity);
    };

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {product.name}
            </h1>

            {/* Rating and Order Info */}
            <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <Rating
                        value={product.rating}
                        showValue
                        size="md"
                        className="dark:text-white"
                    />
                    <span className="text-gray-500 text-sm dark:text-gray-300">
            ({product.reviewCount} reviews)
          </span>
                </div>
                <span className="text-gray-500 text-sm dark:text-gray-300">
          {product.orders.toLocaleString()} orders
        </span>
                {product.inStock > 0 ? (
                    <span className="text-green-600 text-sm dark:text-green-400">
            In Stock
          </span>
                ) : (
                    <span className="text-red-600 text-sm dark:text-red-400">
            Out of Stock
          </span>
                )}
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-baseline gap-2">
                    {product.discountPrice ? (
                        <>
              <span className="text-red-500 text-2xl font-bold dark:text-red-400">
                ${product.discountPrice.toFixed(2)}
              </span>
                            <span className="line-through text-gray-500 text-lg dark:text-gray-300">
                ${product.price.toFixed(2)}
              </span>
                            <Badge className="bg-red-500 text-white ml-2">
                                {discountPercentage}% OFF
                            </Badge>
                        </>
                    ) : (
                        <span className="text-gray-900 text-2xl font-bold dark:text-white">
              ${product.price.toFixed(2)}
            </span>
                    )}
                </div>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
                <div>
                    <h3 className="text-gray-900 font-medium mb-2 dark:text-white">
                        Color: {selectedColor && <span className="font-normal">({selectedColor.name})</span>}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                            <button
                                key={color.id}
                                className={cn(
                                    "p-0.5 rounded-md transition-all w-10 h-10 flex items-center justify-center border-2",
                                    selectedColor?.id === color.id
                                        ? "border-red-500 dark:border-red-400"
                                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                                )}
                                onClick={() => setSelectedColor(color)}
                                aria-label={`Select color ${color.name}`}
                                title={color.name}
                            >
                                <div
                                    className="h-full w-full rounded"
                                    style={{ backgroundColor: color.code }}
                                    aria-hidden="true"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity Selector */}
            <div>
                <h3 className="text-gray-900 font-medium mb-2 dark:text-white">
                    Quantity:
                </h3>
                <div className="flex items-center gap-4">
                    <div className="flex border border-gray-200 dark:border-gray-600 rounded-md">
                        <button
                            className="w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-md"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="w-12 h-8 text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(Number(e.target.value))}
                            min={1}
                            max={product.inStock}
                            aria-label="Product quantity"
                        />
                        <button
                            className="w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-md"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={quantity >= product.inStock}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
            {product.inStock.toLocaleString()} available
          </span>
                </div>
            </div>

            {/* Shipping Options */}
            <div>
                <h3 className="text-gray-900 font-medium mb-2 dark:text-white">
                    Shipping Options:
                </h3>
                <div className="space-y-2">
                    {product.shipping.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
                        >
                            <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                                <div>
                                    <p className="text-gray-900 font-medium dark:text-white">
                                        {option.method}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        {option.estimatedDelivery}
                                    </p>
                                </div>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                {option.cost === 0 ? "FREE" : `$${option.cost.toFixed(2)}`}
              </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600"
                    size="lg"
                    onClick={handleBuyNow}
                    disabled={product.inStock === 0}
                >
                    Buy Now
                </Button>
                <Button
                    variant="outline"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-400 dark:text-red-400 dark:hover:bg-gray-700"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={product.inStock === 0}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Add to wishlist"
                >
                    <Heart className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

export default ProductInfo;