import {CheckCircle} from "lucide-react"

const ServicesHero = () => {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Vehicle Search */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <CheckCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-bold">Vehicle Search</h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            Access our extensive inventory of quality pre-owned and new vehicles with detailed information and history reports.
                        </p>
                    </div>

                    {/* Vehicle Inspection */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <CheckCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-bold">Vehicle Inspection</h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            Our certified mechanics perform comprehensive 150-point inspections on all vehicles to ensure quality and reliability.
                        </p>
                    </div>

                    {/* Financing Options */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <CheckCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-bold">Financing Options</h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            Get pre-approved with competitive rates and flexible terms through our network of trusted lending partners.
                        </p>
                    </div>

                    {/* Trade-In Services */}
                    <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <CheckCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-bold">Trade-In Services</h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            Get a fair market value for your current vehicle and apply it directly to your new purchase.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicesHero