 const CarLogos = ({ cars }: { cars: { name: string; logo: string }[] }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6">
            {cars.map((car, index) => (
                <div key={index} className="flex flex-col items-center">
                    <img
                        src={car.logo}
                        alt={`${car.name} Logo`}
                        className="w-20 h-20 object-contain hover:scale-110 transition-transform"
                    />
                    <p className="mt-2 text-sm font-medium text-gray-700">{car.name}</p>
                </div>
            ))}
        </div>
    );
}
export default CarLogos;