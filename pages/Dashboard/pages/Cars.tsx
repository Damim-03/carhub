
import { DashboardLayout } from "../components/layouts/dashboard-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Car } from "lucide-react"
import {CustomButton} from "../../Home/utils";
import {useState} from "react";
import '../styles/Global.css'
import {Link} from "react-router-dom";

// Sample car data - in a real app, this would come from an API or database
const carsData = [
  {
    id: 1,
    model: "Tesla Model S",
    logo: '../assets/images/logo.png',
    year: 2023,
    price: "$79,990",
    color: "Midnight Silver",
    mileage: "0 miles",
    status: "New",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    model: "BMW i4",
    year: 2023,
    price: "$52,200",
    color: "Alpine White",
    mileage: "5,230 miles",
    status: "Used",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    model: "Audi e-tron GT",
    year: 2022,
    price: "$104,900",
    color: "Daytona Gray",
    mileage: "12,405 miles",
    status: "Used",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    model: "Mercedes-Benz EQS",
    year: 2023,
    price: "$104,400",
    color: "Obsidian Black",
    mileage: "2,145 miles",
    status: "Used",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    model: "Ford Mustang Mach-E",
    year: 2023,
    price: "$43,895",
    color: "Rapid Red",
    mileage: "0 miles",
    status: "New",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    model: "Rivian R1T",
    year: 2022,
    price: "$73,000",
    color: "Forest Green",
    mileage: "8,760 miles",
    status: "Used",
    image: "/placeholder.svg"
  }
]

const Cars = () => {
  const handleMoreDetails = (id: number) => {
    console.log(`View more details for car ID: ${id}`)
    // In a real app, this would navigate to a detailed view or open a modal
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
          <p className="text-muted-foreground">Manage car inventory</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carsData.map((car) => (
            <Card key={car.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  {car.model}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span className="font-medium">{car.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">{car.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <span className="font-medium">{car.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mileage:</span>
                    <span className="font-medium">{car.mileage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-medium ${car.status === 'New' ? 'text-green-500' : 'text-blue-500'}`}>
                      {car.status}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Link
                    to="/product-details"
                    className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 rounded-full"
                    onClick={(e) => {
                      setIsOpen(true);
                      // Don't prevent default - let the link work normally
                    }}
                >
                  <CustomButton
                      title="View More"
                      containerStyles="w-full py-4 rounded-full bg-primary-blue hover:bg-primary-blue-dark transition-colors duration-200"
                      textStyles="text-white text-sm font-bold tracking-wide"
                      rightIcon="/right-arrow.svg"
                      aria-label="View product details"
                  />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Cars
