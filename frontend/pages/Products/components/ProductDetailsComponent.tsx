
import { ProductDetails } from "../data/productData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Rating from "./Rating";
import { Badge } from "../ui/badge";
import { cn } from "../lib/utils";

interface ProductDetailsProps {
    product: ProductDetails;
    className?: string;
}

const ProductDetailsComponent = ({ product, className }: ProductDetailsProps) => {
    return (
        <div className={cn("bg-white rounded-md shadow-sm p-6 dark:bg-slate-800", className)}>
            <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description" className={'bg-slate-100 dark:bg-slate-400'}>Description</TabsTrigger>
                    <TabsTrigger value="specifications" className={'bg-slate-100 dark:bg-slate-400'}>Specifications</TabsTrigger>
                    <TabsTrigger value="reviews" className={'bg-slate-100 dark:bg-slate-400'}>
                        Reviews ({product.reviewCount})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="pt-4">
                    <h3 className="text-lg font-medium mb-3">Product Description</h3>
                    <p className="text-ali-text-light mb-4">{product.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {product.images.map((image) => (
                            <div key={image.id} className="border border-ali-border rounded-md overflow-hidden">
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className="w-full h-auto"
                                />
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="specifications" className="pt-4">
                    <h3 className="text-lg font-medium mb-3">Product Specifications</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {product.features.map((feature, index) => (
                                <div key={index} className="flex items-center border-b border-ali-border py-2">
                                    <Badge className="bg-ali-light-orange mr-2">✓</Badge>
                                    <span className="text-ali-text">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <h4 className="font-medium mt-6 mb-2">Available Colors</h4>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((color) => (
                                <div key={color.id} className="flex items-center gap-2 border rounded-md p-2">
                                    <div
                                        className="w-5 h-5 rounded-full"
                                        style={{ backgroundColor: color.code }}
                                    />
                                    <span className="text-sm">{color.name}</span>
                                </div>
                            ))}
                        </div>

                        {product.sizes.length > 0 && (
                            <>
                                <h4 className="font-medium mt-6 mb-2">Available Sizes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <span
                                            key={size.id}
                                            className="border border-ali-border rounded-md py-1 px-3 text-sm"
                                        >
                      {size.name}
                    </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="reviews" className="pt-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <div className="bg-ali-light-gray p-4 rounded-md text-center">
                                <p className="text-2xl font-bold text-ali-text">{product.rating.toFixed(1)}/5.0</p>
                                <Rating value={product.rating} size="lg" className="justify-center my-2" />
                                <p className="text-sm text-ali-text-light">Based on {product.reviewCount} reviews</p>
                            </div>
                        </div>

                        <div className="md:w-2/3 space-y-6">
                            {product.reviews.map((review) => (
                                <div key={review.id} className="border-b border-ali-border pb-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">{review.userName}</span>
                                        <span className="text-sm text-ali-text-light">{review.date}</span>
                                    </div>

                                    <Rating value={review.rating} size="sm" className="mb-2" />

                                    <p className="text-ali-text mb-3">{review.comment}</p>

                                    {review.images && review.images.length > 0 && (
                                        <div className="flex gap-2 mt-3">
                                            {review.images.map((image, idx) => (
                                                <img
                                                    key={idx}
                                                    src={image}
                                                    alt="Review image"
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProductDetailsComponent;