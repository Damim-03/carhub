import { Car, Banknote, ClipboardCheck, BarChart3, Shield, Truck, Wrench, HeartHandshake } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Products/ui/card"

const services = [
    {
        icon: <Car className="h-10 w-10 mb-3 text-primary" />,
        title: "Vehicle Search",
        description:
            "Access our extensive inventory of quality pre-owned and new vehicles with detailed information and history reports.",
    },
    {
        icon: <ClipboardCheck className="h-10 w-10 mb-3 text-primary" />,
        title: "Vehicle Inspection",
        description:
            "Our certified mechanics perform comprehensive 150-point inspections on all vehicles to ensure quality and reliability.",
    },
    {
        icon: <Banknote className="h-10 w-10 mb-3 text-primary" />,
        title: "Financing Options",
        description:
            "Get pre-approved with competitive rates and flexible terms through our network of trusted lending partners.",
    },
    {
        icon: <HeartHandshake className="h-10 w-10 mb-3 text-primary" />,
        title: "Trade-In Services",
        description: "Get a fair market value for your current vehicle and apply it directly to your new purchase.",
    },
    {
        icon: <Shield className="h-10 w-10 mb-3 text-primary" />,
        title: "Extended Warranties",
        description: "Protect your investment with our comprehensive extended warranty and vehicle protection plans.",
    },
    {
        icon: <Truck className="h-10 w-10 mb-3 text-primary" />,
        title: "Home Delivery",
        description: "Have your new vehicle delivered directly to your home or office at your convenience.",
    },
    {
        icon: <BarChart3 className="h-10 w-10 mb-3 text-primary" />,
        title: "Market Analysis",
        description: "Get insights on current market trends, pricing, and the best time to buy your desired vehicle.",
    },
    {
        icon: <Wrench className="h-10 w-10 mb-3 text-primary" />,
        title: "Service Plans",
        description: "Keep your vehicle in top condition with our preventative maintenance and service plans.",
    },
]

const ServicesGrid = () => {
    return (
        <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                        Our Car Buying Services
                    </h2>
                    <p className="max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400 mx-auto">
                        Everything you need for a smooth car buying experience
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="transition-all hover:shadow-lg h-full flex flex-col text-center items-center"
                        >
                            <CardHeader className="pb-2 flex flex-col items-center">
                                {service.icon}
                                <CardTitle className="text-center">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription className="text-sm text-slate-500 dark:text-slate-400 text-center">
                                    {service.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesGrid