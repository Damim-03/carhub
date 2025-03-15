
export interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

export interface ProductColor {
  id: number;
  name: string;
  code: string; // hex color code
}

export interface ProductSize {
  id: number;
  name: string;
}

export interface ProductShipping {
  method: string;
  cost: number;
  estimatedDelivery: string;
}

export interface ProductReview {
  id: number;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[]; // optional product review images
}

export interface SellerInfo {
  id: number;
  name: string;
  rating: number;
  positiveRating: number;
  followers: number;
  storeSince: string;
}

export interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  sales: number;
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  orders: number;
  inStock: number;
  shipping: ProductShipping[];
  colors: ProductColor[];
  sizes: ProductSize[];
  features: string[];
  images: ProductImage[];
  reviews: ProductReview[];
  seller: SellerInfo;
  relatedProducts: RelatedProduct[];
}

// Mock product data
export const productData: ProductDetails = {
  id: 1,
  name: "Wireless Bluetooth Headphones with Noise Cancellation and High Fidelity Sound",
  description: "Experience premium sound quality with our wireless Bluetooth headphones featuring active noise cancellation, long battery life, and comfortable over-ear design. Perfect for travel, work, or enjoying your favorite music anywhere.",
  price: 89.99,
  discountPrice: 59.99,
  rating: 4.7,
  reviewCount: 2453,
  orders: 5829,
  inStock: 187,
  shipping: [
    {
      method: "Standard Shipping",
      cost: 0, // Free shipping
      estimatedDelivery: "15-30 days"
    },
    {
      method: "Express Shipping",
      cost: 12.99,
      estimatedDelivery: "7-14 days"
    }
  ],
  colors: [
    { id: 1, name: "Black", code: "#000000" },
    { id: 2, name: "White", code: "#FFFFFF" },
    { id: 3, name: "Blue", code: "#0047AB" },
    { id: 4, name: "Red", code: "#B22222" }
  ],
  sizes: [
    { id: 1, name: "Standard" }
  ],
  features: [
    "Active Noise Cancellation",
    "40 Hours Battery Life",
    "Bluetooth 5.2 Technology",
    "Built-in Microphone for Calls",
    "Foldable Design",
    "Comfortable Ear Cushions",
    "Voice Assistant Compatible"
  ],
  images: [
    { id: 1, url: "./Mercedes.jpg", alt: "Mercedes" },
    { id: 2, url: "./Mercedes.jpg", alt: "Mercedes" },
    { id: 3, url: "./Mercedes.jpg", alt: "Mercedes" },
    { id: 4, url: "./Mercedes.jpg", alt: "Mercedes" },
    { id: 5, url: "./Mercedes.jpg", alt: "Mercedes" }
  ],
  reviews: [
    {
      id: 1,
      userName: "John M.",
      rating: 5,
      date: "2023-10-15",
      comment: "Incredible sound quality and the noise cancellation is outstanding. Battery life is as advertised. Very comfortable to wear for long periods!"
    },
    {
      id: 2,
      userName: "Sarah K.",
      rating: 4,
      date: "2023-09-28",
      comment: "Great headphones for the price. Noise cancellation works well but not quite as good as more premium brands. Still very happy with my purchase.",
      images: ["https://images.unsplash.com/photo-1631177657464-31cf6863d792?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]
    },
    {
      id: 3,
      userName: "Alex T.",
      rating: 5,
      date: "2023-09-10",
      comment: "Blown away by these headphones! The sound is crisp and balanced with deep bass. The comfort level is amazing and I can wear them all day."
    }
  ],
  seller: {
    id: 101,
    name: "AudioTech Official Store",
    rating: 4.8,
    positiveRating: 97,
    followers: 125350,
    storeSince: "2019-05-12"
  },
  relatedProducts: [
    {
      id: 2,
      name: "In-Ear Wireless Earbuds",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      rating: 4.5,
      sales: 4207
    },
    {
      id: 3,
      name: "Headphone Case",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      rating: 4.6,
      sales: 3180
    },
    {
      id: 4,
      name: "Replacement Ear Cushions",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      rating: 4.4,
      sales: 2562
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      rating: 4.7,
      sales: 5129
    }
  ]
};
