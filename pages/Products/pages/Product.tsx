import { Footer, NavBar } from '../../../Home';
import { LogosCard } from '../utils'
import { Products } from '../../../constants/constant';
import {ProductProps} from "../../../Types/Type.ts";

const Product = ({ product }: ProductProps): JSX.Element => {
  return (
    <>
    <div className="bg-white dark:bg-slate-800 min-h-screen">
  <NavBar />
      <div className="hero">
        {/* Main Content Wrapper */}
        <div className="flex-1 pt-16 sm:pt-24 lg:pt-36 px-4 sm:px-8 lg:px-16">
          {/* Cars Grid */}
          <div
              className="home__cars-wrapper grid gap-6 sm:grid-cols-2 md:grid-cols-3
                 lg:grid-cols-4 py-3"
          >
            {Products.map((product, index) => (
                <LogosCard key={index} product={product} />
            ))}
          </div>
        </div>

        {/* Overlay for Hero Image */}
        <div className="hero__image-overlay" />
      </div>

      <Footer />
</div>

     
    </>
  );
}

export default Product;
