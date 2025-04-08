import { useEffect, useState } from 'react';
import { NavBar, Footer } from '../../../Home';
import { HomeProps } from '../../../Types/Type';
import '../../Home/Styles/global.css';
import gsap from "gsap";
import ImageGallery from "../utils/ImageGallery";
import ProductInfo from "../utils/ProductInfo";
import ProductDetailsComponent from "../components/ProductDetailsComponent";
import RelatedProducts from "../utils/RelatedProducts";
import { productData } from "../data/productData";

const ProductDetails = ({ searchParams }: HomeProps): JSX.Element => {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    gsap.to('body', {
      backgroundColor: newTheme === 'dark' ? '#1a202c' : '#ffffff',
      color: newTheme === 'dark' ? '#ffffff' : '#000000',
      duration: 0.5,
      onComplete: () => setTheme(newTheme),
    });
  };

  return (
      <>
        <div className="bg-white dark:bg-slate-800">
          <NavBar />
          <main className="overflow-hidden dark:bg-slate-800 pt-20">
            {/* Product Top Section */}
            <div className="bg-white dark:bg-slate-800 rounded-md shadow-sm p-4 md:p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ImageGallery images={productData.images} />
                <ProductInfo product={productData} />
              </div>
            </div>

            {/* Product Details Section */}
            <ProductDetailsComponent product={productData} className="mb-8" />

            {/* Related Products */}
            <RelatedProducts products={productData.relatedProducts} className="mb-8" />
          </main>
          <Footer />
        </div>
      </>
  );
};

export default ProductDetails;
