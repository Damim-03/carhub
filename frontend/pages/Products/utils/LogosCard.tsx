import { Image } from '../../../Home/components';
import { ProductProps } from '../../../Types/Type';
import { Link } from 'react-router-dom';

interface LogosCardProps {
    product: ProductProps;
}

const LogosCard = ({ product }: LogosCardProps) => {
    return (
        <Link to={product.link || '#'}>
            <div
                className="car-card group transform transition-transform duration-300
          hover:scale-105 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-500
          p-4 rounded-lg shadow-md flex flex-col items-center"
            >
                <div className="car-card__content flex flex-col items-center w-full">
                    <section className="flex flex-col items-center w-full">
                        <div
                            className="relative w-40 h-28 my-4 flex justify-center items-center px-2 py-2
                sm:w-60 sm:h-40"
                        >
                            <Image
                                src={product.image}
                                className="relative w-full h-full object-contain"
                                alt={product.title}
                            />
                        </div>
                        <h2
                            className="car-card__content-title text-center text-lg font-semibold
                sm:text-xl text-black dark:text-white mt-4 group-hover:text-white"
                        >
                            {product.title}
                        </h2>
                    </section>
                </div>
            </div>
        </Link>
    );
};

export default LogosCard;
