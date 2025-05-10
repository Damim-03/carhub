
export interface ProductImage {
  id: number;
  url: string;
  alt: string;
  type: 'image' | 'video';
}


export interface ImageGalleryProps {
  images: ProductImage[];
  className?: string;
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

export const productData: ProductDetails = {
  id: 1,
  name: "Mercedes-Maybach GLS 600 SUV",
  description: "Experience unparalleled luxury with the Mercedes-Benz Maybach S-Class. This masterpiece of automotive engineering combines cutting-edge technology with handcrafted elegance, offering the ultimate in comfort, performance, and prestige. The epitome of automotive excellence for the discerning few.",
  price: 203350,
  discountPrice: 189999,
  rating: 4.9,
  reviewCount: 128,
  orders: 342,
  inStock: 15,
  shipping: [
    {
      method: "Standard Delivery",
      cost: 0,
      estimatedDelivery: "4-6 weeks"
    },
    {
      method: "Expedited Delivery",
      cost: 2500,
      estimatedDelivery: "2-3 weeks"
    },
    {
      method: "White Glove Delivery",
      cost: 5000,
      estimatedDelivery: "1-2 weeks"
    }
  ],
  colors: [
    { id: 1, name: "Obsidian Black", code: "#0A0A0A" },
    { id: 2, name: "Diamond White", code: "#F5F5F5" },
    { id: 3, name: "Emerald Green", code: "#025F4D" },
    { id: 4, name: "Ruby Red", code: "#8B0000" },
    { id: 5, name: "Sapphire Blue", code: "#082567" }
  ],
  sizes: [
    { id: 1, name: "Standard Wheelbase" },
    { id: 2, name: "Extended Wheelbase" }
  ],
  features: [
    "Handcrafted Nappa Leather Interior",
    "Executive Rear Seating Package",
    "ENERGIZING Comfort Control",
    "Burmester® High-End 4D Surround Sound",
    "Magic Body Control",
    "Maybach Exclusive Trim Options",
    "Active Multicontour Seats with Massage",
    "Thermotronic Luxury Climate Control",
    "Maybach-specific Grille & Badging"
  ],
  images: [
    {
      id: 1,
      url: "https://static.wixstatic.com/media/a63059_6ebc6f1fb9b440eb8ab07b0e8513b802~mv2.png/v1/fill/w_1000,h_663,al_c,q_90,usm_0.66_1.00_0.01/a63059_6ebc6f1fb9b440eb8ab07b0e8513b802~mv2.png",
      alt: "Maybach S-Class Exterior",
      type: "image"
    },
    {
      id: 2,
      url: "https://www.motortrend.com/uploads/2023/05/Mercedes-Maybach-GLS-SUV-Night-Series-3.png?w=768&width=768&q=75&format=webp",
      alt: "Luxury Interior",
      type: "image"
    },
    {
      id: 3,
      url: "https://i.ytimg.com/vi/EFVCjJszozw/maxresdefault.jpg",
      alt: "Executive Rear Seats",
      type: "image"
    },
    {
      id: 4,
      url: "https://www.mercedes-benz.co.za/content/dam/hq/passengercars/cars/gls/mercedes-maybach-gls-x167-fl-pi/overview/highlights/04-2023/images/mercedes-maybach-gls-suv-x167-highlights-equipment-3302x1858-04-2023.jpg/1740018167883.jpg?im=Crop,rect=(0,0,3302,1857);Resize=(1280)",
      alt: "Premium Dashboard",
      type: "image"
    },
    {
      id: 5,
      url: "https://www.mercedes-benz.com.my/content/dam/hq/passengercars/cars/gls/mercedes-maybach-gls-x167-fl-pi/overview/highlights/08-2023/images/mercedes-maybach-gls-suv-x167-highlights-interior-3302x1858-08-2023.jpg/1740018468283.jpg?im=Crop,rect=(0,0,3302,1857);Resize=(1280)",
      alt: "Exclusive Maybach Wheels",
      type: "image"
    }
  ],
  reviews: [
    {
      id: 1,
      userName: "Ahmed K.",
      rating: 5,
      date: "2023-11-20",
      comment: "The ultimate expression of automotive luxury. The rear cabin feels like a private jet, and the ride quality is simply sublime. Worth every penny for those who demand the very best."
    },
    {
      id: 2,
      userName: "Fatima A.",
      rating: 5,
      date: "2023-10-15",
      comment: "I've owned many luxury cars, but the Maybach is in a class of its own. The attention to detail is extraordinary, from the champagne flutes to the reclining seats with calf support.",
      images: ["https://www.mbusa.com/content/dam/mb-nafta/us/myco/maybach/s-class/2023/features/MY23-MAYBACH-S-CLASS-017-REAR-DETAIL.jpg"]
    },
    {
      id: 3,
      userName: "Khalid M.",
      rating: 4,
      date: "2023-09-05",
      comment: "Nearly perfect - the only reason I'm not giving 5 stars is the steep price for options. But the craftsmanship is undeniable and the comfort is beyond anything I've experienced."
    }
  ],
  seller: {
    id: 101,
    name: "Mercedes-Benz Maybach Exclusive",
    rating: 4.9,
    positiveRating: 99,
    followers: 42500,
    storeSince: "2015-01-01"
  },
  relatedProducts: [
    {
      id: 2,
      name: "Maybach GLS 600",
      price: 175900,
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/177511/maybach-gls-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
      rating: 4.8,
      sales: 215
    },
    {
      id: 3,
      name: "Bmw XB7 alpina",
      price: 1250,
      image: "https://bloximages.chicago2.vip.townnews.com/standard-journal.com/content/tncms/assets/v3/editorial/d/4d/d4df11c5-5a64-599d-8681-1c0f48ba456e/61766f08d02ea.image.jpg?resize=889%2C500",
      rating: 4.7,
      sales: 89
    },
    {
      id: 4,
      name: "Volkswagen Tiguan 2025",
      price: 3500,
      image: "https://img.sm360.ca/images/article/bweb-groupe-lauzon/125441//vw-tiguan-2025-europeen-011729021408097.jpg",
      rating: 4.9,
      sales: 42
    },
    {
      id: 5,
      name: "Rolls-Royce Spectre",
      price: 8500,
      image: "https://news.dupontregistry.com/wp-content/uploads/2024/09/RR-Main-1080x570.jpg",
      rating: 4.6,
      sales: 156
    }
  ]
};